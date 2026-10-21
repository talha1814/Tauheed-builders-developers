import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, MessageSquare, ArrowRight, ShieldCheck } from 'lucide-react';
import { SiteSettings, Project } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/utils';

interface FooterProps {
  settings: SiteSettings;
  projects: Project[];
}

export default function Footer({ settings, projects }: FooterProps) {
  const publishedProjects = projects.filter(p => p.publicationStatus === 'published');
  const whatsappUrl = getWhatsAppUrl(
    settings.whatsappNumber,
    "Hello Tauheed Builders & Developers, I would like to inquire about your projects."
  );

  return (
    <footer className="bg-[#171A1D] text-[#E8E7E2] border-t border-[#2A2E33] pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2A2E33]">
          
          {/* Col 1: Brand & Identity (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-block">
              <div className="bg-white/95 rounded-md px-3.5 py-2 inline-block">
                <Image
                  src="/logo.png"
                  alt="Tauheed Builders & Developers"
                  width={210}
                  height={60}
                  className="h-12 w-auto object-contain"
                />
              </div>
            </Link>
            <p className="text-sm text-[#9CA1A6] leading-relaxed max-w-sm">
              {settings.tagline}. Conceiving and constructing iconic residential towers, high-grade corporate suites, and bespoke luxury residences with verified legal approvals and enduring structural engineering.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#B89A68] bg-[#22272D] px-3 py-2 rounded max-w-sm border border-[#2F353D]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% SBCA & Municipal Authority Approved Developments</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9CA1A6]">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">Our Services</Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">All Projects</Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-white transition-colors">Contact & Site Visits</Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-white transition-colors text-xs text-[#73777C]">
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Signature Projects */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
              Signature Projects
            </h4>
            <ul className="space-y-2.5 text-sm text-[#9CA1A6]">
              {publishedProjects.slice(0, 5).map(proj => (
                <li key={proj.id}>
                  <Link href={`/projects/${proj.slug}`} className="hover:text-white transition-colors flex items-center justify-between">
                    <span className="truncate pr-2">{proj.name}</span>
                    <span className="text-[10px] text-[#B89A68] uppercase font-mono">{proj.category}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Corporate Contact Info */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-[#B89A68]">
              Head Office
            </h4>
            <div className="space-y-3 text-sm text-[#9CA1A6]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B89A68] shrink-0 mt-0.5" />
                <span className="leading-snug">{settings.headOfficeAddress}, {settings.city}, {settings.country}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B89A68] shrink-0" />
                <a href={`tel:${settings.phonePrimary}`} className="hover:text-white transition-colors">
                  {settings.phonePrimary}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B89A68] shrink-0" />
                <a href={`mailto:${settings.emailPrimary}`} className="hover:text-white transition-colors">
                  {settings.emailPrimary}
                </a>
              </div>
              <div className="pt-1">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#B89A68] hover:text-[#D4BD8F] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp: {settings.whatsappNumber}</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#73777C] gap-4">
          <div>
            &copy; 2026 {settings.companyName}. All Rights Reserved.
          </div>
          <div className="flex items-center space-x-6">
            <Link href="/privacy-policy" className="hover:text-[#9CA1A6] transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-[#9CA1A6] transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/projects" className="hover:text-[#9CA1A6] transition-colors">
              Project Portfolio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
