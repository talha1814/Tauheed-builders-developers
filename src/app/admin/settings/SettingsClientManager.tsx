'use client';

import React, { useState } from 'react';
import { SiteSettings } from '@/lib/types';
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface SettingsClientManagerProps {
  initialSettings: SiteSettings;
}

export default function SettingsClientManager({ initialSettings }: SettingsClientManagerProps) {
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);
  const [companyName, setCompanyName] = useState(settings.companyName);
  const [tagline, setTagline] = useState(settings.tagline);
  const [phonePrimary, setPhonePrimary] = useState(settings.phonePrimary);
  const [phoneSecondary, setPhoneSecondary] = useState(settings.phoneSecondary || '');
  const [whatsappNumber, setWhatsappNumber] = useState(settings.whatsappNumber);
  const [emailPrimary, setEmailPrimary] = useState(settings.emailPrimary);
  const [emailSales, setEmailSales] = useState(settings.emailSales || '');
  const [headOfficeAddress, setHeadOfficeAddress] = useState(settings.headOfficeAddress);
  const [city, setCity] = useState(settings.city);
  const [country, setCountry] = useState(settings.country);
  const [officeHours, setOfficeHours] = useState(settings.officeHours);
  const [seoDefaultTitle, setSeoDefaultTitle] = useState(settings.seoDefaultTitle);
  const [seoDefaultDescription, setSeoDefaultDescription] = useState(settings.seoDefaultDescription);

  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    const payload: Partial<SiteSettings> = {
      companyName,
      tagline,
      phonePrimary,
      phoneSecondary,
      whatsappNumber,
      emailPrimary,
      emailSales,
      headOfficeAddress,
      city,
      country,
      officeHours,
      seoDefaultTitle,
      seoDefaultDescription,
    };

    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to update settings');

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving site settings');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl">
      {success && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Settings saved. Changes are reflected across header, footer, and inquiry links.</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Corporate Identity */}
      <div className="bg-[#16191D] p-6 rounded-lg border border-[#252A30] space-y-4">
        <h3 className="font-serif text-base font-bold text-white">Corporate Identity</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#C8C7C2] mb-1">Company Trade Name *</label>
            <input
              type="text"
              required
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#C8C7C2] mb-1">Brand Tagline</label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Direct Contact & WhatsApp */}
      <div className="bg-[#16191D] p-6 rounded-lg border border-[#252A30] space-y-4">
        <h3 className="font-serif text-base font-bold text-white">Direct Contacts & Channels</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-[#C8C7C2] mb-1">Primary Telephone *</label>
            <input
              type="text"
              required
              value={phonePrimary}
              onChange={(e) => setPhonePrimary(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[#C8C7C2] mb-1">Secondary Mobile</label>
            <input
              type="text"
              value={phoneSecondary}
              onChange={(e) => setPhoneSecondary(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[#C8C7C2] mb-1">WhatsApp Concierge Number *</label>
            <input
              type="text"
              required
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-[#25D366] rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none font-mono font-semibold"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[#C8C7C2] mb-1">Official Inquiry Email *</label>
            <input
              type="email"
              required
              value={emailPrimary}
              onChange={(e) => setEmailPrimary(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#C8C7C2] mb-1">Office Operating Hours</label>
            <input
              type="text"
              value={officeHours}
              onChange={(e) => setOfficeHours(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Head Office Address */}
      <div className="bg-[#16191D] p-6 rounded-lg border border-[#252A30] space-y-4">
        <h3 className="font-serif text-base font-bold text-white">Physical Address</h3>

        <div className="text-xs space-y-4">
          <div>
            <label className="block text-[#C8C7C2] mb-1">Street / Building Address *</label>
            <input
              type="text"
              required
              value={headOfficeAddress}
              onChange={(e) => setHeadOfficeAddress(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[#C8C7C2] mb-1">City</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[#C8C7C2] mb-1">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SEO Defaults */}
      <div className="bg-[#16191D] p-6 rounded-lg border border-[#252A30] space-y-4">
        <h3 className="font-serif text-base font-bold text-white">Default Search Engine Metadata</h3>

        <div className="text-xs space-y-4">
          <div>
            <label className="block text-[#C8C7C2] mb-1">Default Meta Title</label>
            <input
              type="text"
              value={seoDefaultTitle}
              onChange={(e) => setSeoDefaultTitle(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[#C8C7C2] mb-1">Default Meta Description</label>
            <textarea
              rows={2}
              value={seoDefaultDescription}
              onChange={(e) => setSeoDefaultDescription(e.target.value)}
              className="w-full px-3.5 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Site Settings</span>
        </button>
      </div>
    </form>
  );
}
