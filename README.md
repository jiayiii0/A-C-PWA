# Housely A/C CoolCare Service Manager

Progressive Web App for a two-person air conditioner service company. It is an internal business tool for customers, air conditioner units, contracts, every-3-month cleaning schedules, jobs, service records, invoices, payments, and monthly reports.

## Stack

- Next.js, TypeScript, Tailwind CSS
- Supabase Auth, Database, and Storage
- Installable PWA with manifest and service worker
- Deployable to Vercel free tier

## Local setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local`:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

3. Run the app:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000`.

## Supabase setup

Run these SQL files in order from the Supabase SQL editor:

1. `supabase/schema.sql`
2. `supabase/rls-policies.sql`
3. `supabase/seed.sql`

The RLS file creates a private Storage bucket named `service-photos` for before and after photos. Keep it private and expose images through authenticated access or signed URLs.

Create Supabase Auth users for the owner and technicians, then add matching rows in `public.users` with roles:

- `admin` for the owner
- `technician` for field workers

When Supabase environment variables are configured, middleware protects internal app pages and redirects unsigned users to `/login`. When the variables are missing, the app stays open with demo data so UI review and local builds still work.

## PWA installation

Android Chrome: open the site, tap the install prompt or menu, then tap **Add to Home screen**.

iPhone Safari: open the site, tap **Share**, then **Add to Home Screen**.

The PWA caches core pages only. Offline database editing is intentionally not enabled.

## Deployment on Vercel

1. Import the GitHub repository into Vercel.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
3. Deploy with the default Next.js settings.

## Current implementation notes

The app now uses a Supabase-ready data layer. When Supabase environment variables are configured, list pages read from Supabase; otherwise they fall back to realistic demo data so the PWA still builds and can be reviewed.

Customer creation includes server-side validation and posts to Supabase when configured. Job and technician screens build WhatsApp website links from customer phone data with prefilled service messages.

Technicians can now save job status updates and completed service records, including before/after image upload paths for the `service-photos` bucket.

The next development step is adding invoice generation after completed jobs and full create/edit flows for contracts, invoices, and payments.
