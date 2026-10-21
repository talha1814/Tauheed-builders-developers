import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { store } from '@/lib/data-store';
import { ShieldCheck, UserCheck, Plus, Key } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default async function AdminUsersPage() {
  const users = await store.getUsers();

  const roleBadges: Record<string, { label: string; bg: string; text: string }> = {
    super_admin: { label: 'Super Admin', bg: 'bg-amber-950/40', text: 'text-amber-400' },
    admin: { label: 'Administrator', bg: 'bg-blue-950/40', text: 'text-blue-400' },
    sales_staff: { label: 'Sales Staff', bg: 'bg-emerald-950/40', text: 'text-emerald-400' },
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl font-bold text-white">Staff & Access Permissions</h1>
            <p className="text-xs text-[#8E9296] mt-0.5">
              Role-based authorization and staff credentials.
            </p>
          </div>
        </div>

        {/* Security Alert */}
        <div className="p-4 bg-[#16191D] rounded-lg border border-[#252A30] flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#B89A68] shrink-0 mt-0.5" />
          <div className="text-xs text-[#8E9296] leading-relaxed">
            <strong className="text-white">Least-Privilege Enforcement:</strong> Sales staff accounts are restricted to viewing and managing assigned leads and customer follow-up notes. Only Super Admins may access the immutable audit trail or alter sensitive site configuration.
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#16191D] rounded-lg border border-[#252A30] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#E8E7E2]">
              <thead>
                <tr className="border-b border-[#252A30] bg-[#14171A] text-[#8E9296] uppercase font-semibold">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Contact Phone</th>
                  <th className="py-3 px-4">Registered Date</th>
                  <th className="py-3 px-4">Last Login</th>
                  <th className="py-3 px-4 text-right">Access Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252A30]">
                {users.map((u) => {
                  const roleStyle = roleBadges[u.role] || { label: u.role, bg: 'bg-zinc-800', text: 'text-zinc-300' };

                  return (
                    <tr key={u.id} className="hover:bg-[#1A1E24] transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{u.fullName}</div>
                        <div className="text-[11px] text-[#8E9296]">{u.email}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded border border-current/20 ${roleStyle.bg} ${roleStyle.text}`}>
                          {roleStyle.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[#C8C7C2]">
                        {u.phone || 'N/A'}
                      </td>
                      <td className="py-3.5 px-4 text-[#8E9296]">
                        {formatDate(u.createdAt)}
                      </td>
                      <td className="py-3.5 px-4 text-[#8E9296]">
                        {u.lastLogin ? formatDate(u.lastLogin) : 'Active'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800">
                          Authorized
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
