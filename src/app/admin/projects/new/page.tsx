import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectEditorForm from '../ProjectEditorForm';

export default function NewProjectPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">New Real Estate Development</h1>
          <p className="text-xs text-[#8E9296] mt-0.5">
            Configure project identity, specifications, pricing, and visual media.
          </p>
        </div>

        <ProjectEditorForm />
      </div>
    </AdminLayout>
  );
}
