import { dbSelect } from '@/lib/db';
import { todayISO, formatViDate } from '@/lib/date';
import AppointmentRow from '../AppointmentRow';
import DateNav from './DateNav';

export const dynamic = 'force-dynamic';

export default async function CalendarPage({ searchParams }) {
  const date = searchParams?.date || todayISO();

  const { data: bookings, error } = await dbSelect('bookings', {
    filters: [['date', 'eq', date]],
    order: 'time.asc',
  });

  return (
    <>
      <div className="admin-header">Golden<em>Zen</em></div>
      <div style={{ padding: '18px 0 12px' }}>
        <DateNav date={date} />
        <div style={{ fontSize: 18, marginTop: 10, color: 'var(--muted)' }}>
          {formatViDate(date)}
        </div>
      </div>

      {error && (
        <div className="card" style={{ color: 'var(--status-cancelled)' }}>
          Không tải được lịch hẹn. Vui lòng thử lại.
        </div>
      )}

      {!error && bookings?.length === 0 && (
        <div className="empty-state">
          <div style={{ fontSize: 40, marginBottom: 8 }}>📅</div>
          Không có lịch hẹn nào vào ngày này.
        </div>
      )}

      {!error && bookings?.map((b) => <AppointmentRow key={b.id} booking={b} />)}

      <a href="/admin/appointments/new" className="fab">+ Thêm lịch hẹn</a>
    </>
  );
}
