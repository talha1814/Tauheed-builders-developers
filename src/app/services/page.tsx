import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import { store } from '@/lib/data-store';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, PhoneCall } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Services | Tauheed Builders & Developers',
  description: 'Specialized real estate development services: luxury residential construction, commercial office towers, architectural planning, and turnkey facility management.',
};

export default async function ServicesPage() {
  const settings = await store.getSiteSettings();
  const cms = await store.getCMSContent();
  const projects = await store.getProjects({ publicationStatus: 'published' });

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      <Header settings={settings} projects={projects} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#171A1D] text-white py-20 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68] mb-3 inline-block">
              Development Capabilities
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight">
              {cms.servicesPage.heroTitle}
            </h1>
            <p className="text-sm sm:text-base text-[#9CA1A6] mt-4 max-w-2xl leading-relaxed">
              {cms.servicesPage.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Detailed Services Listing */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
          {cms.servicesPage.services.map((service, index) => {
            const isEven = index % 2 === 1;

            return (
              <div
                key={service.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 sm:p-12 bg-white rounded-lg border border-[#E8E7E2] shadow-sm`}
              >
                {/* Image */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-2' : ''}`}>
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] rounded-lg overflow-hidden bg-zinc-100 shadow-md">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className={`lg:col-span-7 space-y-4 ${isEven ? 'lg:order-1' : ''}`}>
                  <div className="inline-block px-3 py-1 bg-[#B89A68]/15 text-[#B89A68] text-xs font-semibold uppercase tracking-wider rounded">
                    {service.category}
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#171A1D]">
                    {service.title}
                  </h2>

                  <p className="text-sm text-[#73777C] leading-relaxed">
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#171A1D] mb-3">
                      Core Scope & Deliverables:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {service.features.map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-[#202124]">
                          <CheckCircle2 className="w-4 h-4 text-[#B89A68] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Link
                      href="/contact-us"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#171A1D] hover:text-[#B89A68] transition-colors"
                    >
                      <span>Inquire About This Service</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Bottom Banner */}
        <section className="py-16 bg-[#171A1D] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center max-w-2xl">
            <h2 className="font-serif text-3xl font-bold">Have a Custom Development In Mind?</h2>
            <p className="text-sm text-[#9CA1A6] mt-3 mb-8">
              We offer bespoke joint venture (JV) collaborations, institutional turnkey construction, and commercial land development across Karachi.
            </p>
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Speak with Our Engineering Consultants</span>
            </Link>
          </div>
        </section>
      </main>

      <WhatsAppButton phone={settings.whatsappNumber} />
      <Footer settings={settings} projects={projects} />
    </div>
  );
}
