import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { store } from '@/lib/data-store';
import CMSPagesClientManager from './CMSPagesClientManager';

export default async function AdminPagesCMSPage() {
  const cms = await store.getCMSContent();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">CMS Content Manager</h1>
          <p className="text-xs text-[#8E9296] mt-0.5">
            Update public marketing copy, hero headlines, company mission, values, and services without modifying code.
          </p>
        </div>

        <CMSPagesClientManager initialCMS={cms} />
      </div>
    </AdminLayout>
  );
}
