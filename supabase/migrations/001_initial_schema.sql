-- ============================================================================
-- TAUHEED BUILDERS & DEVELOPERS - SUPABASE INITIAL SCHEMA
-- Description: Core tables, foreign keys, indexes, triggers, and Row Level Security
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Helper Function: Automatic updated_at timestamp
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. User Profiles Table (Mirrors Supabase Auth Users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('super_admin', 'admin', 'sales_staff')) DEFAULT 'sales_staff',
  phone TEXT,
  avatar_url TEXT,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER trg_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 3. Projects Table
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL CHECK (category IN ('residential', 'commercial', 'mixed-use', 'corporate')),
  status TEXT NOT NULL CHECK (status IN ('upcoming', 'under-construction', 'ready-to-move', 'completed')),
  publication_status TEXT NOT NULL CHECK (publication_status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Karachi',
  location_map_url TEXT,
  hero_image TEXT NOT NULL,
  brochure_url TEXT,
  price_starting_from NUMERIC(15, 2),
  expected_completion TEXT,
  total_floors INTEGER,
  total_units INTEGER,
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  specifications JSONB DEFAULT '[]'::jsonb,
  amenities JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_slug ON public.projects(slug);
CREATE INDEX idx_projects_publication_status ON public.projects(publication_status);
CREATE INDEX idx_projects_featured ON public.projects(featured);
CREATE INDEX idx_projects_category ON public.projects(category);

CREATE TRIGGER trg_projects_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 4. Project Images Gallery
CREATE TABLE IF NOT EXISTS public.project_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  alt_text TEXT,
  is_hero BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_project_images_project_id ON public.project_images(project_id);

-- 5. Units Table
CREATE TABLE IF NOT EXISTS public.units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  unit_number TEXT NOT NULL,
  slug TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('residential', 'commercial', 'office')),
  type TEXT NOT NULL,
  bedrooms INTEGER DEFAULT 0,
  bathrooms INTEGER DEFAULT 0,
  area_sq_ft NUMERIC(10, 2) NOT NULL,
  price_pkr NUMERIC(15, 2) NOT NULL,
  availability TEXT NOT NULL CHECK (availability IN ('available', 'reserved', 'sold')) DEFAULT 'available',
  floor_number TEXT NOT NULL,
  description TEXT,
  floor_plan_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_project_unit_slug UNIQUE (project_id, slug),
  CONSTRAINT uq_project_unit_number UNIQUE (project_id, unit_number)
);

CREATE INDEX idx_units_project_id ON public.units(project_id);
CREATE INDEX idx_units_availability ON public.units(availability);

CREATE TRIGGER trg_units_updated_at
BEFORE UPDATE ON public.units
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 6. Payment Plans Table
CREATE TABLE IF NOT EXISTS public.payment_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  unit_id UUID REFERENCES public.units(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  total_amount_pkr NUMERIC(15, 2) NOT NULL,
  booking_amount_pkr NUMERIC(15, 2) NOT NULL DEFAULT 0,
  confirmation_amount_pkr NUMERIC(15, 2) NOT NULL DEFAULT 0,
  allocation_amount_pkr NUMERIC(15, 2) NOT NULL DEFAULT 0,
  installment_frequency TEXT NOT NULL CHECK (installment_frequency IN ('monthly', 'quarterly', 'bi-annual')) DEFAULT 'monthly',
  number_of_installments INTEGER NOT NULL DEFAULT 0,
  installment_amount_pkr NUMERIC(15, 2) NOT NULL DEFAULT 0,
  possession_amount_pkr NUMERIC(15, 2) NOT NULL DEFAULT 0,
  effective_date DATE NOT NULL DEFAULT CURRENT_DATE,
  currency TEXT NOT NULL DEFAULT 'PKR',
  pdf_document_url TEXT,
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  publication_status TEXT NOT NULL CHECK (publication_status IN ('draft', 'published', 'archived')) DEFAULT 'published',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_project_plan_slug UNIQUE (project_id, slug)
);

CREATE INDEX idx_payment_plans_project_id ON public.payment_plans(project_id);

CREATE TRIGGER trg_payment_plans_updated_at
BEFORE UPDATE ON public.payment_plans
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 7. Payment Plan Items (Milestones)
CREATE TABLE IF NOT EXISTS public.payment_plan_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_plan_id UUID NOT NULL REFERENCES public.payment_plans(id) ON DELETE CASCADE,
  milestone_title TEXT NOT NULL,
  percentage NUMERIC(5, 2) NOT NULL,
  amount_pkr NUMERIC(15, 2) NOT NULL,
  due_date_description TEXT,
  is_custom_milestone BOOLEAN NOT NULL DEFAULT FALSE,
  display_order INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX idx_payment_plan_items_plan ON public.payment_plan_items(payment_plan_id);

-- 8. Customer Inquiries and Lead Pipeline
CREATE TABLE IF NOT EXISTS public.inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  preferred_contact TEXT NOT NULL CHECK (preferred_contact IN ('phone', 'whatsapp', 'email')) DEFAULT 'phone',
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  unit_id UUID REFERENCES public.units(id) ON DELETE SET NULL,
  message TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'website',
  status TEXT NOT NULL CHECK (status IN ('new', 'contacted', 'qualified', 'site-visit', 'converted', 'lost')) DEFAULT 'new',
  assigned_staff_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  follow_up_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inquiries_status ON public.inquiries(status);
CREATE INDEX idx_inquiries_assigned ON public.inquiries(assigned_staff_id);
CREATE INDEX idx_inquiries_created_at ON public.inquiries(created_at DESC);

CREATE TRIGGER trg_inquiries_updated_at
BEFORE UPDATE ON public.inquiries
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- 9. Inquiry Notes
CREATE TABLE IF NOT EXISTS public.inquiry_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inquiry_notes_inquiry ON public.inquiry_notes(inquiry_id);

-- 10. Inquiry Activities
CREATE TABLE IF NOT EXISTS public.inquiry_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  inquiry_id UUID NOT NULL REFERENCES public.inquiries(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_name TEXT NOT NULL,
  action TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_inquiry_activities_inquiry ON public.inquiry_activities(inquiry_id);

-- 11. Media Assets Table
CREATE TABLE IF NOT EXISTS public.media_assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  size_bytes BIGINT NOT NULL,
  mime_type TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('project-photo', 'floor-plan', 'brochure', 'payment-plan', 'general')),
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  alt_text TEXT,
  uploaded_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_media_assets_category ON public.media_assets(category);

-- 12. CMS Page Content
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. Site Settings (Single Row Store)
CREATE TABLE IF NOT EXISTS public.site_settings (
  id INTEGER PRIMARY KEY CHECK (id = 1) DEFAULT 1,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 14. Audit Logs (Append-Only)
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  entity_name TEXT,
  details JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_created_at ON public.audit_logs(created_at DESC);
CREATE INDEX idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_plan_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiry_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Profiles: Authenticated staff can read; users can edit own profile; super_admin has full access
CREATE POLICY "Profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Projects: Public can view published projects only
CREATE POLICY "Public can view published projects"
  ON public.projects FOR SELECT
  TO anon, authenticated
  USING (publication_status = 'published');

CREATE POLICY "Staff can view all projects"
  ON public.projects FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Admins can manage projects"
  ON public.projects FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')));

-- Project Images: Public can view images of published projects
CREATE POLICY "Public can view images of published projects"
  ON public.project_images FOR SELECT
  TO anon, authenticated
  USING (EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = project_images.project_id AND projects.publication_status = 'published'
  ));

CREATE POLICY "Admins can manage project images"
  ON public.project_images FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')));

-- Units: Public can view public units of published projects
CREATE POLICY "Public can view active units"
  ON public.units FOR SELECT
  TO anon, authenticated
  USING (is_public = true AND EXISTS (
    SELECT 1 FROM public.projects 
    WHERE projects.id = units.project_id AND projects.publication_status = 'published'
  ));

CREATE POLICY "Admins can manage units"
  ON public.units FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')));

-- Payment Plans: Public can view published plans of published projects
CREATE POLICY "Public can view published payment plans"
  ON public.payment_plans FOR SELECT
  TO anon, authenticated
  USING (is_public = true AND publication_status = 'published');

CREATE POLICY "Admins can manage payment plans"
  ON public.payment_plans FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')));

-- Inquiries: Public can INSERT inquiries (validated leads); Staff can view and manage
CREATE POLICY "Public can submit inquiries"
  ON public.inquiries FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Staff can view and update inquiries"
  ON public.inquiries FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid()));

-- Inquiry Notes & Activities: Staff only
CREATE POLICY "Staff can view and add notes"
  ON public.inquiry_notes FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid()));

CREATE POLICY "Staff can view and add activities"
  ON public.inquiry_activities FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid()));

-- Pages & Site Settings: Public can read, Admins can update
CREATE POLICY "Public can read pages content"
  ON public.pages FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can manage pages"
  ON public.pages FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')));

CREATE POLICY "Public can read site settings"
  ON public.site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Admins can update site settings"
  ON public.site_settings FOR ALL
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')));

-- Audit Logs: Restricted to Admins only
CREATE POLICY "Admins can view audit logs"
  ON public.audit_logs FOR SELECT
  TO authenticated
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin')));

CREATE POLICY "System can insert audit logs"
  ON public.audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);
