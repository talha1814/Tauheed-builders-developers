import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import ProjectsClientView from './ProjectsClientView';
import { store } from '@/lib/data-store';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects Directory | Landmark Developments by Tauheed Builders',
  description: 'Browse luxury residential apartments, corporate office complexes, and executive villas developed by Tauheed Builders & Developers in Karachi.',
};

export default async function ProjectsPage() {
  const settings = await store.getSiteSettings();
  const allProjects = await store.getProjects({ publicationStatus: 'published' });

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      <Header settings={settings} projects={allProjects} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-[#171A1D] text-white py-16 lg:py-20 border-b border-[#2A2E33]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68] mb-2 block">
              Architectural Portfolio
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">
              Flagship Developments
            </h1>
            <p className="text-sm sm:text-base text-[#9CA1A6] mt-3 max-w-2xl">
              Discover approved residential high-rises, commercial business hubs, and signature luxury villas across prime corridors in Karachi.
            </p>
          </div>
        </section>

        {/* Filterable Dynamic Project Grid */}
        <section className="py-12 max-w-7xl mx-auto px-4 sm:px-8">
          <ProjectsClientView initialProjects={allProjects} />
        </section>
      </main>

      <WhatsAppButton phone={settings.whatsappNumber} />
      <Footer settings={settings} projects={allProjects} />
    </div>
  );
}
