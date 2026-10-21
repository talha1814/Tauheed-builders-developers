import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { store } from '@/lib/data-store';
import PaymentPlansClientManager from './PaymentPlansClientManager';

export default async function AdminPaymentPlansPage() {
  const plans = await store.getPaymentPlans();
  const projects = await store.getProjects();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">Payment Plan Manager</h1>
          <p className="text-xs text-[#8E9296] mt-0.5">
            Construct construction-linked milestone schedules, verify calculated sums against contract totals, and flag discrepancies.
          </p>
        </div>

        <PaymentPlansClientManager initialPlans={plans} projects={projects} />
      </div>
    </AdminLayout>
  );
}
