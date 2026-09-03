export function todayISO() {
  // en-CA locale formats as YYYY-MM-DD
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Prague' }).format(new Date());
}

const VI_WEEKDAYS = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];

export function formatViDate(isoDate) {
  // isoDate: 'YYYY-MM-DD'
  const [y, m, d] = isoDate.split('-').map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  const weekday = VI_WEEKDAYS[dt.getUTCDay()];
  return `${weekday}, ${d} tháng ${m}`;
}
