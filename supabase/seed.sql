-- ============================================================================
-- TAUHEED BUILDERS & DEVELOPERS - SEED DEMONSTRATION DATA
-- ============================================================================

-- Site Settings
INSERT INTO public.site_settings (id, data, updated_at)
VALUES (
  1,
  '{
    "companyName": "Tauheed Builders & Developers",
    "tagline": "Mastering Architectural Excellence & Enduring Value",
    "phonePrimary": "+92 21 3584 9200",
    "phoneSecondary": "+92 300 824 5511",
    "whatsappNumber": "+92 300 824 5511",
    "emailPrimary": "info@tauheedbuilders.com",
    "emailSales": "sales@tauheedbuilders.com",
    "headOfficeAddress": "Suite 401-403, Executive Tower, Main Shahrah-e-Faisal",
    "city": "Karachi",
    "country": "Pakistan",
    "officeHours": "Monday - Saturday: 9:30 AM to 6:30 PM",
    "googleMapsEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.9!2d67.06!3d24.86",
    "socialLinks": {
      "facebook": "https://facebook.com/tauheedbuilders",
      "instagram": "https://instagram.com/tauheedbuilders",
      "linkedin": "https://linkedin.com/company/tauheed-builders",
      "youtube": "https://youtube.com/@tauheedbuilders"
    },
    "brochureUrl": "/documents/tauheed-corporate-profile.pdf",
    "seoDefaultTitle": "Tauheed Builders & Developers | Premium Real Estate Developments in Karachi",
    "seoDefaultDescription": "Explore landmark residential, commercial, and mixed-use real estate projects in Karachi by Tauheed Builders & Developers. Transparent payment plans, premium architecture, and unmatched investment value.",
    "enablePublicRegistration": false
  }'::jsonb,
  NOW()
) ON CONFLICT (id) DO UPDATE SET data = EXCLUDED.data;

-- CMS Content
INSERT INTO public.pages (slug, title, content, seo_title, seo_description)
VALUES
  (
    'homepage',
    'Homepage',
    '{
      "heroBadge": "Pioneering Luxury & Precision",
      "heroHeadline": "Architectural Elegance Built on Enduring Trust",
      "heroSubheadline": "Tauheed Builders & Developers conceives, develops, and delivers iconic residential and commercial landmarks across Karachi with uncompromising structural integrity.",
      "heroCtaText": "Explore Flagship Projects",
      "heroSecondaryCta": "Schedule a Consultation",
      "aboutHeading": "Crafting Modern Living Spaces with Timeless Standards",
      "aboutParagraph1": "Founded on values of transparency, structural excellence, and uncompromising craftsmanship, Tauheed Builders & Developers has emerged as a premier force shaping modern urban skylines.",
      "aboutParagraph2": "From luxury residential apartments to cutting-edge corporate hubs, each project is planned with meticulous spatial geometry, premium materials, and verified legal clearances.",
      "stats": [
        {"label": "Years of Proven Delivery", "value": "18", "suffix": "+"},
        {"label": "Delivered Square Feet", "value": "1.2", "suffix": "M+"},
        {"label": "Satisfied Homeowners & Investors", "value": "3,400", "suffix": "+"},
        {"label": "On-Time Completion Rate", "value": "99.2", "suffix": "%"}
      ],
      "investmentCtaTitle": "Secure High-Yield Real Estate in Prime Karachi Locations",
      "investmentCtaSubtitle": "Benefit from capital appreciation and guaranteed rental yield across our approved commercial and luxury residential portfolio."
    }'::jsonb,
    'Tauheed Builders & Developers | Official Website',
    'Discover signature residential and commercial developments by Tauheed Builders & Developers.'
  ),
  (
    'about-us',
    'About Us',
    '{
      "heroTitle": "Shaping Horizons with Integrity and Innovation",
      "heroSubtitle": "For nearly two decades, Tauheed Builders & Developers has maintained an unyielding standard of excellence in architectural construction, urban planning, and client trust.",
      "mission": "To engineer visionary architectural spaces that elevate living standards, protect investor capital, and stand as enduring benchmarks of quality.",
      "vision": "To be the most trusted and innovative real estate development firm in the region, recognized for timely handovers and ethical transparency.",
      "coreValues": [
        {"title": "Uncompromising Quality", "description": "Rigorous engineering standards, seismic safety compliance, and premium Grade-60 steel and high-density concrete.", "icon": "ShieldCheck"},
        {"title": "Absolute Transparency", "description": "100% legal documentation, approved building NOCs, and honest payment structures with no hidden surcharges.", "icon": "Eye"},
        {"title": "Timely Handover", "description": "Engineered project management schedules ensuring handover milestones are met on time.", "icon": "Clock"},
        {"title": "Client Centricity", "description": "Dedicated property concierge, investor reporting, and seamless post-handover facility management.", "icon": "Users"}
      ]
    }'::jsonb,
    'About Tauheed Builders & Developers | Our Heritage & Mission',
    'Learn about the team, heritage, and construction philosophy powering Tauheed Builders & Developers.'
  )
ON CONFLICT (slug) DO UPDATE SET content = EXCLUDED.content;
