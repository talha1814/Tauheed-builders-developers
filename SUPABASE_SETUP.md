# Supabase Deployment & Database Setup Guide

This guide walks you through provisioning, configuring, and securing your Supabase PostgreSQL database, authentication, and file storage for **Tauheed Builders & Developers**.

---

## 1. Create a Supabase Project

1. Log into your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click **New Project** and select your organization.
3. Configure project details:
   - **Name**: `Tauheed Builders & Developers`
   - **Database Password**: Set a strong password and store it securely.
   - **Region**: Choose the region closest to Pakistan or your primary audience (e.g. `ap-south-1` Mumbai or `me-central-1` UAE).
4. Wait for database provisioning to complete (typically ~1-2 minutes).

---

## 2. Obtain Credentials & Environment Variables

From your Supabase dashboard:
1. Navigate to **Project Settings** &rarr; **API**.
2. Copy the following keys into your `.env.local` or production environment configuration:
   - **Project URL** &rarr; `NEXT_PUBLIC_SUPABASE_URL`
   - **Project API Keys (`anon` / `public`)** &rarr; `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Project API Keys (`service_role` / `secret`)** &rarr; `SUPABASE_SERVICE_ROLE_KEY` (⚠️ **Never** expose this to public git or client-side code).

---

## 3. Apply SQL Schema Migrations

1. Go to the **SQL Editor** tab in your Supabase dashboard.
2. Click **New Query**.
3. Open the file `supabase/migrations/001_initial_schema.sql` from this codebase, copy its entire contents, paste it into the editor, and click **Run**.
4. This script sets up:
   - Extension `uuid-ossp` and `pgcrypto`
   - Tables: `profiles`, `projects`, `project_images`, `units`, `payment_plans`, `payment_plan_items`, `inquiries`, `inquiry_notes`, `inquiry_activities`, `media_assets`, `pages`, `site_settings`, `audit_logs`
   - Automated `updated_at` triggers
   - High-performance indexes on slugs, categories, and foreign keys
   - Strict **Row Level Security (RLS)** policies ensuring public visitors only read published projects/plans and submit valid inquiries.

---

## 4. Setup Storage Buckets and Policies

1. In the **SQL Editor**, create a new query.
2. Open `supabase/storage_setup.sql`, paste the contents, and click **Run**.
3. This creates:
   - `project-media`: Public bucket for exterior renderings, photography, and thumbnails.
   - `payment-plans`: Public bucket for downloadable PDF schedules.
   - `documents`: Private bucket for title deeds, approvals, and internal paperwork accessible only to authenticated staff.

---

## 5. Seed Demonstration Data

1. In the **SQL Editor**, open `supabase/seed.sql`, paste the contents, and click **Run**.
2. This initializes:
   - Company site settings for Tauheed Builders & Developers
   - Homepage and About Us CMS copy
   - Flagship projects, units, and verified payment plans.

---

## 6. Create the Initial Super Admin User

1. In the Supabase Dashboard, navigate to **Authentication** &rarr; **Users**.
2. Click **Add User** &rarr; **Create User**.
3. Enter:
   - **Email**: `admin@tauheedbuilders.com`
   - **Password**: A strong custom password (e.g., `Tauheed@2026`).
   - Check **Auto Confirm User**.
4. Note the newly generated `User UID` (UUID).
5. In the **SQL Editor**, link this auth user to the `profiles` table as a `super_admin`:

```sql
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
  'PASTE_USER_UUID_HERE',
  'admin@tauheedbuilders.com',
  'Muhammad Tauheed (Super Admin)',
  'super_admin'
)
ON CONFLICT (id) DO UPDATE SET role = 'super_admin';
```

---

## 7. Hybrid Out-of-the-Box Fallback

The codebase contains a built-in hybrid repository layer (`src/lib/data-store.ts`).
- When Supabase environment variables are provided, queries bind to Supabase PostgreSQL.
- If environment variables are missing during local evaluation, the application gracefully operates using the pre-seeded in-memory store so all public routes, inquiry forms, unit inspect pages, and admin CRUD functions can be reviewed and tested instantly without runtime crashes.
