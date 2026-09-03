import { dbSelect, dbSelectOne } from '@/lib/db';
import AppointmentRow from '../../AppointmentRow';

export const dynamic = 'force-dynamic';

export default async function CustomerDetailPage({ params }) {
  const { data: customer, error } = await dbSelectOne('customers', {
    filters: [['id', 'eq', params.id]],
  });

  if (error || !customer) {
    return (
      <div className="empty-state">
        Không tìm thấy khách hàng này.<br />
        <a href="/admin/customers" className="btn" style={{ marginTop: 12, display: 'inline-flex' }}>Quay lại</a>
      </div>
    );
  }

  const { data: bookings } = await dbSelect('bookings', {
    filters: [['customer_id', 'eq', params.id]],
    order: 'date.desc,time.desc',
  });

  return (
    <>
      <div className="admin-header">
        <a href="/admin/customers" style={{ fontSize: 15 }}>&larr; Quay lại</a>
      </div>

      <div className="card" style={{ marginTop: 18 }}>
        <div style={{ fontSize: 22, fontWeight: 600, marginBottom: 10 }}>{customer.name}</div>
        {customer.phone && (
          <a className="btn btn-block btn-lg" href={`tel:${customer.phone}`}>
            📞 Gọi {customer.phone}
          </a>
        )}
        {customer.email && (
          <div style={{ fontSize: 15, color: 'var(--muted)', marginTop: 10 }}>{customer.email}</div>
        )}
      </div>

      <div style={{ fontSize: 15, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', margin: '20px 0 8px' }}>
        Lịch sử lịch hẹn
      </div>

      {(!bookings || bookings.length === 0) && (
        <div className="empty-state">Chưa có lịch hẹn nào.</div>
      )}

      {bookings?.map((b) => <AppointmentRow key={b.id} booking={b} />)}
    </>
  );
}
