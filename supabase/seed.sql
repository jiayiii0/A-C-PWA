insert into public.customers (id, name, phone, whatsapp, address, customer_type, notes)
values
  ('00000000-0000-0000-0000-000000000101', 'Leong Family', '+60 12-778 9011', '60127789011', '18 Jalan Rimbun, Taman Desa', 'residential', 'Prefers morning visits.'),
  ('00000000-0000-0000-0000-000000000102', 'Bright Dental Studio', '+60 3-2288 1140', '60322881140', 'Lot 2-11, Plaza Sentral', 'commercial', 'Service before clinic opens.');

insert into public.contracts (id, customer_id, start_date, end_date, interval_months, price_per_visit, number_of_units, status, next_service_date)
values
  ('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', '2026-02-15', '2027-02-15', 3, 240, 3, 'active', '2026-07-03'),
  ('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000102', '2025-07-20', '2026-07-20', 3, 520, 5, 'expiring_soon', '2026-06-30');
