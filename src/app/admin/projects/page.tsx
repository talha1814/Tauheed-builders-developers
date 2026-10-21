import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { store } from '@/lib/data-store';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Building2, Search, Edit3, Trash2, Eye, ExternalLink } from 'lucide-react';
import { formatPKRShort } from '@/lib/utils';
import ProjectsAdminClient from './ProjectsAdminClient';

export default async function AdminProjectsListPage() {
  const projects = await store.getProjects();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">Project Manager</h1>
            <p className="text-xs text-[#8E9296] mt-0.5">
              Create, edit, archive, and publish real estate developments.
            </p>
          </div>

          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase tracking-wider rounded transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </Link>
        </div>

        {/* Client-Interactive Table with Search & Status Actions */}
        <ProjectsAdminClient initialProjects={projects} />
      </div>
    </AdminLayout>
  );
}
