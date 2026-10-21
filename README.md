# Tauheed Builders & Developers — Premium Real Estate Portal & Admin CMS

A production-oriented, architectural real estate developer website and authenticated administrative content management system (CMS) built for **Tauheed Builders & Developers** (Karachi, Pakistan).

---

## 🏛️ Brand & Architectural Aesthetic

- **Brand Logo**: Uses the provided architectural monogram logo (`/public/logo.png`) rendered via Next.js `<Image>` across Header, Footer, Admin Login, and Favicon.
- **Palette**:
  - **Charcoal (`#171A1D`)**: Primary background for high-contrast dark architectural sections.
  - **Warm Ivory (`#F7F6F2`)**: Primary background for luminous editorial sections.
  - **Muted Gold/Brass (`#B89A68`)**: Primary brand accent derived from the logo monogram.
  - **Soft Grey (`#E8E7E2`)**: Clean structural borders and card outlines.
  - **Primary Text (`#202124`)**: High legibility typography.
- **Typography**:
  - `Playfair Display` for editorial headlines and architectural titles.
  - `Inter` for high-density navigation, specifications, forms, and admin dashboard controls.

---

## 🚀 Key Features

### 1. Public Marketing Website
- **Cinematic Hero**: Architectural hero with trust indicators (18+ years, 1.2M+ sq ft delivered, 99.2% on-time completion).
- **Dynamic Projects Directory (`/projects`)**: Real-time filtering by category (Residential, Commercial, Mixed-Use), status (Under Construction, Ready to Move, Upcoming), and search.
- **Single Project Showcase (`/projects/[slug]`)**: Photo gallery, structural specifications, amenities, available unit inventory table, architectural floor plans, construction milestone schedule, and direct WhatsApp / consultation inquiry forms.
- **Unit Inspector (`/projects/[slug]/units/[unitSlug]`)**: Detailed unit spatial dimensions, floor levels, pricing (PKR), layout plans, and booking reservations.
- **Company Story (`/about-us`)**: Mission, vision, core values, milestone timeline, and executive leadership profiles.
- **Services (`/services`)**: Turnkey development capabilities, commercial construction, and project management.
- **Contact & Consultations (`/contact-us`)**: Validated contact form, Google Maps embed, phone, email, and WhatsApp concierge.
- **Legal Compliance (`/privacy-policy`, `/terms`)**: Legally vetted real estate terms and disclosures.

### 2. Authenticated Admin Dashboard (`/admin`)
- **Executive Overview**: Live database metrics: Total projects, published vs drafts, unit availability, and customer inquiries awaiting follow-up.
- **Project Manager (`/admin/projects`)**: Create, edit, publish/archive, and delete developments with slug generation, specifications, and amenity tags.
- **Inventory & Unit Manager (`/admin/units`)**: Add and manage apartments, offices, and shops with floor info, area (sq ft), price (PKR), and availability status toggles.
- **Payment Plan Builder (`/admin/payment-plans`)**: Milestone schedule generator with **automated decimal balance validation** that detects discrepancies between entered components and total contract price.
- **Lead & Inquiry Pipeline (`/admin/inquiries`)**: Full sales pipeline (New &rarr; Contacted &rarr; Qualified &rarr; Site Visit &rarr; Converted), staff assignment, internal notes history, and **one-click CSV export**.
- **CMS Content Editor (`/admin/pages`)**: Edit homepage headlines, about us copy, and services without code alterations.
- **Site Configuration (`/admin/settings`)**: Configure primary phone numbers, WhatsApp concierge, corporate address, office hours, and SEO defaults.
- **Immutable Audit Trail (`/admin/audit-logs`)**: Security log capturing administrative actions, timestamps, and target entities.

---

## 🛠️ Technology Stack

- **Framework**: Next.js (App Router, Server Components & Client Components)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom design tokens
- **Icons**: Lucide React
- **Database & Auth**: Supabase PostgreSQL, Supabase Auth, Row Level Security (RLS)
- **Validation**: React Hook Form + Zod
- **Testing**: Vitest for automated unit calculations

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Automated Tests
```bash
npm test
```

### 4. Build for Production
```bash
npm run build
```

---

## 🔐 Admin Dashboard Access

Navigate to `/admin/login`:
- **Super Admin**: `admin@tauheedbuilders.com` / `Tauheed@2026`
- **Sales Staff**: `sales@tauheedbuilders.com` / `Tauheed@2026`
*(Pre-configured quick auto-fill buttons are provided on the login screen for testing convenience).*

---

## 🗄️ Database & Storage Setup

Refer to [`SUPABASE_SETUP.md`](./SUPABASE_SETUP.md) for instructions on applying SQL migrations (`supabase/migrations/001_initial_schema.sql`), storage bucket creation (`supabase/storage_setup.sql`), and seeding demonstration records (`supabase/seed.sql`).
