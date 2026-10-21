'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Project } from '@/lib/types';
import { slugify } from '@/lib/utils';
import { Save, ArrowLeft, Loader2, AlertCircle, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface ProjectEditorFormProps {
  initialProject?: Project | null;
}

export default function ProjectEditorForm({ initialProject }: ProjectEditorFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialProject);

  const [name, setName] = useState(initialProject?.name || '');
  const [slug, setSlug] = useState(initialProject?.slug || '');
  const [category, setCategory] = useState<Project['category']>(initialProject?.category || 'residential');
  const [status, setStatus] = useState<Project['status']>(initialProject?.status || 'under-construction');
  const [publicationStatus, setPublicationStatus] = useState<Project['publicationStatus']>(initialProject?.publicationStatus || 'draft');
  const [shortDescription, setShortDescription] = useState(initialProject?.shortDescription || '');
  const [fullDescription, setFullDescription] = useState(initialProject?.fullDescription || '');
  const [address, setAddress] = useState(initialProject?.address || '');
  const [city, setCity] = useState(initialProject?.city || 'Karachi');
  const [heroImage, setHeroImage] = useState(initialProject?.heroImage || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=80');
  const [priceStartingFrom, setPriceStartingFrom] = useState(initialProject?.priceStartingFrom || 15000000);
  const [expectedCompletion, setExpectedCompletion] = useState(initialProject?.expectedCompletion || 'December 2026');
  const [totalFloors, setTotalFloors] = useState(initialProject?.totalFloors || 14);
  const [totalUnits, setTotalUnits] = useState(initialProject?.totalUnits || 80);
  const [featured, setFeatured] = useState(initialProject?.featured || false);
  const [amenitiesText, setAmenitiesText] = useState((initialProject?.amenities || []).join('\n'));
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleNameChange = (val: string) => {
    setName(val);
    if (!isEditing || !slug) {
      setSlug(slugify(val));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const amenities = amenitiesText.split('\n').map(a => a.trim()).filter(Boolean);

      const payload = {
        id: initialProject?.id,
        name,
        slug: slug || slugify(name),
        category,
        status,
        publicationStatus,
        shortDescription,
        fullDescription,
        address,
        city,
        heroImage,
        priceStartingFrom: Number(priceStartingFrom),
        expectedCompletion,
        totalFloors: Number(totalFloors),
        totalUnits: Number(totalUnits),
        featured,
        amenities,
      };

      const res = await fetch('/api/admin/projects', {
        method: isEditing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save project');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error occurred while saving project.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-xs text-[#8E9296] hover:text-white"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Projects List</span>
        </Link>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase tracking-wider rounded transition-colors disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>{isEditing ? 'Update Project' : 'Publish Project'}</span>
        </button>
      </div>

      {error && (
        <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 8 Cols: Core Info */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 bg-[#16191D] rounded-lg border border-[#252A30] space-y-4">
            <h3 className="font-serif text-lg font-bold text-white mb-2">Primary Details</h3>

            <div>
              <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Project Name *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g. Tauheed Heights"
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Unique URL Slug *</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="tauheed-heights"
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-[#D4BD8F] font-mono rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                >
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="mixed-use">Mixed-Use</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Development Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as any)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="under-construction">Under Construction</option>
                  <option value="ready-to-move">Ready to Move</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Short Description (Summary) *</label>
              <textarea
                rows={2}
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief summary shown on project cards..."
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Comprehensive Description *</label>
              <textarea
                rows={5}
                required
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                placeholder="Detailed architectural description, structural specifications, and developer assurances..."
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>
          </div>

          {/* Location & Media */}
          <div className="p-6 bg-[#16191D] rounded-lg border border-[#252A30] space-y-4">
            <h3 className="font-serif text-lg font-bold text-white mb-2">Location & Photography</h3>

            <div>
              <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Project Address *</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g. Plot 42, Sector 17-A, Scheme 33"
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C8C7C2] mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Hero Image URL *</label>
                <input
                  type="url"
                  required
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C8C7C2] mb-1">
                Amenities (One per line)
              </label>
              <textarea
                rows={4}
                value={amenitiesText}
                onChange={(e) => setAmenitiesText(e.target.value)}
                placeholder="Rooftop Infinity Pool&#10;Executive Fitness Gym&#10;Smart RFID Entry&#10;Standby Generator"
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Publishing Settings & Stats */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-[#16191D] rounded-lg border border-[#252A30] space-y-4">
            <h3 className="font-serif text-lg font-bold text-white mb-2">Publishing Status</h3>

            <div>
              <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Publication State</label>
              <select
                value={publicationStatus}
                onChange={(e) => setPublicationStatus(e.target.value as any)}
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              >
                <option value="draft">Draft (Hidden from Public)</option>
                <option value="published">Published (Visible to Visitors)</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="rounded border-[#2E343D] text-[#B89A68] focus:ring-[#B89A68]"
                />
                <span className="text-xs text-[#C8C7C2]">Feature on Homepage Showcase</span>
              </label>
            </div>
          </div>

          <div className="p-6 bg-[#16191D] rounded-lg border border-[#252A30] space-y-4">
            <h3 className="font-serif text-lg font-bold text-white mb-2">Specifications</h3>

            <div>
              <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Starting Price (PKR)</label>
              <input
                type="number"
                value={priceStartingFrom}
                onChange={(e) => setPriceStartingFrom(Number(e.target.value))}
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-[#D4BD8F] font-mono rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Expected Completion</label>
              <input
                type="text"
                value={expectedCompletion}
                onChange={(e) => setExpectedCompletion(e.target.value)}
                placeholder="e.g. December 2026"
                className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Total Floors</label>
                <input
                  type="number"
                  value={totalFloors}
                  onChange={(e) => setTotalFloors(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#C8C7C2] mb-1">Total Units</label>
                <input
                  type="number"
                  value={totalUnits}
                  onChange={(e) => setTotalUnits(Number(e.target.value))}
                  className="w-full px-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

      </div>
    </form>
  );
}
