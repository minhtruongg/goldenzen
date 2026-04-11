-- Run this in Supabase → SQL Editor

create table bookings (
  id uuid default gen_random_uuid() primary key,
  service_category text,
  service_name text,
  client_name text,
  client_phone text,
  date text,
  time text,
  note text,
  status text default 'pending',
  created_at timestamp default now()
);

create table voucher_orders (
  id uuid default gen_random_uuid() primary key,
  amount integer,
  effective_value integer,
  buyer_name text,
  buyer_phone text,
  buyer_email text,
  status text default 'pending_payment',
  created_at timestamp default now()
);
