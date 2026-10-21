'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Mail, Clock, MessageSquare, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { Project, SiteSettings } from '@/lib/types';
import { getWhatsAppUrl } from '@/lib/utils';

interface HeaderProps {
  settings: SiteSettings;
  projects: Project[];
}

export default function Header({ settings, projects }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [projectsDropdownOpen, setProjectsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const publishedProjects = projects.filter(p => p.publicationStatus === 'published');
  const whatsappUrl = getWhatsAppUrl(
    settings.whatsappNumber,
    "Hello Tauheed Builders & Developers, I would like to inquire about your ongoing projects."
  );

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Services', href: '/services' },
    { name: 'Projects', href: '/projects', hasDropdown: true },
    { name: 'Contact', href: '/contact-us' },
  ];

  return (
    <header className="w-full sticky top-0 z-50 transition-all duration-300">
      {/* Top Bar for High-End Contact Context */}
      <div className="bg-[#171A1D] text-[#E8E7E2] text-xs border-b border-[#2A2E33] py-2 px-4 sm:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href={`tel:${settings.phonePrimary}`} className="flex items-center gap-1.5 hover:text-[#B89A68] transition-colors">
              <Phone className="w-3.5 h-3.5 text-[#B89A68]" />
              <span>{settings.phonePrimary}</span>
            </a>
            <a href={`mailto:${settings.emailPrimary}`} className="flex items-center gap-1.5 hover:text-[#B89A68] transition-colors">
              <Mail className="w-3.5 h-3.5 text-[#B89A68]" />
              <span>{settings.emailPrimary}</span>
            </a>
            <div className="flex items-center gap-1.5 text-[#8E9296]">
              <Clock className="w-3.5 h-3.5 text-[#B89A68]" />
              <span>{settings.officeHours}</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href={whatsappUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-[#B89A68] hover:text-[#D4BD8F] font-medium transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </a>
            <span className="text-[#3A3F45]">|</span>
            <Link href="/admin/login" className="text-[#8E9296] hover:text-white transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className={`w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#171A1D]/95 backdrop-blur-md shadow-lg py-3' 
          : 'bg-[#171A1D] py-4'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group relative z-10">
            <div className="relative bg-white/95 rounded-md px-3 py-1.5 shadow-sm transition-transform duration-300 group-hover:scale-[1.02]">
              <Image
                src="/logo.png"
                alt="Tauheed Builders & Developers"
                width={190}
                height={55}
                className="h-10 sm:h-12 w-auto object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative group py-2"
                    onMouseEnter={() => setProjectsDropdownOpen(true)}
                    onMouseLeave={() => setProjectsDropdownOpen(false)}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-1 text-sm tracking-wide font-medium transition-colors duration-200 ${
                        pathname.startsWith('/projects')
                          ? 'text-[#B89A68]'
                          : 'text-white hover:text-[#B89A68]'
                      }`}
                    >
                      <span>{item.name}</span>
                      <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180 text-[#B89A68]" />
                    </Link>

                    {/* Dropdown Menu */}
                    {projectsDropdownOpen && (
                      <div className="absolute top-full left-0 w-72 bg-[#1C2024] border border-[#2A2E33] rounded-lg shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                        <div className="px-4 py-1.5 text-[11px] font-semibold text-[#8E9296] uppercase tracking-wider">
                          Featured Developments
                        </div>
                        {publishedProjects.slice(0, 4).map((proj) => (
                          <Link
                            key={proj.id}
                            href={`/projects/${proj.slug}`}
                            className="block px-4 py-2.5 hover:bg-[#252A2F] transition-colors"
                          >
                            <div className="text-sm font-medium text-white">{proj.name}</div>
                            <div className="text-xs text-[#B89A68] capitalize">
                              {proj.category} • {proj.status.replace('-', ' ')}
                            </div>
                          </Link>
                        ))}
                        <div className="border-t border-[#2A2E33] mt-2 pt-2 px-4">
                          <Link
                            href="/projects"
                            className="text-xs text-[#B89A68] hover:text-[#D4BD8F] font-medium flex items-center gap-1 py-1"
                          >
                            <span>View All Projects</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm tracking-wide font-medium transition-colors duration-200 relative py-2 ${
                    isActive ? 'text-[#B89A68]' : 'text-white hover:text-[#B89A68]'
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#B89A68]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Action Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#171A1D] bg-[#B89A68] hover:bg-[#D4BD8F] transition-all duration-200 rounded shadow-sm hover:shadow-md"
            >
              Schedule Consultation
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#B89A68] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#171A1D] border-t border-[#2A2E33] px-6 py-6 space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block text-base font-medium py-1.5 ${
                  pathname === item.href ? 'text-[#B89A68]' : 'text-white hover:text-[#B89A68]'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#2A2E33] space-y-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold rounded bg-[#252A2F] text-[#B89A68]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full block text-center py-2.5 text-sm font-semibold uppercase tracking-wider text-[#171A1D] bg-[#B89A68] rounded"
              >
                Inquire Now
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
