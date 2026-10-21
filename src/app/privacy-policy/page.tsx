import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import { store } from '@/lib/data-store';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Tauheed Builders & Developers',
  description: 'Our commitment to protecting your personal data, inquiry records, and investment confidentiality.',
};

export default async function PrivacyPolicyPage() {
  const settings = await store.getSiteSettings();
  const projects = await store.getProjects({ publicationStatus: 'published' });

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      <Header settings={settings} projects={projects} />

      <main className="flex-1 py-16 max-w-4xl mx-auto px-4 sm:px-8">
        <div className="bg-white p-8 sm:p-12 rounded-lg border border-[#E8E7E2] shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
            Legal Disclosure
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#171A1D] mt-1 mb-8">
            Privacy Policy
          </h1>

          <div className="prose prose-sm max-w-none text-[#73777C] space-y-6 leading-relaxed">
            <p>
              Tauheed Builders & Developers (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the website <strong>tauheedbuilders.com</strong>. This Privacy Policy details our protocols for the collection, protection, and handling of information gathered when you register interest in our real estate projects.
            </p>

            <h2 className="font-serif text-xl font-bold text-[#171A1D] pt-4">
              1. Information We Collect
            </h2>
            <p>
              When you submit a consultation request, book a unit, or request a payment schedule through our website, we may collect your full name, email address, telephone/WhatsApp contact details, and specific project interests.
            </p>

            <h2 className="font-serif text-xl font-bold text-[#171A1D] pt-4">
              2. Purpose and Utilization
            </h2>
            <p>
              Your contact details are solely utilized to provide project brochures, schedule site visits, verify booking eligibility, and send milestone updates regarding the properties you have inquired about. We will never sell, rent, or lease your private personal information to third-party telemarketers or external broker syndicates.
            </p>

            <h2 className="font-serif text-xl font-bold text-[#171A1D] pt-4">
              3. Data Protection and Retention
            </h2>
            <p>
              All customer inquiries and communication records are securely retained on encrypted databases with strict role-based access restricted solely to authorized project consultants.
            </p>

            <h2 className="font-serif text-xl font-bold text-[#171A1D] pt-4">
              4. Contact for Privacy Inquiries
            </h2>
            <p>
              If you wish to review, update, or remove your contact information from our active communication pipeline, please email us directly at <strong>{settings.emailPrimary}</strong>.
            </p>
          </div>
        </div>
      </main>

      <Footer settings={settings} projects={projects} />
    </div>
  );
}
