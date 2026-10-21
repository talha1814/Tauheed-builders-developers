-- ============================================================================
-- TAUHEED BUILDERS & DEVELOPERS - STORAGE BUCKET CONFIGURATION & POLICIES
-- ============================================================================

-- 1. Create Storage Buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  ('project-media', 'project-media', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/avif']),
  ('documents', 'documents', false, 20971520, ARRAY['application/pdf']),
  ('payment-plans', 'payment-plans', true, 10485760, ARRAY['application/pdf'])
ON CONFLICT (id) DO UPDATE SET
  public = EXCLUDED.public,
  file_size_limit = EXCLUDED.file_size_limit,
  allowed_mime_types = EXCLUDED.allowed_mime_types;

-- 2. Storage Policies for project-media (Public read, authenticated admin write)
CREATE POLICY "Public media is accessible to all"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'project-media');

CREATE POLICY "Admins can upload project media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'project-media' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
  );

CREATE POLICY "Admins can delete project media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'project-media' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
  );

-- 3. Storage Policies for payment-plans (Public PDF downloads)
CREATE POLICY "Public can view payment plan documents"
  ON storage.objects FOR SELECT
  TO anon, authenticated
  USING (bucket_id = 'payment-plans');

CREATE POLICY "Admins can manage payment plan documents"
  ON storage.objects FOR ALL
  TO authenticated
  USING (
    bucket_id = 'payment-plans' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('super_admin', 'admin'))
  );

-- 4. Storage Policies for confidential documents (Private bucket)
CREATE POLICY "Staff only can view internal documents"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'documents' AND
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid())
  );
