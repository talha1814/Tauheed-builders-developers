import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import MediaClientManager from './MediaClientManager';

export default async function AdminMediaPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Media & Assets Library</h1>
          <p className="text-xs text-[#8E9296] mt-0.5">
            Manage architectural photography, floor plan blueprints, and official corporate brochures.
          </p>
        </div>

        <MediaClientManager />
      </div>
    </AdminLayout>
  );
}
