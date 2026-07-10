create extension if not exists "uuid-ossp";

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

create table public.knowledge_files (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  file_type text not null,
  file_size bigint not null,
  extracted_text text,
  created_at timestamptz default now()
);

create table public.generation_sessions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  feature_description text not null,
  test_type text not null,
  status text not null default 'completed',
  created_at timestamptz default now()
);

create table public.generated_test_cases (
  id uuid primary key default uuid_generate_v4(),
  session_id uuid not null references public.generation_sessions(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  test_case_id text not null,
  component text not null,
  test_scenario text not null,
  pre_conditions text,
  test_steps text not null,
  expected_result text not null,
  priority text not null,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.knowledge_files enable row level security;
alter table public.generation_sessions enable row level security;
alter table public.generated_test_cases enable row level security;

create policy "Users can read own profile" on public.profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);
create policy "Users can manage own files" on public.knowledge_files for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage own sessions" on public.generation_sessions for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "Users can manage own test cases" on public.generated_test_cases for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users can upload own knowledge files" on storage.objects for insert with check (
  bucket_id = 'knowledge-base' and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can read own knowledge files" on storage.objects for select using (
  bucket_id = 'knowledge-base' and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Users can delete own knowledge files" on storage.objects for delete using (
  bucket_id = 'knowledge-base' and auth.uid()::text = (storage.foldername(name))[1]
);
