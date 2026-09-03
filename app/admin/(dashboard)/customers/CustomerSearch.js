'use client';
import { useState, useMemo } from 'react';

// Strips Vietnamese/Czech diacritics so "nguyen" matches "Nguyễn",
// "duc" matches "Đức", etc. — searching without accents should still work.
function normalize(str) {
  return (str || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase();
}

export default function CustomerSearch({ customers }) {
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const query = normalize(q.trim());
    if (!query) return customers;
    return customers.filter(
      (c) => normalize(c.name).includes(query) || c.phone?.includes(q.trim())
    );
  }, [q, customers]);

  return (
    <>
      <input
        className="fi"
        placeholder="Tìm theo tên hoặc số điện thoại"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        style={{ marginBottom: 14 }}
      />

      {filtered.length === 0 && (
        <div className="empty-state">Không tìm thấy khách hàng nào.</div>
      )}

      {filtered.map((c) => (
        <a key={c.id} href={`/admin/customers/${c.id}`} className="card" style={{ display: 'block', marginBottom: 8 }}>
          <div style={{ fontSize: 17, fontWeight: 600 }}>{c.name}</div>
          <div style={{ fontSize: 15, color: 'var(--muted)', marginTop: 2 }}>{c.phone}</div>
        </a>
      ))}
    </>
  );
}
