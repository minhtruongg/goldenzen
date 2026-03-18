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
