import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import { store } from '@/lib/data-store';
import Image from 'next/image';
import { ShieldCheck, Eye, Clock, Users, Award, Building, Target, Sparkles } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Tauheed Builders & Developers',
  description: 'Discover the heritage, values, leadership, and engineering standards behind Tauheed Builders & Developers in Karachi.',
};

export default async function AboutPage() {
  const settings = await store.getSiteSettings();
  const cms = await store.getCMSContent();
  const projects = await store.getProjects({ publicationStatus: 'published' });

  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-8 h-8 text-[#B89A68]" />,
    Eye: <Eye className="w-8 h-8 text-[#B89A68]" />,
    Clock: <Clock className="w-8 h-8 text-[#B89A68]" />,
    Users: <Users className="w-8 h-8 text-[#B89A68]" />,
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      <Header settings={settings} projects={projects} />

      <main className="flex-1">
        {/* Editorial Page Hero */}
        <section className="bg-[#171A1D] text-white py-20 lg:py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68] mb-3 inline-block">
              Corporate Heritage & Legacy
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold max-w-3xl leading-tight">
              {cms.aboutPage.heroTitle}
            </h1>
            <p className="text-sm sm:text-base text-[#9CA1A6] mt-4 max-w-2xl leading-relaxed">
              {cms.aboutPage.heroSubtitle}
            </p>
          </div>
        </section>

        {/* Mission & Vision Cards */}
        <section className="py-16 -mt-8 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E8E7E2]">
              <div className="w-12 h-12 rounded bg-[#B89A68]/15 text-[#B89A68] flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#171A1D] mb-3">Our Mission</h2>
              <p className="text-sm text-[#73777C] leading-relaxed">
                {cms.aboutPage.mission}
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm border border-[#E8E7E2]">
              <div className="w-12 h-12 rounded bg-[#B89A68]/15 text-[#B89A68] flex items-center justify-center mb-6">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#171A1D] mb-3">Our Vision</h2>
              <p className="text-sm text-[#73777C] leading-relaxed">
                {cms.aboutPage.vision}
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
              Principles of Construction
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171A1D] mt-2">
              Our Guiding Values
            </h2>
            <p className="text-sm text-[#73777C] mt-2">
              Every foundation we pour and every contract we sign is governed by four unwavering pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cms.aboutPage.coreValues.map((val, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg border border-[#E8E7E2] hover:border-[#B89A68]/50 transition-colors shadow-sm">
                <div className="mb-4">
                  {iconMap[val.icon] || <ShieldCheck className="w-8 h-8 text-[#B89A68]" />}
                </div>
                <h3 className="font-serif text-lg font-bold text-[#171A1D] mb-2">{val.title}</h3>
                <p className="text-xs text-[#73777C] leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones Timeline */}
        <section className="py-20 bg-white border-y border-[#E8E7E2]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
                Proven Track Record
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171A1D] mt-2">
                Milestones of Distinction
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {cms.aboutPage.milestones.map((m, idx) => (
                <div key={idx} className="relative border-l-2 border-[#B89A68] pl-6 py-2">
                  <div className="font-serif text-3xl font-bold text-[#B89A68] mb-1">{m.year}</div>
                  <h4 className="text-base font-bold text-[#171A1D] mb-1">{m.title}</h4>
                  <p className="text-xs text-[#73777C] leading-relaxed">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Executive Leadership Team */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
              Governance & Vision
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#171A1D] mt-2">
              Executive Leadership
            </h2>
            <p className="text-sm text-[#73777C] mt-2">
              Decades of structural engineering mastery, urban planning, and client trust.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cms.aboutPage.leadership.map((leader, idx) => (
              <div key={idx} className="bg-white rounded-lg overflow-hidden border border-[#E8E7E2] shadow-sm">
                <div className="relative aspect-[4/4] bg-zinc-100">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-[#171A1D]">{leader.name}</h3>
                  <div className="text-xs font-semibold text-[#B89A68] uppercase tracking-wider mt-0.5 mb-3">
                    {leader.designation}
                  </div>
                  <p className="text-xs text-[#73777C] leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <WhatsAppButton phone={settings.whatsappNumber} />
      <Footer settings={settings} projects={projects} />
    </div>
  );
}
