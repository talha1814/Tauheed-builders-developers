'use client';

import React, { useState, useMemo } from 'react';
import ProjectCard from '@/components/public/ProjectCard';
import { Project } from '@/lib/types';
import { Search, SlidersHorizontal, Building2, RefreshCw } from 'lucide-react';

interface ProjectsClientViewProps {
  initialProjects: Project[];
}

export default function ProjectsClientView({ initialProjects }: ProjectsClientViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProjects = useMemo(() => {
    return initialProjects.filter((project) => {
      const matchesSearch =
        searchTerm === '' ||
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || project.category === categoryFilter;

      const matchesStatus =
        statusFilter === 'all' || project.status === statusFilter;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [initialProjects, searchTerm, categoryFilter, statusFilter]);

  const resetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('all');
    setStatusFilter('all');
  };

  return (
    <div>
      {/* Controls Bar */}
      <div className="bg-white p-5 rounded-lg border border-[#E8E7E2] shadow-sm mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Box */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-[#73777C] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by project name, location..."
              className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#F7F6F2] border border-[#E8E7E2] rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68]"
            />
          </div>

          {/* Category Filter */}
          <div className="md:col-span-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#F7F6F2] border border-[#E8E7E2] rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68]"
            >
              <option value="all">All Categories</option>
              <option value="residential">Residential</option>
              <option value="commercial">Commercial</option>
              <option value="mixed-use">Mixed-Use</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-[#F7F6F2] border border-[#E8E7E2] rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68]"
            >
              <option value="all">All Construction Statuses</option>
              <option value="under-construction">Under Construction</option>
              <option value="ready-to-move">Ready to Move</option>
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* Reset Action */}
          <div className="md:col-span-1 flex justify-end">
            <button
              onClick={resetFilters}
              title="Reset Filters"
              className="p-2.5 text-[#73777C] hover:text-[#B89A68] bg-[#F7F6F2] hover:bg-[#E8E7E2] rounded border border-[#E8E7E2] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Active Results Summary */}
        <div className="flex items-center justify-between text-xs text-[#73777C] pt-2 border-t border-[#E8E7E2]">
          <span>
            Showing <strong className="text-[#171A1D]">{filteredProjects.length}</strong> of {initialProjects.length} Developments
          </span>
          {(searchTerm || categoryFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-[#B89A68] hover:underline font-medium"
            >
              Clear all active filters
            </button>
          )}
        </div>
      </div>

      {/* Projects Grid or Empty State */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-12 text-center border border-[#E8E7E2] shadow-sm max-w-lg mx-auto">
          <Building2 className="w-12 h-12 text-[#B89A68] mx-auto mb-4 opacity-50" />
          <h3 className="font-serif text-xl font-bold text-[#171A1D]">
            No Matching Developments Found
          </h3>
          <p className="text-xs text-[#73777C] mt-2 mb-6 leading-relaxed">
            We could not find any projects matching your current search criteria. Try modifying your filter or clear filters to view all developments.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] rounded transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
