'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { formatViDate } from '@/lib/date';

const STATUS_LABEL = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

export default function AppointmentDetailClient({ booking }) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [editingTime, setEditingTime] = useState(false);
  const [date, setDate] = useState(booking.date);
  const [time, setTime] = useState(booking.time);
  const [error, setError] = useState('');

  async function patch(fields) {
    setSaving(true);
    setError('');
    try {
      const res = await fetch(`/api/admin/appointments/${booking.id}`, {
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
      router.refresh();
      setEditingTime(false);
    } catch {
      setError('Có lỗi xảy ra, vui lòng thử lại');
    } finally {
      setSaving(false);
    }
  }

  function handleCancel() {
    if (confirm('Hủy lịch hẹn này?')) {
      patch({ status: 'cancelled' });
    }
  }

  return (
    <>
      <div className="admin-header">
        <a href="/admin" style={{ fontSize: 15 }}>&larr; Quay lại</a>
      </div>

      <div style={{ padding: '18px 0 8px' }}>
        <span className={`badge badge-${booking.status}`}>{STATUS_LABEL[booking.status] || booking.status}</span>
      </div>

      <div className="card">
        <div className="fl">Khách hàng</div>
        <div style={{ fontSize: 20, marginBottom: 14 }}>{booking.client_name}</div>

        {booking.client_phone && (
          <>
            <div className="fl">Số điện thoại</div>
            <a className="btn btn-block btn-lg" href={`tel:${booking.client_phone}`} style={{ marginBottom: 14 }}>
              📞 Gọi {booking.client_phone}
            </a>
          </>
        )}

        <div className="fl">Dịch vụ</div>
        <div style={{ fontSize: 17, marginBottom: 14 }}>{booking.service_name}</div>

        <div className="fl">Ngày &amp; giờ</div>
        {!editingTime ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
            <div style={{ fontSize: 17 }}>{formatViDate(booking.date)} · {booking.time}</div>
            <button className="btn" onClick={() => setEditingTime(true)}>Đổi giờ</button>
          </div>
        ) : (
          <div style={{ marginBottom: 4 }}>
            <div className="fg">
              <input type="date" className="fi" value={date} onChange={(e) => setDate(e.target.value)} />
            </div>
            <div className="fg">
              <input type="time" className="fi" value={time} onChange={(e) => setTime(e.target.value)} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-gold" disabled={saving} onClick={() => patch({ date, time })}>Lưu</button>
              <button className="btn" onClick={() => setEditingTime(false)}>Hủy bỏ</button>
            </div>
          </div>
        )}

        {booking.note && (
          <>
            <div className="fl" style={{ marginTop: 14 }}>Ghi chú</div>
            <div style={{ fontSize: 16 }}>{booking.note}</div>
          </>
        )}
      </div>

      {error && <div style={{ color: 'var(--status-cancelled)', marginTop: 10 }}>{error}</div>}

      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {booking.status !== 'confirmed' && booking.status !== 'completed' && (
          <button className="btn btn-gold btn-lg" disabled={saving} onClick={() => patch({ status: 'confirmed' })}>
            Xác nhận lịch hẹn
          </button>
        )}
        {booking.status !== 'completed' && (
          <button className="btn btn-lg" disabled={saving} onClick={() => patch({ status: 'completed' })}>
            Đánh dấu hoàn thành
          </button>
        )}
        {booking.status !== 'cancelled' && (
          <button className="btn btn-danger btn-lg" disabled={saving} onClick={handleCancel}>
            Hủy lịch hẹn
          </button>
        )}
      </div>
    </>
  );
}
