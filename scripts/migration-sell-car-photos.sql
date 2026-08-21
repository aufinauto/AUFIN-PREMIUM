-- Run this once in the Supabase SQL editor (Project → SQL Editor → New query).
-- Storage bucket for photos submitted through the "Prodej vozu" form —
-- separate from car-photos so customer-submitted trade-in photos never
-- mix with the dealer's official inventory photos.

insert into storage.buckets (id, name, public)
values ('sell-car-photos', 'sell-car-photos', true)
on conflict (id) do nothing;
