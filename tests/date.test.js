import { describe, it, expect } from 'vitest';
import { formatViDate, todayISO } from '@/lib/date';

describe('formatViDate', () => {
  it('formats a Monday in Vietnamese', () => {
    expect(formatViDate('2026-11-02')).toBe('Thứ hai, 2 tháng 11');
  });

  it('formats a Sunday in Vietnamese', () => {
    expect(formatViDate('2026-11-01')).toBe('Chủ nhật, 1 tháng 11');
  });

  it('drops leading zeros from day and month', () => {
    expect(formatViDate('2027-01-05')).toBe('Thứ ba, 5 tháng 1');
  });

  it('handles a leap day', () => {
    expect(formatViDate('2028-02-29')).toBe('Thứ ba, 29 tháng 2');
  });
});

describe('todayISO', () => {
  it('returns YYYY-MM-DD', () => {
    expect(todayISO()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
