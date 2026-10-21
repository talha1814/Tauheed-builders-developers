import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { store } from '@/lib/data-store';
import SettingsClientManager from './SettingsClientManager';

export default async function AdminSettingsPage() {
  const settings = await store.getSiteSettings();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Global Site Configuration</h1>
          <p className="text-xs text-[#8E9296] mt-0.5">
            Configure official business contact numbers, WhatsApp concierge, corporate address, and default SEO tags.
          </p>
        </div>

        <SettingsClientManager initialSettings={settings} />
      </div>
    </AdminLayout>
  );
}
