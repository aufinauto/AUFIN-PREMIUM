-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).

create table if not exists cars (
  id text primary key,
  slug text unique not null,
  status text not null default 'available',
  brand text not null,
  model text not null,
  version text not null default '',
  year int not null,
  registration_date date,
  mileage int not null,
  price bigint not null,
  price_without_vat bigint,
  vat_deductible boolean not null default false,
  fuel text not null,
  transmission text not null,
  drivetrain text not null,
  power_kw int not null,
  engine_capacity int,
  body_type text not null,
  color text not null,
  vin text,
  origin text,
  owners int,
  service_history boolean,
  stk_valid_until date,
  description text[] not null default '{}',
  equipment jsonb not null default '[]',
  history jsonb not null default '{}',
  photos text[] not null default '{}',
  tags text[] not null default '{}',
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists cars_slug_idx on cars (slug);
create index if not exists cars_featured_idx on cars (featured);

-- Row Level Security: the site only ever talks to Supabase through the
-- server-side service-role key (never exposed to the browser), which
-- bypasses RLS entirely. Enabling RLS with no policies just means nobody
-- using the public anon key can read/write anything — a safe default.
alter table cars enable row level security;

-- Storage bucket for car photos (public read, admin-only write via
-- service role). Easiest done in the dashboard:
--   Storage → New bucket → name "car-photos" → toggle "Public bucket" on.
-- Equivalent via SQL:
insert into storage.buckets (id, name, public)
values ('car-photos', 'car-photos', true)
on conflict (id) do nothing;
