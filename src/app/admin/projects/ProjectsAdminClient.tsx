'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/lib/types';
import { formatPKRShort } from '@/lib/utils';
import { Search, Edit3, Trash2, ExternalLink, Check, Archive, Eye } from 'lucide-react';

interface ProjectsAdminClientProps {
  initialProjects: Project[];
}

export default function ProjectsAdminClient({ initialProjects }: ProjectsAdminClientProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filtered = projects.filter((p) => {
    const matchSearch =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'all' || p.category === categoryFilter;
    return matchSearch && matchCat;
  });

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch {
      alert('Failed to delete project.');
    }
  };

  const handleToggleStatus = async (id: string, current: string) => {
    const newStatus = current === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/admin/projects`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, publicationStatus: newStatus }),
      });
      if (res.ok) {
        setProjects(projects.map(p => p.id === id ? { ...p, publicationStatus: newStatus as any } : p));
      }
    } catch {
      alert('Failed to update status.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-[#16191D] p-4 rounded-lg border border-[#252A30]">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-[#8E9296] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68]"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-3 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68] w-full sm:w-auto"
        >
          <option value="all">All Categories</option>
          <option value="residential">Residential</option>
          <option value="commercial">Commercial</option>
          <option value="mixed-use">Mixed-Use</option>
        </select>
      </div>

      {/* Projects Table */}
      <div className="bg-[#16191D] rounded-lg border border-[#252A30] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#E8E7E2]">
            <thead>
              <tr className="border-b border-[#252A30] bg-[#14171A] text-[#8E9296] uppercase font-semibold">
                <th className="py-3 px-4">Project</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Starting Price</th>
                <th className="py-3 px-4">Visibility</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252A30]">
              {filtered.map((proj) => (
                <tr key={proj.id} className="hover:bg-[#1A1E24] transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-9 rounded overflow-hidden bg-zinc-800 shrink-0">
                        <Image
                          src={proj.heroImage}
                          alt={proj.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{proj.name}</div>
                        <div className="text-[11px] text-[#8E9296] truncate max-w-xs">{proj.address}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 capitalize text-[#C8C7C2]">
                    {proj.category}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="text-[10px] uppercase font-semibold text-[#D4BD8F] bg-[#B89A68]/15 px-2 py-0.5 rounded border border-[#B89A68]/20">
                      {proj.status.replace('-', ' ')}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono font-medium text-[#B89A68]">
                    {proj.priceStartingFrom ? formatPKRShort(proj.priceStartingFrom) : 'N/A'}
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleStatus(proj.id, proj.publicationStatus)}
                      title="Click to toggle publish status"
                      className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded transition-colors ${
                        proj.publicationStatus === 'published'
                          ? 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900'
                          : 'bg-amber-950 text-amber-400 hover:bg-amber-900'
                      }`}
                    >
                      {proj.publicationStatus}
                    </button>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/projects/${proj.slug}`}
                        target="_blank"
                        className="p-1.5 text-[#8E9296] hover:text-white rounded hover:bg-[#252A30]"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/admin/projects/${proj.id}`}
                        className="p-1.5 text-[#B89A68] hover:text-[#D4BD8F] rounded hover:bg-[#252A30]"
                        title="Edit Project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </Link>

                      <button
                        onClick={() => handleDelete(proj.id, proj.name)}
                        className="p-1.5 text-red-400 hover:text-red-300 rounded hover:bg-red-950/40"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
