'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ServiceEditForm({ service }) {
  const router = useRouter();
  const [form, setForm] = useState({
    category: service.category,
    name: service.name,
    name_en: service.name_en || '',
    price: service.price,
    duration: service.duration,
    active: service.active,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function save(fields) {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const data = await res.json();
      if (!data.ok) {
        setError(data.error || 'Có lỗi xảy ra');
        setSaving(false);
        return;
      }
      router.push('/admin/services');
      router.refresh();
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại');
      setSaving(false);
    }
  }

  return (
    <>
      <div className="fg">
        <label className="fl">Tên dịch vụ</label>
        <input className="fi" value={form.name} onChange={(e) => set('name', e.target.value)} />
      </div>

      <div className="fg">
        <label className="fl">Tên tiếng Anh (cho trang đặt lịch)</label>
        <input className="fi" value={form.name_en} onChange={(e) => set('name_en', e.target.value)} placeholder="Để trống nếu không cần" />
      </div>

      <div className="fg">
        <label className="fl">Danh mục</label>
        <input className="fi" value={form.category} onChange={(e) => set('category', e.target.value)} />
      </div>

      <div className="fg">
        <label className="fl">Giá (Kč)</label>
        <input className="fi" type="number" inputMode="numeric" value={form.price} onChange={(e) => set('price', e.target.value)} />
      </div>

      <div className="fg">
        <label className="fl">Thời lượng (phút)</label>
        <input className="fi" type="number" inputMode="numeric" value={form.duration} onChange={(e) => set('duration', e.target.value)} />
      </div>

      {error && <div style={{ color: 'var(--status-cancelled)', marginBottom: 12 }}>{error}</div>}

      <button className="btn btn-gold btn-block btn-lg" disabled={saving} onClick={() => save(form)}>
        {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
      </button>

      <button
        className="btn btn-block"
        style={{ marginTop: 8 }}
        disabled={saving}
        onClick={() => save({ ...form, active: !form.active })}
      >
        {form.active ? 'Ẩn dịch vụ này' : 'Hiện lại dịch vụ này'}
      </button>
    </>
  );
}
