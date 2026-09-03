'use client';
import { useRouter } from 'next/navigation';

function addDays(iso, n) {
  const [y, m, d] = iso.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + n);
  return dt.toISOString().slice(0, 10);
}

export default function DateNav({ date }) {
  const router = useRouter();

  function go(newDate) {
    router.push(`/admin/calendar?date=${newDate}`);
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
      <button className="btn" onClick={() => go(addDays(date, -1))} aria-label="Ngày trước">‹</button>
      <input
        type="date"
        className="fi"
        value={date}
        onChange={(e) => go(e.target.value)}
        style={{ flex: 1 }}
      />
      <button className="btn" onClick={() => go(addDays(date, 1))} aria-label="Ngày sau">›</button>
    </div>
  );
}
