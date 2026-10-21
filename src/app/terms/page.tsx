import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import { store } from '@/lib/data-store';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | Tauheed Builders & Developers',
  description: 'Terms and conditions governing the use of Tauheed Builders & Developers website and property reservations.',
};

export default async function TermsPage() {
  const settings = await store.getSiteSettings();
  const projects = await store.getProjects({ publicationStatus: 'published' });

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      <Header settings={settings} projects={projects} />

      <main className="flex-1 py-16 max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-lg border border-[#E8E7E2] shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
            Legal Agreement
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171A1D] mt-1 mb-8">
            Terms of Service
          </h1>

          <div className="prose prose-sm max-w-none text-[#73777C] space-y-6 leading-relaxed">
            <p>
              Welcome to the digital portal of <strong>Tauheed Builders & Developers</strong>. By accessing or using this website, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h2 className="font-serif text-xl font-bold text-[#171A1D] pt-4">
              1. Project Information & Disclaimers
            </h2>
            <p>
              All project specifications, architectural renderings, floor layouts, dimensions, and estimated completion dates presented on this website are indicative and subject to final regulatory approvals, site variations, and standard engineering modifications. Official binding agreements are governed solely by the stamped and executed Allotment Contract signed at our corporate offices.
            </p>

            <h2 className="font-serif text-xl font-bold text-[#171A1D] pt-4">
              2. Prices and Payment Schedules
            </h2>
            <p>
              Prices shown in Pakistani Rupees (PKR) reflect standard schedule prices at the time of publication and may be revised without prior notice prior to formal reservation and issuance of an official receipt.
            </p>

            <h2 className="font-serif text-xl font-bold text-[#171A1D] pt-4">
              3. Intellectual Property
            </h2>
            <p>
              All trademarks, architectural drawings, 3D renderings, floor plans, and website branding elements are the exclusive intellectual property of Tauheed Builders & Developers. Unauthorized duplication or commercial redistribution without written consent is strictly prohibited.
            </p>
          </div>
        </div>
      </main>

      <Footer settings={settings} projects={projects} />
    </div>
  );
}
