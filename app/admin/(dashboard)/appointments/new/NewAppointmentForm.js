'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { todayISO } from '@/lib/date';

export default function NewAppointmentForm({ services }) {
  const router = useRouter();
  const [form, setForm] = useState({
    client_name: '',
    client_phone: '',
    service_id: '',
    date: todayISO(),
    time: '',
    note: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.client_name.trim()) return setError('Vui lòng nhập tên khách hàng');
    if (!form.date || !form.time) return setError('Vui lòng chọn ngày và giờ');

    setSaving(true);
    try {
      const res = await fetch('/api/admin/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || 'Có lỗi xảy ra');
        setSaving(false);
        return;
      }
      router.push(`/admin/appointments/${data.id}`);
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại');
      setSaving(false);
    }
  }

  // Group services by category for a shorter scroll in the dropdown
  const byCategory = services.reduce((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  return (
    <form onSubmit={handleSubmit}>
      <div className="fg">
        <label className="fl">Tên khách hàng</label>
        <input className="fi" value={form.client_name} onChange={(e) => set('client_name', e.target.value)} placeholder="Nhập tên khách" />
      </div>

      <div className="fg">
        <label className="fl">Số điện thoại</label>
        <input className="fi" type="tel" value={form.client_phone} onChange={(e) => set('client_phone', e.target.value)} placeholder="Số điện thoại (không bắt buộc)" />
      </div>

      <div className="fg">
        <label className="fl">Dịch vụ</label>
        <select className="fi" value={form.service_id} onChange={(e) => set('service_id', e.target.value)}>
          <option value="">— Chọn dịch vụ (không bắt buộc) —</option>
          {Object.entries(byCategory).map(([cat, list]) => (
            <optgroup key={cat} label={cat}>
              {list.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.duration} phút — {s.price.toLocaleString('cs-CZ')} Kč)
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      <div className="fg">
        <label className="fl">Ngày</label>
        <input className="fi" type="date" value={form.date} onChange={(e) => set('date', e.target.value)} />
      </div>

      <div className="fg">
        <label className="fl">Giờ</label>
        <input className="fi" type="time" value={form.time} onChange={(e) => set('time', e.target.value)} />
      </div>

      <div className="fg">
        <label className="fl">Ghi chú</label>
        <textarea className="fi" value={form.note} onChange={(e) => set('note', e.target.value)} placeholder="Ghi chú (không bắt buộc)" />
      </div>

      {error && <div style={{ color: 'var(--status-cancelled)', marginBottom: 12 }}>{error}</div>}

      <button type="submit" className="btn btn-gold btn-block btn-lg" disabled={saving}>
        {saving ? 'Đang lưu...' : 'Lưu lịch hẹn'}
      </button>
    </form>
  );
}
