create extension if not exists pgcrypto;

do $$
begin
  if not exists (
    select 1
    from pg_type
    where typname = 'origen_suscriptor'
  ) then
    create type origen_suscriptor as enum ('landing_web');
  end if;
end;
$$;

create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists suscriptores (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  origen origen_suscriptor not null default 'landing_web',
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists emails (
  id uuid primary key default gen_random_uuid(),
  suscriptor_id uuid not null references suscriptores(id) on delete cascade,
  template_key text not null,
  provider text not null default 'resend',
  estado text not null check (estado in ('pending', 'sent', 'failed')),
  provider_message_id text,
  error_message text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create index if not exists emails_suscriptor_id_idx on emails (suscriptor_id);
create index if not exists emails_template_key_idx on emails (template_key);

drop trigger if exists suscriptores_set_updated_at on suscriptores;
create trigger suscriptores_set_updated_at
before update on suscriptores
for each row
execute function set_updated_at();

alter table suscriptores enable row level security;
alter table emails enable row level security;
