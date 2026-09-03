import { dbSelect } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ServicesPage() {
  const { data: services, error } = await dbSelect('services', {
    order: 'sort_order.asc.nullslast,category.asc,name.asc',
  });

  const byCategory = (services || []).reduce((acc, s) => {
    (acc[s.category] ||= []).push(s);
    return acc;
  }, {});

  return (
    <>
      <div className="admin-header">Golden<em>Zen</em></div>
      <div style={{ padding: '18px 0 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: 24, fontFamily: 'Playfair Display, Georgia, serif' }}>Dịch vụ</div>
        <a href="/admin/services/new" className="btn btn-gold">+ Thêm</a>
      </div>

      {error && (
        <div className="card" style={{ color: 'var(--status-cancelled)' }}>
          Không tải được danh sách dịch vụ.
        </div>
      )}

      {!error && Object.entries(byCategory).map(([cat, list]) => (
        <div key={cat} style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '.06em', color: 'var(--muted)', marginBottom: 8 }}>
            {cat}
          </div>
          {list.map((s) => (
            <a key={s.id} href={`/admin/services/${s.id}`} className="card" style={{ display: 'block', marginBottom: 8, opacity: s.active ? 1 : 0.5 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 16 }}>{s.name}</div>
                  <div style={{ fontSize: 14, color: 'var(--muted)' }}>{s.duration} phút{!s.active ? ' · Đã ẩn' : ''}</div>
                </div>
                <div style={{ fontSize: 17, fontWeight: 600 }}>{s.price.toLocaleString('cs-CZ')} Kč</div>
              </div>
            </a>
          ))}
        </div>
      ))}
    </>
  );
}
