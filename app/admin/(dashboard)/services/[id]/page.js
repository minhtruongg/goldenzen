import { dbSelectOne } from '@/lib/db';
import ServiceEditForm from './ServiceEditForm';

export const dynamic = 'force-dynamic';

export default async function ServiceEditPage({ params }) {
  const { data: service, error } = await dbSelectOne('services', {
    filters: [['id', 'eq', params.id]],
  });

  if (error || !service) {
    return (
      <div className="empty-state">
        Không tìm thấy dịch vụ này.<br />
        <a href="/admin/services" className="btn" style={{ marginTop: 12, display: 'inline-flex' }}>Quay lại</a>
      </div>
    );
  }

  return (
    <>
      <div className="admin-header">
        <a href="/admin/services" style={{ fontSize: 15 }}>&larr; Quay lại</a>
      </div>
      <div style={{ padding: '18px 0' }}>
        <div style={{ fontSize: 24, fontFamily: 'Playfair Display, Georgia, serif' }}>Sửa dịch vụ</div>
      </div>
      <ServiceEditForm service={service} />
    </>
  );
}
