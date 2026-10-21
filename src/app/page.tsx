import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import ProjectCard from '@/components/public/ProjectCard';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import InquiryForm from '@/components/public/InquiryForm';
import { store } from '@/lib/data-store';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  TrendingUp, 
  ArrowRight, 
  CheckCircle, 
  FileText, 
  Sparkles,
  Layers,
  MapPin,
  Clock,
  Compass
} from 'lucide-react';
import { formatPKRShort } from '@/lib/utils';

export default async function HomePage() {
  const settings = await store.getSiteSettings();
  const cms = await store.getCMSContent();
  const allProjects = await store.getProjects({ publicationStatus: 'published' });
  const featuredProjects = allProjects.filter(p => p.featured);

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      {/* Header with Tauheed Logo */}
      <Header settings={settings} projects={allProjects} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* HERO SECTION: Large Cinematic Architectural Hero */}
        {/* ========================================================================= */}
        <section className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center justify-center bg-[#171A1D] text-white overflow-hidden">
          {/* Background Image with Dark Vignette */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85"
              alt="Tauheed Builders Architectural Landmark"
              fill
              priority
              className="object-cover opacity-35 scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#171A1D] via-[#171A1D]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171A1D] via-transparent to-black/40" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-20 w-full">
            <div className="max-w-3xl">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B89A68]/20 border border-[#B89A68]/40 text-[#D4BD8F] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{cms.homepage.heroBadge}</span>
              </div>

              {/* Bold Editorial Headline */}
              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] mb-6">
                Architectural Elegance Built on <span className="text-[#B89A68]">Enduring Trust</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#C8C7C2] font-normal leading-relaxed mb-10 max-w-2xl">
                {cms.homepage.heroSubheadline}
              </p>

              {/* Primary Calls to Action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase tracking-widest rounded transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                >
                  <span>{cms.homepage.heroCtaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent hover:bg-white/10 text-white border border-white/30 hover:border-white text-xs font-bold uppercase tracking-widest rounded transition-all duration-200"
                >
                  <span>{cms.homepage.heroSecondaryCta}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Stats Bar at Bottom of Hero */}
          <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#171A1D]/90 backdrop-blur-md border-t border-[#2A2E33] hidden md:block">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 grid grid-cols-4 divide-x divide-[#2A2E33]">
              {cms.homepage.stats.map((stat, idx) => (
                <div key={idx} className="px-6 first:pl-0 last:pr-0">
                  <div className="font-serif text-2xl lg:text-3xl font-bold text-[#B89A68]">
                    {stat.value}{stat.suffix}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#8E9296] mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mobile Stats Showcase */}
        <div className="md:hidden bg-[#171A1D] text-white py-8 px-6 grid grid-cols-2 gap-6 border-b border-[#2A2E33]">
          {cms.homepage.stats.map((stat, idx) => (
            <div key={idx}>
              <div className="font-serif text-2xl font-bold text-[#B89A68]">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-xs text-[#8E9296] mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* ========================================================================= */}
        {/* COMPANY INTRODUCTION: Editorial Craftsmanship Story */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Column: Architectural Imagery Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden shadow-2xl border-4 border-white">
                <Image
                  src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80"
                  alt="Tauheed Heights Structure"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Overlapping Floating Card */}
              <div className="absolute -bottom-6 -right-4 sm:-right-8 bg-[#171A1D] text-white p-5 rounded-lg shadow-xl border border-[#2A2E33] max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#B89A68]/20 flex items-center justify-center text-[#B89A68]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#D4BD8F]">
                      SBCA Certified
                    </div>
                    <div className="text-[11px] text-[#8E9296]">
                      100% Legal Clearances & Verified Land Titles
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Narrative */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
                <Building2 className="w-4 h-4" />
                <span>Our Heritage & Philosophy</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#171A1D] leading-tight">
                {cms.homepage.aboutHeading}
              </h2>

              <p className="text-sm sm:text-base text-[#73777C] leading-relaxed">
                {cms.homepage.aboutParagraph1}
              </p>

              <p className="text-sm sm:text-base text-[#73777C] leading-relaxed">
                {cms.homepage.aboutParagraph2}
              </p>

              {/* Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#B89A68] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#171A1D]">Grade-60 Reinforced Steel</div>
                    <div className="text-xs text-[#73777C]">Seismic-resistant structural foundations.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#B89A68] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#171A1D]">Direct Developer Pricing</div>
                    <div className="text-xs text-[#73777C]">Zero hidden surcharges and transparent schedules.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#B89A68] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#171A1D]">Guaranteed Completion Dates</div>
                    <div className="text-xs text-[#73777C]">Engineered critical-path construction schedules.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#B89A68] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold text-[#171A1D]">Prime Karachi Corridors</div>
                    <div className="text-xs text-[#73777C]">High-growth commercial and residential zones.</div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/about-us"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171A1D] hover:text-[#B89A68] transition-colors"
                >
                  <span>Learn More About Our Executive Leadership</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* FEATURED PROJECTS: Dynamic Database-Derived Grid */}
        {/* ========================================================================= */}
        <section className="py-20 bg-white border-y border-[#E8E7E2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
                  Portfolio of Distinction
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171A1D] mt-1">
                  Signature Developments
                </h2>
                <p className="text-sm text-[#73777C] mt-2 max-w-xl">
                  Explore landmark high-rises, corporate headquarters, and private gated mansions conceived for long-term capital appreciation.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[#171A1D] bg-[#F7F6F2] hover:bg-[#B89A68] hover:text-white rounded border border-[#E8E7E2] transition-all"
                >
                  <span>Explore Full Portfolio ({allProjects.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.slice(0, 3).map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* SERVICES & CAPABILITIES: Development Prowess */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 bg-[#171A1D] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
                Multidisciplinary Expertise
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-2">
                Comprehensive Real Estate Development
              </h2>
              <p className="text-sm text-[#8E9296] mt-3">
                From initial site feasibility and municipal clearances to architectural engineering and post-delivery property management.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {cms.servicesPage.services.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-[#20252A] p-6 rounded-lg border border-[#2A2E33] hover:border-[#B89A68]/50 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="w-12 h-12 rounded bg-[#171A1D] border border-[#2A2E33] text-[#B89A68] flex items-center justify-center font-serif text-lg font-bold mb-5 group-hover:bg-[#B89A68] group-hover:text-[#171A1D] transition-colors">
                      0{index + 1}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-white group-hover:text-[#B89A68] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#8E9296] leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>
                  <ul className="space-y-1.5 border-t border-[#2A2E33] pt-4 text-[11px] text-[#A6ABB0]">
                    {service.features.slice(0, 2).map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 bg-[#B89A68] rounded-full" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Link
                href="/services"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B89A68] hover:text-[#D4BD8F] transition-colors"
              >
                <span>View Complete Service Specifications</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INVESTMENT OPPORTUNITY & BROCHURE DOWNLOAD BANNER */}
        {/* ========================================================================= */}
        <section className="py-16 bg-[#B89A68] text-[#171A1D]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="text-xs font-bold uppercase tracking-widest text-[#171A1D]/80 mb-1">
                Investor Advisory & Capital Safety
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold leading-tight">
                {cms.homepage.investmentCtaTitle}
              </h2>
              <p className="text-sm font-medium mt-2 text-[#171A1D]/90">
                {cms.homepage.investmentCtaSubtitle}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto shrink-0">
              <a
                href={settings.brochureUrl || "/documents/tauheed-corporate-brochure.pdf"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#171A1D] hover:bg-[#252A2F] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow-md"
              >
                <FileText className="w-4 h-4 text-[#B89A68]" />
                <span>Download Corporate Profile (PDF)</span>
              </a>
              <Link
                href="/contact-us"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white hover:bg-[#F7F6F2] text-[#171A1D] text-xs font-bold uppercase tracking-wider rounded transition-colors border border-white"
              >
                <span>Request Private Briefing</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* INQUIRY SECTION: Interactive Developer Consultation Form */}
        {/* ========================================================================= */}
        <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
                Direct Acquisition & Guidance
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171A1D] leading-tight">
                Connect Directly with the Developer Concierge
              </h2>
              <p className="text-sm text-[#73777C] leading-relaxed">
                Whether you are seeking a premier residence for your family or high-yield commercial space for your enterprise, our dedicated project directors provide transparent, verified guidance.
              </p>

              <div className="space-y-4 pt-2">
                <div className="p-4 bg-white rounded-lg border border-[#E8E7E2]">
                  <div className="text-xs font-semibold text-[#171A1D]">Direct Developer Allotment</div>
                  <div className="text-xs text-[#73777C] mt-0.5">No intermediary commissions or broker markups.</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-[#E8E7E2]">
                  <div className="text-xs font-semibold text-[#171A1D]">Flexible Construction-Linked Milestones</div>
                  <div className="text-xs text-[#73777C] mt-0.5">Pay in comfortable 24 to 36-month quarterly or monthly installments.</div>
                </div>
                <div className="p-4 bg-white rounded-lg border border-[#E8E7E2]">
                  <div className="text-xs font-semibold text-[#171A1D]">Overseas Pakistani Priority Liaison</div>
                  <div className="text-xs text-[#73777C] mt-0.5">Dedicated WhatsApp & virtual documentation for international investors.</div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="lg:col-span-7">
              <InquiryForm
                projects={allProjects}
                whatsappNumber={settings.whatsappNumber}
              />
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Concierge */}
      <WhatsAppButton phone={settings.whatsappNumber} />

      {/* Footer */}
      <Footer settings={settings} projects={allProjects} />
    </div>
  );
}
