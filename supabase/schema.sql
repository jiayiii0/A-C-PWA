create extension if not exists "uuid-ossp";

create type app_role as enum ('admin', 'technician');
create type customer_type as enum ('residential', 'commercial');
create type contract_status as enum ('active', 'expiring_soon', 'expired');
create type job_status as enum ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled');
create type service_type as enum ('normal_cleaning', 'chemical_wash', 'repair', 'diagnosis', 'installation', 'gas_top_up');
create type payment_status as enum ('paid', 'unpaid', 'partial');
create type payment_method as enum ('cash', 'bank_transfer', 'duitnow', 'tng_ewallet');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  role app_role not null default 'technician',
  created_at timestamptz not null default now()
);

create table public.customers (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  phone text not null,
  whatsapp text,
  address text not null,
  customer_type customer_type not null,
  notes text,
  created_at timestamptz not null default now()
);

create table public.aircon_units (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  location text not null,
  brand text,
  horsepower text,
  unit_type text,
  last_service_date date,
  next_service_date date,
  notes text
);

create table public.contracts (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  start_date date not null,
  end_date date not null,
  interval_months int not null default 3,
  price_per_visit numeric(10,2) not null,
  number_of_units int not null,
  status contract_status not null default 'active',
  next_service_date date not null
);

create table public.jobs (
  id uuid primary key default uuid_generate_v4(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  contract_id uuid references public.contracts(id) on delete set null,
  assigned_to uuid references public.users(id) on delete set null,
  service_type service_type not null,
  scheduled_date date not null,
  scheduled_time time not null,
  status job_status not null default 'pending',
  address text not null,
  price numeric(10,2) not null default 0,
  notes text
);

create table public.service_records (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  technician_id uuid not null references public.users(id) on delete restrict,
  service_type service_type not null,
  service_date date not null,
  before_photo_urls text[] not null default '{}',
  after_photo_urls text[] not null default '{}',
  remarks text,
  parts_used text,
  total_price numeric(10,2) not null default 0,
  warranty_days int not null default 0,
  created_at timestamptz not null default now()
);

create table public.invoices (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  customer_id uuid not null references public.customers(id) on delete cascade,
  invoice_number text not null unique,
  subtotal numeric(10,2) not null,
  discount numeric(10,2) not null default 0,
  total numeric(10,2) not null,
  payment_status payment_status not null default 'unpaid',
  issued_date date not null default current_date
);

create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid not null references public.invoices(id) on delete cascade,
  amount numeric(10,2) not null,
  method payment_method not null,
  paid_at timestamptz not null default now(),
  notes text
);

create or replace function public.complete_contract_job()
returns trigger
language plpgsql
security definer
as $$
begin
  if new.status = 'completed' and old.status is distinct from 'completed' and new.contract_id is not null then
    update public.contracts
    set next_service_date = new.scheduled_date + (interval '1 month' * interval_months)
    where id = new.contract_id;
  end if;
  return new;
end;
$$;

create trigger on_contract_job_completed
after update of status on public.jobs
for each row execute function public.complete_contract_job();
