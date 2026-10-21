import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { store } from '@/lib/data-store';
import InquiriesPipelineClient from './InquiriesPipelineClient';

export default async function AdminInquiriesPage() {
  const inquiries = await store.getInquiries();
  const staff = await store.getUsers();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Lead & Enquiry Pipeline</h1>
          <p className="text-xs text-[#8E9296] mt-0.5">
            Track inquiries across stages (New &rarr; Contacted &rarr; Qualified &rarr; Site Visit &rarr; Converted), assign property consultants, add internal notes, and export CSVs.
          </p>
        </div>

        <InquiriesPipelineClient initialInquiries={inquiries} staffMembers={staff} />
      </div>
    </AdminLayout>
  );
}
