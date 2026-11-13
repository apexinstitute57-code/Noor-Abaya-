-- Noor Abaya – Zafarwal: Supabase Orders Table & Row-Level Security Policies
-- Run this script in your Supabase SQL Editor before accepting live storefront orders.

create extension if not exists pgcrypto;

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null check (char_length(trim(customer_name)) between 2 and 120),
  delivery_address text not null check (char_length(trim(delivery_address)) between 5 and 500),
  contact_number text not null check (char_length(trim(contact_number)) between 7 and 25),
  product_name text not null check (char_length(trim(product_name)) between 2 and 160),
  color text not null check (color in ('Black', 'Blue', 'Maroon', 'Green', 'Brown', 'Purple', 'Grey')),
  size text not null check (size in ('50', '52', '54', '56', '58')),
  quantity integer not null check (quantity >= 1 and quantity <= 20),
  price numeric(10, 2) not null check (price > 0),
  order_date timestamptz not null default now()
);

create index if not exists idx_orders_order_date on public.orders (order_date desc);

-- Enable Row Level Security (Zero-Trust by default)
alter table public.orders enable row level security;

-- Revoke direct anonymous/authenticated reads, updates, and deletes so customer PII
-- (names, delivery addresses, and phone numbers) can never be queried from the public web.
revoke all on table public.orders from anon;
revoke all on table public.orders from authenticated;

-- Allow only controlled order submission if using anon role, while keeping reads locked down.
-- When the Express backend uses SUPABASE_SERVICE_ROLE_KEY on the server, it inserts securely
-- without exposing any credentials to the browser.
grant insert on table public.orders to anon;

drop policy if exists "Allow validated guest order insert" on public.orders;
create policy "Allow validated guest order insert"
  on public.orders
  for insert
  to anon
  with check (
    char_length(trim(customer_name)) between 2 and 120
    and char_length(trim(delivery_address)) between 5 and 500
    and char_length(trim(contact_number)) between 7 and 25
    and color in ('Black', 'Blue', 'Maroon', 'Green', 'Brown', 'Purple', 'Grey')
    and quantity >= 1
    and quantity <= 20
    and price > 0
  );

-- Explicit deny on SELECT/UPDATE/DELETE for public clients
drop policy if exists "Deny public read access to customer orders" on public.orders;
create policy "Deny public read access to customer orders"
  on public.orders
  for select
  to anon, authenticated
  using (false);
