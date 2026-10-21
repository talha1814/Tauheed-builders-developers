'use client';

import React, { useState } from 'react';
import { CMSPageContent } from '@/lib/types';
import { Save, CheckCircle2, AlertCircle, FileText, Home, Info, Briefcase, Loader2 } from 'lucide-react';

interface CMSPagesClientManagerProps {
  initialCMS: CMSPageContent;
}

export default function CMSPagesClientManager({ initialCMS }: CMSPagesClientManagerProps) {
  const [cms, setCms] = useState<CMSPageContent>(initialCMS);
  const [activeTab, setActiveTab] = useState<'homepage' | 'about' | 'services'>('homepage');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Homepage Form States
  const [heroBadge, setHeroBadge] = useState(cms.homepage.heroBadge);
  const [heroHeadline, setHeroHeadline] = useState(cms.homepage.heroHeadline);
  const [heroSubheadline, setHeroSubheadline] = useState(cms.homepage.heroSubheadline);
  const [heroCtaText, setHeroCtaText] = useState(cms.homepage.heroCtaText);
  const [heroSecondaryCta, setHeroSecondaryCta] = useState(cms.homepage.heroSecondaryCta);
  const [aboutHeading, setAboutHeading] = useState(cms.homepage.aboutHeading);
  const [aboutParagraph1, setAboutParagraph1] = useState(cms.homepage.aboutParagraph1);
  const [aboutParagraph2, setAboutParagraph2] = useState(cms.homepage.aboutParagraph2);
  const [investmentCtaTitle, setInvestmentCtaTitle] = useState(cms.homepage.investmentCtaTitle);
  const [investmentCtaSubtitle, setInvestmentCtaSubtitle] = useState(cms.homepage.investmentCtaSubtitle);

  // About Form States
  const [aboutHeroTitle, setAboutHeroTitle] = useState(cms.aboutPage.heroTitle);
  const [aboutHeroSubtitle, setAboutHeroSubtitle] = useState(cms.aboutPage.heroSubtitle);
  const [mission, setMission] = useState(cms.aboutPage.mission);
  const [vision, setVision] = useState(cms.aboutPage.vision);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccess(false);
    setError('');

    const updatedCMS: CMSPageContent = {
      ...cms,
      homepage: {
        ...cms.homepage,
        heroBadge,
        heroHeadline,
        heroSubheadline,
        heroCtaText,
        heroSecondaryCta,
        aboutHeading,
        aboutParagraph1,
        aboutParagraph2,
        investmentCtaTitle,
        investmentCtaSubtitle,
      },
      aboutPage: {
        ...cms.aboutPage,
        heroTitle: aboutHeroTitle,
        heroSubtitle: aboutHeroSubtitle,
        mission,
        vision,
      },
    };

    try {
      const res = await fetch('/api/admin/cms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCMS),
      });

      if (!res.ok) throw new Error('Failed to save CMS changes');

      setCms(updatedCMS);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      setError(err.message || 'Error occurred while updating CMS content');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-[#252A30] pb-2">
        <button
          onClick={() => setActiveTab('homepage')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded transition-colors ${
            activeTab === 'homepage'
              ? 'bg-[#B89A68] text-[#171A1D]'
              : 'text-[#8E9296] hover:text-white hover:bg-[#1A1E24]'
          }`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>Homepage Content</span>
        </button>

        <button
          onClick={() => setActiveTab('about')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded transition-colors ${
            activeTab === 'about'
              ? 'bg-[#B89A68] text-[#171A1D]'
              : 'text-[#8E9296] hover:text-white hover:bg-[#1A1E24]'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>About Us & Mission</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs rounded flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>CMS content successfully saved and revalidated across public pages.</span>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {activeTab === 'homepage' && (
          <div className="space-y-6">
            {/* Hero Section Copy */}
            <div className="bg-[#16191D] p-6 rounded-lg border border-[#252A30] space-y-4">
              <h3 className="font-serif text-base font-bold text-white">Cinematic Hero Configuration</h3>

              <div>
                <label className="block text-xs text-[#C8C7C2] mb-1">Badge Tagline</label>
                <input
                  type="text"
                  value={heroBadge}
                  onChange={(e) => setHeroBadge(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#C8C7C2] mb-1">Main Editorial Headline</label>
                <input
                  type="text"
                  value={heroHeadline}
                  onChange={(e) => setHeroHeadline(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#C8C7C2] mb-1">Supporting Subheadline</label>
                <textarea
                  rows={2}
                  value={heroSubheadline}
                  onChange={(e) => setHeroSubheadline(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#C8C7C2] mb-1">Primary CTA Button</label>
                  <input
                    type="text"
                    value={heroCtaText}
                    onChange={(e) => setHeroCtaText(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#C8C7C2] mb-1">Secondary CTA Button</label>
                  <input
                    type="text"
                    value={heroSecondaryCta}
                    onChange={(e) => setHeroSecondaryCta(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* About Narrative */}
            <div className="bg-[#16191D] p-6 rounded-lg border border-[#252A30] space-y-4">
              <h3 className="font-serif text-base font-bold text-white">Company Introduction Section</h3>

              <div>
                <label className="block text-xs text-[#C8C7C2] mb-1">Section Heading</label>
                <input
                  type="text"
                  value={aboutHeading}
                  onChange={(e) => setAboutHeading(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#C8C7C2] mb-1">Narrative Paragraph 1</label>
                <textarea
                  rows={3}
                  value={aboutParagraph1}
                  onChange={(e) => setAboutParagraph1(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#C8C7C2] mb-1">Narrative Paragraph 2</label>
                <textarea
                  rows={3}
                  value={aboutParagraph2}
                  onChange={(e) => setAboutParagraph2(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>
            </div>

            {/* Investment Banner */}
            <div className="bg-[#16191D] p-6 rounded-lg border border-[#252A30] space-y-4">
              <h3 className="font-serif text-base font-bold text-white">Investment Opportunity Banner</h3>

              <div>
                <label className="block text-xs text-[#C8C7C2] mb-1">Banner Title</label>
                <input
                  type="text"
                  value={investmentCtaTitle}
                  onChange={(e) => setInvestmentCtaTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs text-[#C8C7C2] mb-1">Banner Subtitle</label>
                <textarea
                  rows={2}
                  value={investmentCtaSubtitle}
                  onChange={(e) => setInvestmentCtaSubtitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'about' && (
          <div className="bg-[#16191D] p-6 rounded-lg border border-[#252A30] space-y-4">
            <h3 className="font-serif text-base font-bold text-white">About Page Mission & Values</h3>

            <div>
              <label className="block text-xs text-[#C8C7C2] mb-1">Page Hero Title</label>
              <input
                type="text"
                value={aboutHeroTitle}
                onChange={(e) => setAboutHeroTitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#C8C7C2] mb-1">Page Hero Subtitle</label>
              <textarea
                rows={2}
                value={aboutHeroSubtitle}
                onChange={(e) => setAboutHeroSubtitle(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#C8C7C2] mb-1">Company Mission Statement</label>
              <textarea
                rows={3}
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-[#C8C7C2] mb-1">Company Vision Statement</label>
              <textarea
                rows={3}
                value={vision}
                onChange={(e) => setVision(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            <span>Save All CMS Changes</span>
          </button>
        </div>
      </form>
    </div>
  );
}
