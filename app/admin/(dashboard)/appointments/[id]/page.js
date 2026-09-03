import { dbSelectOne } from '@/lib/db';
import AppointmentDetailClient from './AppointmentDetailClient';

export const dynamic = 'force-dynamic';

export default async function AppointmentDetailPage({ params }) {
  const { data: booking, error } = await dbSelectOne('bookings', {
    filters: [['id', 'eq', params.id]],
  });

  if (error || !booking) {
    return (
      <div className="empty-state">
        Không tìm thấy lịch hẹn này.<br />
        <a href="/admin" className="btn" style={{ marginTop: 12, display: 'inline-flex' }}>Quay lại trang chủ</a>
      </div>
    );
  }

  return <AppointmentDetailClient booking={booking} />;
}
