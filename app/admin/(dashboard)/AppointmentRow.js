'use client';

const STATUS_LABEL = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  completed: 'Hoàn thành',
  cancelled: 'Đã hủy',
};

export default function AppointmentRow({ booking }) {
  const statusClass = `badge badge-${booking.status || 'pending'}`;
  return (
    <a href={`/admin/appointments/${booking.id}`} className="card" style={{ display: 'block', marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
        <div>
          <div style={{ fontSize: 19, fontWeight: 600 }}>{booking.time}</div>
          <div style={{ fontSize: 17, marginTop: 2 }}>{booking.client_name}</div>
          <div style={{ fontSize: 15, color: 'var(--muted)', marginTop: 2 }}>{booking.service_name}</div>
        </div>
        <span className={statusClass}>{STATUS_LABEL[booking.status] || booking.status}</span>
      </div>
    </a>
  );
}
