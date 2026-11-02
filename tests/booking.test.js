import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/lib/db', () => ({ dbInsert: vi.fn() }));
vi.mock('@/lib/customers', () => ({ upsertCustomerByPhone: vi.fn() }));
vi.mock('@/lib/notify', () => ({
  confirmKeyboard: (ref) => ({ inline_keyboard: [[{ callback_data: `confirm:${ref}` }]] }),
  ownerIds: () => ['111', '222'],
  sendEmail: vi.fn(),
  emails: { waiting: (b) => ({ subject: 'waiting', props: b }) },
}));

import { POST } from '@/app/api/booking/route';
import { dbInsert } from '@/lib/db';
import { upsertCustomerByPhone } from '@/lib/customers';
import { sendEmail } from '@/lib/notify';

const valid = {
  service_category: 'massage',
  service_name: 'Thai massage',
  client_name: 'Anna Novak',
  client_phone: '+420123456789',
  client_email: 'anna@example.com',
  date: '2026-11-10',
  time: '14:00',
  note: '',
  price_final: 1200,
  duration: 60,
};

const post = (body) =>
  POST(new Request('http://localhost/api/booking', { method: 'POST', body: JSON.stringify(body) }));

let telegramCalls;

beforeEach(() => {
  vi.clearAllMocks();
  vi.spyOn(console, 'error').mockImplementation(() => {});
  telegramCalls = [];
  global.fetch = vi.fn(async (url, init) => {
    telegramCalls.push({ url, body: JSON.parse(init.body) });
    return { ok: true, text: async () => '' };
  });
  upsertCustomerByPhone.mockResolvedValue('cust-1');
  dbInsert.mockResolvedValue({ data: { id: 1 }, error: null });
  sendEmail.mockResolvedValue(true);
});

describe('POST /api/booking: happy path', () => {
  it('saves the booking as pending and linked to the customer', async () => {
    const res = await post(valid);
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
    const [table, row] = dbInsert.mock.calls[0];
    expect(table).toBe('bookings');
    expect(row).toMatchObject({
      status: 'pending',
      customer_id: 'cust-1',
      date: '2026-11-10',
      time: '14:00',
      price: 1200,
      duration: 60,
    });
  });

  it('builds a reference like GZ B + yymmdd + 3 characters', async () => {
    await post(valid);
    expect(dbInsert.mock.calls[0][1].ref).toMatch(/^GZB261110[A-Z0-9]{3}$/);
  });

  it('messages every owner with a confirm button for that booking', async () => {
    await post(valid);
    expect(telegramCalls).toHaveLength(2);
    expect(telegramCalls.map((c) => c.body.chat_id).sort()).toEqual(['111', '222']);
    const ref = dbInsert.mock.calls[0][1].ref;
    for (const c of telegramCalls) {
      expect(c.url).toContain('/bottest-token/sendMessage');
      expect(c.body.reply_markup.inline_keyboard[0][0].callback_data).toBe(`confirm:${ref}`);
    }
  });

  it('emails the customer that the request arrived', async () => {
    await post(valid);
    expect(sendEmail).toHaveBeenCalledWith('anna@example.com', expect.anything());
  });

  it('stores an empty string when email and note are absent', async () => {
    await post({ ...valid, client_email: undefined, note: undefined });
    expect(dbInsert.mock.calls[0][1]).toMatchObject({ client_email: '', note: '' });
  });
});

describe('POST /api/booking: failure handling', () => {
  it('returns 500 and warns the owners when the insert fails, with no buttons', async () => {
    dbInsert.mockResolvedValue({ data: null, error: { message: 'db down' } });
    const res = await post(valid);
    expect(res.status).toBe(500);
    expect(telegramCalls).toHaveLength(2);
    for (const c of telegramCalls) {
      expect(c.body.reply_markup).toBeUndefined();
      expect(c.body.text).toContain('Chưa lưu được');
    }
    expect(sendEmail).not.toHaveBeenCalled();
  });

  it('still alerts owners when the customer lookup throws', async () => {
    upsertCustomerByPhone.mockRejectedValue(new Error('boom'));
    const res = await post(valid);
    expect(res.status).toBe(500);
    expect(telegramCalls).toHaveLength(2);
  });

  it('retries as plain text when Telegram rejects Markdown', async () => {
    let n = 0;
    global.fetch = vi.fn(async (url, init) => {
      const body = JSON.parse(init.body);
      telegramCalls.push({ url, body });
      return { ok: ++n > 1 ? true : false, text: async () => 'bad markdown' };
    });
    const res = await post({ ...valid, client_name: 'Anna_K' });
    expect(res.status).toBe(200);
    const retry = telegramCalls.find((c) => !c.body.parse_mode);
    expect(retry).toBeDefined();
    expect(retry.body.text).not.toContain('*');
  });

  it('keeps the booking when the confirmation email fails', async () => {
    sendEmail.mockResolvedValue(false);
    const res = await post(valid);
    expect(res.status).toBe(200);
  });
});

// Known gaps. `it.fails` passes while the bug exists and fails once someone fixes it,
// which is the signal to delete the `.fails`.
describe('POST /api/booking: known gaps in server-side validation', () => {
  it.fails('rejects a missing date with 400, not 500', async () => {
    const { date, ...noDate } = valid;
    expect((await post(noDate)).status).toBe(400);
  });

  it.fails('rejects a missing client name with 400', async () => {
    expect((await post({ ...valid, client_name: '' })).status).toBe(400);
  });

  it.fails('rejects a malformed time with 400', async () => {
    expect((await post({ ...valid, time: 'banana' })).status).toBe(400);
  });

  it.fails('rejects a date in the past with 400', async () => {
    expect((await post({ ...valid, date: '2020-01-01' })).status).toBe(400);
  });

  it.fails('rejects a second booking for the same slot', async () => {
    dbInsert.mockResolvedValueOnce({ data: { id: 1 }, error: null });
    await post(valid);
    const second = await post(valid);
    expect(second.status).toBe(409);
  });
});
