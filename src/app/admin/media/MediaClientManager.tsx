'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Upload, Copy, Check, Trash2, FileText, Image as ImageIcon, Filter } from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  url: string;
  category: 'project-photo' | 'floor-plan' | 'brochure' | 'general';
  size: string;
}

const INITIAL_MEDIA: MediaItem[] = [
  {
    id: 'm-1',
    name: 'tauheed-logo-primary.png',
    url: '/logo.png',
    category: 'general',
    size: '211 KB',
  },
  {
    id: 'm-2',
    name: 'tauheed-heights-facade.jpg',
    url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    category: 'project-photo',
    size: '1.4 MB',
  },
  {
    id: 'm-3',
    name: 'executive-tower-elevation.jpg',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    category: 'project-photo',
    size: '1.8 MB',
  },
  {
    id: 'm-4',
    name: 'signature-villas-pool.jpg',
    url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
    category: 'project-photo',
    size: '2.1 MB',
  },
  {
    id: 'm-5',
    name: 'tauheed-heights-type-a-plan.jpg',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1000&q=80',
    category: 'floor-plan',
    size: '940 KB',
  },
];

export default function MediaClientManager() {
  const [media, setMedia] = useState<MediaItem[]>(INITIAL_MEDIA);
  const [filter, setFilter] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filtered = media.filter(m => filter === 'all' || m.category === filter);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this asset from media library?')) {
      setMedia(media.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#16191D] p-4 rounded-lg border border-[#252A30]">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-[#8E9296]" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
          >
            <option value="all">All Media Categories</option>
            <option value="project-photo">Project Photography</option>
            <option value="floor-plan">Architectural Floor Plans</option>
            <option value="brochure">Brochures & Documents</option>
            <option value="general">Brand & General</option>
          </select>
        </div>

        <label className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase tracking-wider rounded cursor-pointer transition-colors">
          <Upload className="w-4 h-4" />
          <span>Upload Asset</span>
          <input
            type="file"
            className="hidden"
            accept="image/*,application/pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                const file = e.target.files[0];
                const fakeUrl = URL.createObjectURL(file);
                const newItem: MediaItem = {
                  id: `m-${Date.now()}`,
                  name: file.name,
                  url: fakeUrl,
                  category: file.type.includes('pdf') ? 'brochure' : 'project-photo',
                  size: `${(file.size / 1024).toFixed(0)} KB`,
                };
                setMedia([newItem, ...media]);
              }
            }}
          />
        </label>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group bg-[#16191D] rounded-lg border border-[#252A30] overflow-hidden flex flex-col justify-between"
          >
            <div className="relative aspect-square bg-[#0E1012] flex items-center justify-center p-2">
              {item.category === 'brochure' ? (
                <FileText className="w-12 h-12 text-[#B89A68]" />
              ) : (
                <Image
                  src={item.url}
                  alt={item.name}
                  fill
                  className="object-contain p-1"
                />
              )}
            </div>

            <div className="p-3 bg-[#1B1F24] border-t border-[#252A30] space-y-1">
              <div className="text-[11px] font-semibold text-white truncate" title={item.name}>
                {item.name}
              </div>
              <div className="text-[10px] text-[#8E9296] flex items-center justify-between">
                <span className="capitalize">{item.category}</span>
                <span>{item.size}</span>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-[#2E343D]">
                <button
                  onClick={() => handleCopy(item.id, item.url)}
                  className="inline-flex items-center gap-1 text-[10px] text-[#B89A68] hover:text-[#D4BD8F]"
                >
                  {copiedId === item.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy URL</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-red-400 hover:text-red-300 p-1"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
