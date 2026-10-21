import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { store } from '@/lib/data-store';
import UnitsClientManager from './UnitsClientManager';

export default async function AdminUnitsPage() {
  const units = await store.getUnits();
  const projects = await store.getProjects();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Unit & Inventory Manager</h1>
          <p className="text-xs text-[#8E9296] mt-0.5">
            Manage apartment, penthouse, and corporate office inventory across all active projects.
          </p>
        </div>

        <UnitsClientManager initialUnits={units} projects={projects} />
      </div>
    </AdminLayout>
  );
}
