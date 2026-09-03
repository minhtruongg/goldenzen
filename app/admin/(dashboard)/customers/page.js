import { dbSelect } from '@/lib/db';
import CustomerSearch from './CustomerSearch';

export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
  const { data: customers, error } = await dbSelect('customers', { order: 'name.asc' });

  return (
    <>
      <div className="admin-header">Golden<em>Zen</em></div>
      <div style={{ padding: '18px 0 12px' }}>
        <div style={{ fontSize: 24, fontFamily: 'Playfair Display, Georgia, serif' }}>Khách hàng</div>
      </div>

      {error && (
        <div className="card" style={{ color: 'var(--status-cancelled)' }}>
          Không tải được danh sách khách hàng.
        </div>
      )}

      {!error && <CustomerSearch customers={customers || []} />}
    </>
  );
}
