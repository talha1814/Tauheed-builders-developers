import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { store } from '@/lib/data-store';
import Link from 'next/link';
import {
  Building2,
  Layers,
  Users2,
  TrendingUp,
  Clock,
  ArrowRight,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function AdminDashboardOverviewPage() {
  const metrics = await store.getDashboardMetrics();
  const inquiries = await store.getInquiries();
  const projects = await store.getProjects();

  const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;
  const siteVisitsCount = inquiries.filter(i => i.status === 'site-visit').length;

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Operations & Performance Overview
            </h1>
            <p className="text-xs text-[#8E9296] mt-1">
              Live database metrics across projects, inventory, leads, and staff assignments.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase tracking-wider rounded transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create New Project</span>
            </Link>
          </div>
        </div>

        {/* Database Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Metric 1 */}
          <div className="p-5 bg-[#16191D] rounded-lg border border-[#252A30]">
            <div className="flex items-center justify-between text-xs text-[#8E9296]">
              <span>Total Developments</span>
              <Building2 className="w-4 h-4 text-[#B89A68]" />
            </div>
            <div className="font-serif text-3xl font-bold text-white mt-2">
              {metrics.totalProjects}
            </div>
            <div className="text-[11px] text-[#8E9296] mt-2 flex items-center gap-2">
              <span className="text-emerald-400 font-semibold">{metrics.publishedProjects} Published</span>
              <span>•</span>
              <span className="text-amber-400 font-semibold">{metrics.draftProjects} Drafts</span>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-5 bg-[#16191D] rounded-lg border border-[#252A30]">
            <div className="flex items-center justify-between text-xs text-[#8E9296]">
              <span>Active Inventory Units</span>
              <Layers className="w-4 h-4 text-[#B89A68]" />
            </div>
            <div className="font-serif text-3xl font-bold text-white mt-2">
              {metrics.totalUnits}
            </div>
            <div className="text-[11px] text-[#8E9296] mt-2 flex items-center gap-2">
              <span className="text-emerald-400 font-semibold">{metrics.availableUnits} Available</span>
              <span>•</span>
              <span>{metrics.totalUnits - metrics.availableUnits} Sold/Reserved</span>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-5 bg-[#16191D] rounded-lg border border-[#252A30]">
            <div className="flex items-center justify-between text-xs text-[#8E9296]">
              <span>Total Inquiries & Leads</span>
              <Users2 className="w-4 h-4 text-[#B89A68]" />
            </div>
            <div className="font-serif text-3xl font-bold text-white mt-2">
              {metrics.totalInquiries}
            </div>
            <div className="text-[11px] text-[#8E9296] mt-2 flex items-center gap-2">
              <span className="text-blue-400 font-semibold">{newInquiriesCount} Awaiting Action</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{metrics.convertedInquiries} Converted</span>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-5 bg-[#16191D] rounded-lg border border-[#252A30]">
            <div className="flex items-center justify-between text-xs text-[#8E9296]">
              <span>Upcoming Site Tours</span>
              <Clock className="w-4 h-4 text-[#B89A68]" />
            </div>
            <div className="font-serif text-3xl font-bold text-[#D4BD8F] mt-2">
              {siteVisitsCount}
            </div>
            <div className="text-[11px] text-[#8E9296] mt-2">
              Scheduled client walk-throughs
            </div>
          </div>
        </div>

        {/* Recent Inquiries & Projects Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left 7 Cols: Recent Customer Inquiries */}
          <div className="lg:col-span-7 bg-[#16191D] rounded-lg border border-[#252A30] p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-white">Recent Customer Leads</h3>
                <p className="text-xs text-[#8E9296]">Latest inquiries submitted from public property listings.</p>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs text-[#B89A68] hover:text-[#D4BD8F] font-semibold flex items-center gap-1"
              >
                <span>View All Leads</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {inquiries.length > 0 ? (
              <div className="divide-y divide-[#252A30]">
                {inquiries.slice(0, 5).map((inq) => (
                  <div key={inq.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="overflow-hidden">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white truncate">{inq.name}</span>
                        <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                          inq.status === 'new'
                            ? 'bg-blue-900/60 text-blue-300'
                            : inq.status === 'contacted'
                            ? 'bg-amber-900/60 text-amber-300'
                            : inq.status === 'site-visit'
                            ? 'bg-purple-900/60 text-purple-300'
                            : 'bg-emerald-900/60 text-emerald-300'
                        }`}>
                          {inq.status}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#8E9296] truncate mt-0.5">
                        {inq.projectOfInterest || 'General'} • {inq.phone}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[10px] text-[#73777C]">
                        {formatDate(inq.createdAt)}
                      </div>
                      <Link
                        href={`/admin/inquiries?id=${inq.id}`}
                        className="text-[11px] text-[#B89A68] hover:underline font-medium"
                      >
                        Manage
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-xs text-[#73777C]">
                No customer inquiries registered yet.
              </div>
            )}
          </div>

          {/* Right 5 Cols: Projects Status Breakdown */}
          <div className="lg:col-span-5 bg-[#16191D] rounded-lg border border-[#252A30] p-6 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-serif text-lg font-bold text-white">Project Directory</h3>
              <Link
                href="/admin/projects"
                className="text-xs text-[#B89A68] hover:text-[#D4BD8F] font-semibold"
              >
                All Projects
              </Link>
            </div>

            <div className="space-y-3">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="p-3 bg-[#1F242B] rounded border border-[#2E343D] flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">{p.name}</div>
                    <div className="text-[10px] text-[#8E9296] capitalize">
                      {p.category} • {p.city}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-0.5 text-[9px] font-bold uppercase rounded ${
                      p.publicationStatus === 'published'
                        ? 'bg-emerald-950 text-emerald-400'
                        : 'bg-amber-950 text-amber-400'
                    }`}>
                      {p.publicationStatus}
                    </span>
                    <div className="mt-1">
                      <Link
                        href={`/admin/projects/${p.id}`}
                        className="text-[10px] text-[#B89A68] hover:underline"
                      >
                        Edit Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-[#252A30] flex items-center justify-between text-xs text-[#8E9296]">
              <span>Need to deploy new landing pages?</span>
              <Link href="/admin/pages" className="text-[#B89A68] hover:underline">
                CMS Editor
              </Link>
            </div>
          </div>

        </div>
      </div>
    </AdminLayout>
  );
}
