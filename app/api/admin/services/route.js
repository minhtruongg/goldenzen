import { dbInsert } from '@/lib/db';

export async function POST(req) {
  try {
    const body = await req.json();
    const { category, name, name_en, price, duration } = body;

    if (!category || !name || !price || !duration) {
      return Response.json({ ok: false, error: 'Vui lòng điền đầy đủ thông tin' }, { status: 400 });
    }

    const { data, error } = await dbInsert('services', {
      category, name, name_en: name_en || null, price: Number(price), duration: Number(duration), active: true,
    });

    if (error) {
      return Response.json({ ok: false, error: 'Không lưu được dịch vụ' }, { status: 500 });
    }

    return Response.json({ ok: true, id: data.id });
  } catch (err) {
    console.error('Service create error:', err);
    return Response.json({ ok: false, error: 'Server error' }, { status: 500 });
  }
}
