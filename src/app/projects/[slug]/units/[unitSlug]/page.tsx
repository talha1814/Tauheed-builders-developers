import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import InquiryForm from '@/components/public/InquiryForm';
import { store } from '@/lib/data-store';
import { formatPKR, formatArea, getWhatsAppUrl } from '@/lib/utils';
import { ChevronRight, ArrowLeft, BedDouble, Bath, Maximize2, ShieldCheck, MapPin } from 'lucide-react';
import { Metadata } from 'next';

interface UnitPageProps {
  params: Promise<{ slug: string; unitSlug: string }>;
}

export async function generateMetadata({ params }: UnitPageProps): Promise<Metadata> {
  const { slug, unitSlug } = await params;
  const unit = await store.getUnitBySlug(slug, unitSlug);
  if (!unit) return { title: 'Unit Not Found' };

  return {
    title: `${unit.unitNumber} (${unit.type}) | ${unit.projectName} | Tauheed Builders`,
    description: unit.description || `Explore ${unit.unitNumber} at ${unit.projectName}.`,
  };
}

export default async function UnitDetailPage({ params }: UnitPageProps) {
  const { slug, unitSlug } = await params;
  const project = await store.getProjectBySlug(slug);
  const unit = await store.getUnitBySlug(slug, unitSlug);

  if (!project || !unit) {
    notFound();
  }

  const settings = await store.getSiteSettings();
  const allProjects = await store.getProjects({ publicationStatus: 'published' });

  const directWhatsAppUrl = getWhatsAppUrl(
    settings.whatsappNumber,
    `Hello Tauheed Builders, I am inquiring about Unit ${unit.unitNumber} in ${project.name} (${unit.type}, ${formatArea(unit.areaSqFt)}). Please confirm availability and booking requirements.`
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      <Header settings={settings} projects={allProjects} />

      <main className="flex-1">
        {/* Breadcrumb & Unit Header */}
        <section className="bg-[#171A1D] text-white py-12 border-b border-[#2A2E33]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="flex items-center gap-2 text-xs text-[#8E9296] mb-4">
              <Link href="/" className="hover:text-white">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#B89A68]" />
              <Link href="/projects" className="hover:text-white">Projects</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#B89A68]" />
              <Link href={`/projects/${project.slug}`} className="hover:text-white">{project.name}</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#B89A68]" />
              <span className="text-[#D4BD8F] font-medium">{unit.unitNumber}</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-[#B89A68] text-[#171A1D] rounded">
                    {unit.category}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-semibold uppercase tracking-wider rounded ${
                    unit.availability === 'available'
                      ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      : 'bg-zinc-800 text-zinc-300'
                  }`}>
                    {unit.availability}
                  </span>
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl font-bold">
                  Unit {unit.unitNumber} — {unit.type.replace('-', ' ')}
                </h1>
                <p className="text-xs sm:text-sm text-[#8E9296] mt-1">
                  Located in {project.name} • Floor {unit.floorNumber}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <div className="text-xs uppercase tracking-wider text-[#8E9296]">Total Unit Price</div>
                <div className="font-serif text-2xl sm:text-3xl font-bold text-[#D4BD8F]">
                  {formatPKR(unit.pricePKR)}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Details */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 7 Cols: Specs, Layout & Floor Plan */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Quick Specs Grid */}
              <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8E7E2] shadow-sm">
                <h2 className="font-serif text-xl font-bold text-[#171A1D] mb-6">
                  Unit Configuration & Spatial Dimensions
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="p-4 bg-[#F7F6F2] rounded border border-[#E8E7E2] text-center">
                    <div className="text-xs text-[#73777C]">Covered Area</div>
                    <div className="text-base font-bold text-[#171A1D] mt-1">
                      {formatArea(unit.areaSqFt)}
                    </div>
                  </div>

                  <div className="p-4 bg-[#F7F6F2] rounded border border-[#E8E7E2] text-center">
                    <div className="text-xs text-[#73777C]">Floor Level</div>
                    <div className="text-base font-bold text-[#171A1D] mt-1">
                      Floor {unit.floorNumber}
                    </div>
                  </div>

                  {unit.bedrooms !== undefined && unit.bedrooms > 0 && (
                    <div className="p-4 bg-[#F7F6F2] rounded border border-[#E8E7E2] text-center">
                      <div className="text-xs text-[#73777C]">Bedrooms</div>
                      <div className="text-base font-bold text-[#171A1D] mt-1">
                        {unit.bedrooms} En-Suite
                      </div>
                    </div>
                  )}

                  {unit.bathrooms !== undefined && unit.bathrooms > 0 && (
                    <div className="p-4 bg-[#F7F6F2] rounded border border-[#E8E7E2] text-center">
                      <div className="text-xs text-[#73777C]">Bathrooms</div>
                      <div className="text-base font-bold text-[#171A1D] mt-1">
                        {unit.bathrooms} Fitted
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-[#E8E7E2]">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#73777C] mb-2">
                    Unit Description
                  </h3>
                  <p className="text-xs sm:text-sm text-[#202124] leading-relaxed">
                    {unit.description || 'Premium architectural unit delivered with approved civil structural certifications, designated covered parking, and high-quality imported fixtures.'}
                  </p>
                </div>
              </div>

              {/* Floor Plan Image */}
              {unit.floorPlanUrl && (
                <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#E8E7E2] shadow-sm">
                  <h3 className="font-serif text-xl font-bold text-[#171A1D] mb-4">
                    Architectural Layout Plan
                  </h3>
                  <div className="relative aspect-[16/11] rounded overflow-hidden bg-zinc-100 border border-[#E8E7E2]">
                    <Image
                      src={unit.floorPlanUrl}
                      alt={`Floor plan for unit ${unit.unitNumber}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Back to Project */}
              <div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171A1D] hover:text-[#B89A68] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Return to Full {project.name} Portfolio</span>
                </Link>
              </div>
            </div>

            {/* Right 5 Cols: Direct Reservation Form */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-6">
                <InquiryForm
                  preselectedProjectId={project.id}
                  preselectedProjectName={project.name}
                  preselectedUnitNumber={unit.unitNumber}
                  projects={allProjects}
                  whatsappNumber={settings.whatsappNumber}
                  title={`Book Unit ${unit.unitNumber}`}
                  subtitle={`Register your reservation request for this ${unit.type.replace('-', ' ')} with flexible developer installment options.`}
                />

                <div className="p-4 bg-white rounded-lg border border-[#E8E7E2] text-xs text-[#73777C] flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#B89A68] shrink-0" />
                  <span>
                    Official booking slip and title transfer issued directly by Tauheed Builders & Developers head office.
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>

      <WhatsAppButton phone={settings.whatsappNumber} />
      <Footer settings={settings} projects={allProjects} />
    </div>
  );
}
