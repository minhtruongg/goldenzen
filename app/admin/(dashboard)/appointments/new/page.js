import { dbSelect } from '@/lib/db';
import NewAppointmentForm from './NewAppointmentForm';

export const dynamic = 'force-dynamic';

export default async function NewAppointmentPage() {
  const { data: services } = await dbSelect('services', {
    filters: [['active', 'eq', 'true']],
    order: 'sort_order.asc.nullslast,category.asc,name.asc',
  });

  return (
    <>
      <div className="admin-header">
        <a href="/admin" style={{ fontSize: 15 }}>&larr; Quay lại</a>
      </div>
      <div style={{ padding: '18px 0' }}>
        <div style={{ fontSize: 24, fontFamily: 'Playfair Display, Georgia, serif' }}>Thêm lịch hẹn</div>
      </div>
      <NewAppointmentForm services={services || []} />
    </>
  );
}
