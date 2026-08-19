-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).
-- Adds the shared equipment-item library used by the admin's checkbox list.

create table if not exists equipment_options (
  category text not null,
  item text not null,
  primary key (category, item)
);
alter table equipment_options enable row level security;
