import { dbSelectOne, dbInsert } from '@/lib/db';

// Shared between the public booking API and the admin "add appointment" API,
// so every booking channel links to the same customers table consistently.
export async function upsertCustomerByPhone({ name, phone, email }) {
  if (!phone) return null;

  const { data: existing } = await dbSelectOne('customers', {
    filters: [['phone', 'eq', phone]],
  });

  if (existing) return existing.id;

  const { data: created, error } = await dbInsert('customers', {
    name,
    phone,
    email: email || null,
  });

  if (error) {
    console.error('Customer insert error:', error);
    return null;
  }
  return created.id;
}
