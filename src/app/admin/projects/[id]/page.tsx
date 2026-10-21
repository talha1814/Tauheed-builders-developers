import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProjectEditorForm from '../ProjectEditorForm';
import { store } from '@/lib/data-store';
import { notFound } from 'next/navigation';

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const { id } = await params;
  const project = await store.getProjectById(id);

  if (!project) {
    notFound();
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Edit: {project.name}</h1>
          <p className="text-xs text-[#8E9296] mt-0.5">
            Modify specifications, status, imagery, and marketing copy.
          </p>
        </div>

        <ProjectEditorForm initialProject={project} />
      </div>
    </AdminLayout>
  );
}
