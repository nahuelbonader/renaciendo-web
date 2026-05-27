create extension if not exists pgcrypto;

create table public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text not null,
  created_at timestamptz not null default now()
);

alter table public.subscribers enable row level security;
