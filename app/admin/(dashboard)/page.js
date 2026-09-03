import { dbSelect } from '@/lib/db';
import { todayISO, formatViDate } from '@/lib/date';
import AppointmentRow from './AppointmentRow';

export const dynamic = 'force-dynamic';

export default async function AdminHome() {
  const today = todayISO();

  const { data: allToday, error } = await dbSelect('bookings', {
    filters: [['date', 'eq', today]],
    order: 'time.asc',
  });

  // Filter cancelled in JS rather than in the query — keeps behavior
  // predictable regardless of null/edge-case status values.
  const bookings = allToday?.filter((b) => b.status !== 'cancelled');

  return (
    <>
      <div className="admin-header">Golden<em>Zen</em></div>
      <div style={{ padding: '18px 0 12px' }}>
        <div style={{ fontSize: 15, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em' }}>Hôm nay</div>
        <div style={{ fontSize: 24, fontFamily: 'Playfair Display, Georgia, serif', marginTop: 2 }}>
          {formatViDate(today)}
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
          Hôm nay chưa có lịch hẹn nào.
        </div>
      )}

      {!error && bookings?.map((b) => <AppointmentRow key={b.id} booking={b} />)}

      <a href="/admin/appointments/new" className="fab">+ Thêm lịch hẹn</a>
    </>
  );
}
