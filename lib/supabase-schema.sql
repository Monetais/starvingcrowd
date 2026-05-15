-- Kaching OS Database Schema
-- Run this in your Supabase SQL Editor

-- Users table (extends Supabase auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  plan text default 'free' check (plan in ('free', 'builder', 'agency')),
  scans_used integer default 0,
  scans_reset_at timestamptz default now(),
  stripe_customer_id text,
  created_at timestamptz default now()
);

-- Scans table
create table if not exists public.scans (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  keyword text not null,
  results jsonb not null,
  opportunity_score integer,
  demand_score integer,
  trend_score integer,
  competition_score integer,
  created_at timestamptz default now()
);

-- Watchlist
create table if not exists public.watchlist (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  scan_id uuid references public.scans(id) on delete cascade,
  keyword text not null,
  last_score integer,
  alert_enabled boolean default false,
  created_at timestamptz default now()
);

-- Cache for API results (saves quota)
create table if not exists public.scan_cache (
  keyword_hash text primary key,
  keyword text not null,
  data jsonb not null,
  fetched_at timestamptz default now(),
  expires_at timestamptz default (now() + interval '24 hours')
);

-- Row level security
alter table public.profiles enable row level security;
alter table public.scans enable row level security;
alter table public.watchlist enable row level security;

-- Profiles: users can read/update their own
create policy "Users can view own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- Scans: users can CRUD their own
create policy "Users can view own scans" on public.scans for select using (auth.uid() = user_id);
create policy "Users can insert own scans" on public.scans for insert with check (auth.uid() = user_id);

-- Watchlist: users can CRUD their own
create policy "Users can view own watchlist" on public.watchlist for select using (auth.uid() = user_id);
create policy "Users can insert own watchlist" on public.watchlist for insert with check (auth.uid() = user_id);
create policy "Users can delete own watchlist" on public.watchlist for delete using (auth.uid() = user_id);

-- Cache: readable by all (it's shared data), writable by service role only
alter table public.scan_cache enable row level security;
create policy "Cache is readable by all" on public.scan_cache for select using (true);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Index for cache lookups
create index if not exists idx_scan_cache_expires on public.scan_cache (expires_at);
create index if not exists idx_scans_user on public.scans (user_id, created_at desc);
