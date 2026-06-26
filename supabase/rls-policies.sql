alter table public.users enable row level security;
alter table public.customers enable row level security;
alter table public.aircon_units enable row level security;
alter table public.contracts enable row level security;
alter table public.jobs enable row level security;
alter table public.service_records enable row level security;
alter table public.invoices enable row level security;
alter table public.payments enable row level security;

create or replace function public.current_role()
returns app_role
language sql
security definer
stable
as $$
  select role from public.users where id = auth.uid()
$$;

create policy "users can read own profile" on public.users
for select using (id = auth.uid() or public.current_role() = 'admin');

create policy "admins manage users" on public.users
for all using (public.current_role() = 'admin')
with check (public.current_role() = 'admin');

create policy "admins manage customers" on public.customers
for all using (public.current_role() = 'admin')
with check (public.current_role() = 'admin');

create policy "technicians read assigned customer details" on public.customers
for select using (
  public.current_role() = 'technician'
  and exists (
    select 1 from public.jobs
    where jobs.customer_id = customers.id
      and jobs.assigned_to = auth.uid()
  )
);

create policy "admins manage aircon units" on public.aircon_units
for all using (public.current_role() = 'admin')
with check (public.current_role() = 'admin');

create policy "technicians read assigned customer units" on public.aircon_units
for select using (
  public.current_role() = 'technician'
  and exists (
    select 1 from public.jobs
    where jobs.customer_id = aircon_units.customer_id
      and jobs.assigned_to = auth.uid()
  )
);

create policy "admins manage contracts" on public.contracts
for all using (public.current_role() = 'admin')
with check (public.current_role() = 'admin');

create policy "admins manage jobs" on public.jobs
for all using (public.current_role() = 'admin')
with check (public.current_role() = 'admin');

create policy "technicians read assigned jobs" on public.jobs
for select using (assigned_to = auth.uid());

create policy "technicians update assigned job status" on public.jobs
for update using (assigned_to = auth.uid())
with check (assigned_to = auth.uid());

create policy "admins manage service records" on public.service_records
for all using (public.current_role() = 'admin')
with check (public.current_role() = 'admin');

create policy "technicians manage own service records" on public.service_records
for all using (technician_id = auth.uid())
with check (technician_id = auth.uid());

create policy "admins manage invoices" on public.invoices
for all using (public.current_role() = 'admin')
with check (public.current_role() = 'admin');

create policy "admins manage payments" on public.payments
for all using (public.current_role() = 'admin')
with check (public.current_role() = 'admin');
