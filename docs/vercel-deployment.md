# Vercel Deployment Guide

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project** and import the repository.
3. Keep the framework preset as **Next.js**.
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy.
6. After deploy, open the production URL on mobile and desktop and confirm the PWA install prompt appears.
