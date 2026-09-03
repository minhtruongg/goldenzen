'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NewServiceForm() {
  const router = useRouter();
  const [form, setForm] = useState({ category: '', name: '', name_en: '', price: '', duration: '' });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.category.trim() || !form.name.trim() || !form.price || !form.duration) {
      return setError('Vui lòng điền đầy đủ thông tin');
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/services', {
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
      router.push('/admin/services');
      router.refresh();
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại');
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="fg">
        <label className="fl">Danh mục</label>
        <input className="fi" value={form.category} onChange={(e) => set('category', e.target.value)} placeholder="Ví dụ: massage, nails, hair" />
      </div>
      <div className="fg">
        <label className="fl">Tên dịch vụ</label>
        <input className="fi" value={form.name} onChange={(e) => set('name', e.target.value)} />
      </div>
      <div className="fg">
        <label className="fl">Tên tiếng Anh (cho trang đặt lịch)</label>
        <input className="fi" value={form.name_en} onChange={(e) => set('name_en', e.target.value)} placeholder="Để trống nếu không cần" />
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

      <button type="submit" className="btn btn-gold btn-block btn-lg" disabled={saving}>
        {saving ? 'Đang lưu...' : 'Lưu dịch vụ'}
      </button>
    </form>
  );
}
