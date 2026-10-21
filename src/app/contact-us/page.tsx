import React from 'react';
import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import WhatsAppButton from '@/components/public/WhatsAppButton';
import InquiryForm from '@/components/public/InquiryForm';
import { store } from '@/lib/data-store';
import { MapPin, Phone, Mail, Clock, MessageSquare, ShieldCheck } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Tauheed Builders & Developers Head Office',
  description: 'Visit our head office on Shahrah-e-Faisal or speak directly with our senior development advisors for property bookings and site tours in Karachi.',
};

export default async function ContactPage() {
  const settings = await store.getSiteSettings();
  const allProjects = await store.getProjects({ publicationStatus: 'published' });

  const directWhatsAppUrl = getWhatsAppUrl(
    settings.whatsappNumber,
    "Hello Tauheed Builders, I would like to schedule a private consultation at your corporate head office."
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F6F2]">
      <Header settings={settings} projects={allProjects} />

      <main className="flex-1">
        {/* Page Hero */}
        <section className="bg-[#171A1D] text-white py-16 lg:py-20 border-b border-[#2A2E33]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B89A68] mb-2 block">
              Direct Corporate Liaison
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold">
              Contact & Site Consultations
            </h1>
            <p className="text-sm sm:text-base text-[#9CA1A6] mt-3 max-w-2xl">
              Connect with our dedicated project directors for verified site inspections, NOC documentation, and customized investment payment structures.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left 5 Cols: Corporate Contact Info */}
            <div className="lg:col-span-5 space-y-8">
              <div className="bg-white p-8 rounded-lg border border-[#E8E7E2] shadow-sm space-y-6">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-[#B89A68]">
                    Principal Address
                  </span>
                  <h2 className="font-serif text-xl font-bold text-[#171A1D] mt-1 mb-3">
                    Corporate Head Office
                  </h2>
                  <div className="flex items-start gap-3 text-sm text-[#202124]">
                    <MapPin className="w-5 h-5 text-[#B89A68] shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium">{settings.headOfficeAddress}</div>
                      <div className="text-xs text-[#73777C] mt-0.5">{settings.city}, {settings.country}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E7E2] space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-5 h-5 text-[#B89A68] shrink-0" />
                    <div>
                      <div className="text-xs text-[#73777C]">Direct Phone Lines</div>
                      <a href={`tel:${settings.phonePrimary}`} className="font-semibold text-[#171A1D] hover:text-[#B89A68] transition-colors">
                        {settings.phonePrimary}
                      </a>
                      {settings.phoneSecondary && (
                        <span className="text-xs text-[#73777C]"> / {settings.phoneSecondary}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-5 h-5 text-[#B89A68] shrink-0" />
                    <div>
                      <div className="text-xs text-[#73777C]">Official Email</div>
                      <a href={`mailto:${settings.emailPrimary}`} className="font-semibold text-[#171A1D] hover:text-[#B89A68] transition-colors">
                        {settings.emailPrimary}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-5 h-5 text-[#B89A68] shrink-0" />
                    <div>
                      <div className="text-xs text-[#73777C]">Office Hours</div>
                      <div className="font-medium text-[#171A1D]">{settings.officeHours}</div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E8E7E2]">
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold uppercase tracking-wider rounded transition-colors shadow"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Concierge Line</span>
                  </a>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-[#171A1D] text-white p-6 rounded-lg border border-[#2A2E33] shadow-sm">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-8 h-8 text-[#B89A68] shrink-0" />
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-[#D4BD8F]">
                      Official Verification Guarantee
                    </div>
                    <div className="text-xs text-[#8E9296] mt-0.5">
                      All agreements, allotment receipts, and booking files are strictly counter-signed at our registered head office.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 7 Cols: Validated Inquiry Form */}
            <div className="lg:col-span-7">
              <InquiryForm
                projects={allProjects}
                whatsappNumber={settings.whatsappNumber}
                title="Send a Direct Message to Our Project Directors"
                subtitle="Complete this form to receive digital brochures, payment schedules, or book a dedicated site visit."
              />
            </div>

          </div>
        </section>

        {/* Map Embed Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-8 pb-16">
          <div className="bg-white p-4 rounded-lg border border-[#E8E7E2] shadow-sm">
            <h3 className="font-serif text-lg font-bold text-[#171A1D] mb-3 px-2">
              Corporate Office Location
            </h3>
            <div className="w-full h-80 rounded overflow-hidden bg-zinc-100">
              <iframe
                title="Tauheed Builders Head Office Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.9079533355524!2d67.06742567540445!3d24.86701557792375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e9b0105342d%3A0xb30d31ef87565b9!2sShahrah-e-Faisal%20Rd%2C%20Karachi!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </main>

      <WhatsAppButton phone={settings.whatsappNumber} />
      <Footer settings={settings} projects={allProjects} />
    </div>
  );
}
