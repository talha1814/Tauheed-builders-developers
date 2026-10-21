import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import InquiryForm from '@/components/public/InquiryForm';
import ProjectCard from '@/components/public/ProjectCard';
import { store } from '@/lib/data-store';
import { formatPKR, formatPKRShort, formatArea, getWhatsAppUrl } from '@/lib/utils';
import { calculatePaymentSchedule } from '@/lib/payment-calculator';
import {
  MapPin,
  Calendar,
  Layers,
  Building2,
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  MessageSquare,
  Maximize2,
  ChevronRight,
} from 'lucide-react';
import { Metadata } from 'next';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await store.getProjectBySlug(slug);
  if (!project) return { title: 'Project Not Found' };

  return {
    title: `${project.name} | Tauheed Builders & Developers`,
    description: project.seoDescription || project.shortDescription,
    openGraph: {
      title: `${project.name} | Tauheed Builders & Developers`,
      description: project.shortDescription,
      images: [{ url: project.heroImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await store.getProjectBySlug(slug);

  if (!project || project.publicationStatus !== 'published') {
    notFound();
  }

  const settings = await store.getSiteSettings();
  const allProjects = await store.getProjects({ publicationStatus: 'published' });
  const projectUnits = await store.getUnits(project.id);
  const paymentPlans = await store.getPaymentPlans(project.id);
  const activePlan = paymentPlans[0];

  const calculatedSchedule = activePlan
    ? calculatePaymentSchedule({
        totalAmountPKR: activePlan.totalAmountPKR,
        bookingAmountPKR: activePlan.bookingAmountPKR,
        confirmationAmountPKR: activePlan.confirmationAmountPKR,
        allocationAmountPKR: activePlan.allocationAmountPKR,
        numberOfInstallments: activePlan.numberOfInstallments,
        installmentAmountPKR: activePlan.installmentAmountPKR,
        possessionAmountPKR: activePlan.possessionAmountPKR,
        installmentFrequency: activePlan.installmentFrequency,
        milestones: activePlan.milestones,
      })
    : null;

  const relatedProjects = allProjects
    .filter(p => p.id !== project.id)
    .slice(0, 3);

  const directWhatsAppUrl = getWhatsAppUrl(
    settings.whatsappNumber,
    `Hello Tauheed Builders, I am inquiring about ${project.name} (Slug: ${project.slug}). Please provide the complete brochure, available unit types, and payment schedules.`
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      <Header settings={settings} projects={allProjects} />

      <main className="flex-1">
        {/* ========================================================================= */}
        {/* BREADCRUMB & HERO */}
        {/* ========================================================================= */}
        <section className="bg-[#171A1D] text-white pt-8 pb-16 lg:pb-24 border-b border-[#2A2E33] relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-[#8E9296] mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#B89A68]" />
              <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#B89A68]" />
              <span className="text-[#D4BD8F] font-medium">{project.name}</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center gap-2.5 mb-3">
                  <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#B89A68] text-[#171A1D] rounded">
                    {project.category}
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#252A2F] text-[#D4BD8F] rounded border border-[#3A4048]">
                    {project.status.replace('-', ' ')}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                  {project.name}
                </h1>

                <div className="flex items-center gap-2 text-xs sm:text-sm text-[#8E9296] mt-3">
                  <MapPin className="w-4 h-4 text-[#B89A68] shrink-0" />
                  <span>{project.address}, {project.city}</span>
                </div>
              </div>

              {/* Price & CTA Block */}
              <div className="lg:col-span-4 bg-[#20252A] p-5 rounded-lg border border-[#2A2E33] text-right sm:text-left lg:text-right">
                <div className="text-xs uppercase tracking-wider text-[#8E9296]">Starting Investment</div>
                <div className="text-2xl sm:text-3xl font-bold text-[#D4BD8F] font-serif">
                  {project.priceStartingFrom ? formatPKRShort(project.priceStartingFrom) : 'Inquire for Pricing'}
                </div>
                <div className="mt-3 flex items-center justify-end gap-2">
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#25D366] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#20ba5a] transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Inquiry</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* HERO IMAGE & GALLERY STRIP */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 -mt-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Main Hero Photo */}
            <div className="lg:col-span-8 relative aspect-[16/10] rounded-lg overflow-hidden shadow-2xl border-2 border-white bg-zinc-200">
              <Image
                src={project.heroImage}
                alt={project.name}
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Gallery Thumbnails */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {project.gallery.slice(1, 3).map((img, idx) => (
                <div key={idx} className="relative aspect-[16/10] rounded-lg overflow-hidden shadow-md border-2 border-white bg-zinc-200 group">
                  <Image
                    src={img.url}
                    alt={img.caption || project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {img.caption && (
                    <div className="absolute inset-x-0 bottom-0 bg-black/60 backdrop-blur-xs p-2 text-[11px] text-white truncate">
                      {img.caption}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* MAIN SPECIFICATIONS & DETAILS */}
        {/* ========================================================================= */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 8 Columns: Narrative, Specs, Units, Floor Plans, Payment Plan */}
            <div className="lg:col-span-8 space-y-12">
              
              {/* Project Description */}
              <div className="bg-white p-8 rounded-lg border border-[#E8E7E2] shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-[#171A1D] mb-4">
                  Project Concept & Architecture
                </h2>
                <div className="text-sm text-[#73777C] leading-relaxed space-y-4 whitespace-pre-line">
                  {project.fullDescription}
                </div>

                {/* Key Metrics Quick Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 pt-6 border-t border-[#E8E7E2]">
                  {project.expectedCompletion && (
                    <div>
                      <div className="text-xs text-[#73777C] flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#B89A68]" />
                        <span>Completion Date</span>
                      </div>
                      <div className="text-sm font-semibold text-[#171A1D] mt-0.5">
                        {project.expectedCompletion}
                      </div>
                    </div>
                  )}
                  {project.totalFloors && (
                    <div>
                      <div className="text-xs text-[#73777C] flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-[#B89A68]" />
                        <span>Total Floors</span>
                      </div>
                      <div className="text-sm font-semibold text-[#171A1D] mt-0.5">
                        {project.totalFloors} Storeys
                      </div>
                    </div>
                  )}
                  {project.totalUnits && (
                    <div>
                      <div className="text-xs text-[#73777C] flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-[#B89A68]" />
                        <span>Planned Units</span>
                      </div>
                      <div className="text-sm font-semibold text-[#171A1D] mt-0.5">
                        {project.totalUnits} Units
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Technical Specifications */}
              {project.specifications && project.specifications.length > 0 && (
                <div className="bg-white p-8 rounded-lg border border-[#E8E7E2] shadow-sm">
                  <h3 className="font-serif text-xl font-bold text-[#171A1D] mb-6">
                    Structural Specifications & Engineering Standards
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {project.specifications.map((spec, sIdx) => (
                      <div key={sIdx} className="p-3.5 bg-[#F7F6F2] rounded border border-[#E8E7E2]">
                        <div className="text-xs text-[#73777C]">{spec.label}</div>
                        <div className="text-sm font-semibold text-[#171A1D] mt-0.5">{spec.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* World-Class Amenities */}
              {project.amenities && project.amenities.length > 0 && (
                <div className="bg-white p-8 rounded-lg border border-[#E8E7E2] shadow-sm">
                  <h3 className="font-serif text-xl font-bold text-[#171A1D] mb-6">
                    Exclusive Project Amenities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.amenities.map((amenity, aIdx) => (
                      <div key={aIdx} className="flex items-center gap-2.5 text-xs font-medium text-[#202124]">
                        <CheckCircle2 className="w-4 h-4 text-[#B89A68] shrink-0" />
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Units Showcase */}
              <div className="bg-white p-8 rounded-lg border border-[#E8E7E2] shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#171A1D]">
                      Available Property Units & Layouts
                    </h3>
                    <p className="text-xs text-[#73777C] mt-1">
                      Explore floor, area, and current availability status.
                    </p>
                  </div>
                </div>

                {projectUnits.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-[#E8E7E2] text-[#73777C] uppercase font-semibold">
                          <th className="py-3 px-2">Unit ID</th>
                          <th className="py-3 px-2">Type</th>
                          <th className="py-3 px-2">Floor</th>
                          <th className="py-3 px-2">Area</th>
                          <th className="py-3 px-2">Price (PKR)</th>
                          <th className="py-3 px-2">Availability</th>
                          <th className="py-3 px-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#E8E7E2]">
                        {projectUnits.map((unit) => (
                          <tr key={unit.id} className="hover:bg-[#F7F6F2] transition-colors">
                            <td className="py-3.5 px-2 font-mono font-bold text-[#171A1D]">
                              {unit.unitNumber}
                            </td>
                            <td className="py-3.5 px-2 capitalize font-medium text-[#202124]">
                              {unit.type.replace('-', ' ')}
                            </td>
                            <td className="py-3.5 px-2 text-[#73777C]">
                              Floor {unit.floorNumber}
                            </td>
                            <td className="py-3.5 px-2 font-medium">
                              {formatArea(unit.areaSqFt)}
                            </td>
                            <td className="py-3.5 px-2 font-semibold text-[#B89A68]">
                              {formatPKR(unit.pricePKR)}
                            </td>
                            <td className="py-3.5 px-2">
                              <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                                unit.availability === 'available'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : unit.availability === 'reserved'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-zinc-200 text-zinc-700'
                              }`}>
                                {unit.availability}
                              </span>
                            </td>
                            <td className="py-3.5 px-2 text-right">
                              <Link
                                href={`/projects/${project.slug}/units/${unit.slug}`}
                                className="inline-flex items-center gap-1 text-[11px] font-bold text-[#171A1D] hover:text-[#B89A68] transition-colors"
                              >
                                <span>Inspect</span>
                                <ArrowRight className="w-3 h-3" />
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8 text-xs text-[#73777C]">
                    Detailed inventory release currently in progress. Contact sales office for immediate reservation.
                  </div>
                )}
              </div>

              {/* Architectural Floor Plans */}
              {project.floorPlans && project.floorPlans.length > 0 && (
                <div className="bg-white p-8 rounded-lg border border-[#E8E7E2] shadow-sm">
                  <h3 className="font-serif text-xl font-bold text-[#171A1D] mb-6">
                    Architectural Floor Plans & Spatial Layouts
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {project.floorPlans.map((fp) => (
                      <div key={fp.id} className="border border-[#E8E7E2] rounded-lg overflow-hidden group">
                        <div className="relative aspect-[4/3] bg-zinc-100">
                          <Image
                            src={fp.imageUrl}
                            alt={fp.title}
                            fill
                            className="object-cover group-hover:scale-102 transition-transform"
                          />
                        </div>
                        <div className="p-4 bg-[#F7F6F2] flex items-center justify-between">
                          <div>
                            <div className="text-xs font-bold text-[#171A1D]">{fp.title}</div>
                            {fp.areaSqFt && (
                              <div className="text-[11px] text-[#73777C]">{formatArea(fp.areaSqFt)}</div>
                            )}
                          </div>
                          <a
                            href={fp.imageUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-[#73777C] hover:text-[#B89A68] hover:bg-white rounded transition-colors"
                            title="Expand View"
                          >
                            <Maximize2 className="w-4 h-4" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payment Schedule Calculator Breakdown */}
              {calculatedSchedule && (
                <div className="bg-white p-8 rounded-lg border border-[#E8E7E2] shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B89A68]">
                        Transparent Schedule
                      </span>
                      <h3 className="font-serif text-xl font-bold text-[#171A1D]">
                        {activePlan.name}
                      </h3>
                      <p className="text-xs text-[#73777C] mt-0.5">
                        Total Value: <strong>{formatPKR(calculatedSchedule.totalAmountPKR)}</strong>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {calculatedSchedule.schedule.map((item, idx) => (
                      <div key={idx} className="p-3.5 bg-[#F7F6F2] rounded border border-[#E8E7E2] flex items-center justify-between text-xs">
                        <div>
                          <div className="font-semibold text-[#171A1D]">{item.title}</div>
                          <div className="text-[11px] text-[#73777C]">{item.timeline}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-bold text-[#B89A68] text-sm">
                            {formatPKR(item.amountPKR)}
                          </div>
                          <div className="text-[10px] text-[#73777C]">{item.percentage}% of total</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right 4 Columns: Sticky Consultation & Direct Contacts */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Direct Booking Form Card */}
              <div className="sticky top-24">
                <InquiryForm
                  preselectedProjectId={project.id}
                  preselectedProjectName={project.name}
                  projects={allProjects}
                  whatsappNumber={settings.whatsappNumber}
                  title={`Inquire About ${project.name}`}
                  subtitle="Receive instant price breakdowns, available unit numbers, and register for a priority site walkthrough."
                />

                {/* Direct Contact Card */}
                <div className="mt-6 bg-[#171A1D] text-white p-6 rounded-lg border border-[#2A2E33] shadow-md space-y-4">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
                    Dedicated Project Concierge
                  </div>
                  <h4 className="font-serif text-lg font-bold">
                    Speak Directly with Our Sales Office
                  </h4>
                  <div className="space-y-3 text-xs text-[#C8C7C2]">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#B89A68]" />
                      <a href={`tel:${settings.phonePrimary}`} className="hover:text-white transition-colors">
                        {settings.phonePrimary}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-[#B89A68]" />
                      <a href={directWhatsAppUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                        WhatsApp: {settings.whatsappNumber}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* RELATED DEVELOPMENTS */}
        {/* ========================================================================= */}
        {relatedProjects.length > 0 && (
          <section className="py-20 bg-white border-t border-[#E8E7E2]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="mb-10">
                <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
                  More Developments
                </span>
                <h3 className="font-serif text-3xl font-bold text-[#171A1D] mt-1">
                  Explore Related Landmark Projects
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((p) => (
                  <ProjectCard key={p.id} project={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <WhatsAppButton phone={settings.whatsappNumber} />
      <Footer settings={settings} projects={allProjects} />
    </div>
  );
}
