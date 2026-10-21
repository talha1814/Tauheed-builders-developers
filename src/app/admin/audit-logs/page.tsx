import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { store } from '@/lib/data-store';
import { getSession } from '@/lib/auth';
import { formatDate } from '@/lib/utils';
import { ShieldAlert, History, User } from 'lucide-react';
import { redirect } from 'next/navigation';

export default async function AdminAuditLogsPage() {
  const session = await getSession();

  // Role restriction check
  if (!session || session.user.role !== 'super_admin') {
    return (
      <AdminLayout>
        <div className="p-8 text-center bg-[#16191D] rounded-lg border border-red-900/50 max-w-lg mx-auto">
          <ShieldAlert className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <h2 className="font-serif text-xl font-bold text-white">Access Restricted</h2>
          <p className="text-xs text-[#8E9296] mt-2 leading-relaxed">
            The security audit trail is restricted to Super Administrators. Your role ({session?.user.role}) does not possess elevated clearance.
          </p>
        </div>
      </AdminLayout>
    );
  }

  const logs = await store.getAuditLogs();

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-white">System Audit & Compliance Log</h1>
          <p className="text-xs text-[#8E9296] mt-0.5">
            Immutable security event journal recording mutations, publish events, and administrative access.
          </p>
        </div>

        {/* Audit Log Table */}
        <div className="bg-[#16191D] rounded-lg border border-[#252A30] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#E8E7E2]">
              <thead>
                <tr className="border-b border-[#252A30] bg-[#14171A] text-[#8E9296] uppercase font-semibold">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Actor</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Entity Type</th>
                  <th className="py-3 px-4">Target Name / ID</th>
                  <th className="py-3 px-4">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#252A30]">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#1A1E24] transition-colors">
                    <td className="py-3.5 px-4 text-[#8E9296] whitespace-nowrap font-mono text-[11px]">
                      {log.timestamp.replace('T', ' ').slice(0, 19)}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-white">{log.userEmail}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                        log.action === 'create'
                          ? 'bg-emerald-950 text-emerald-400'
                          : log.action === 'delete'
                          ? 'bg-red-950 text-red-400'
                          : log.action === 'publish'
                          ? 'bg-blue-950 text-blue-400'
                          : 'bg-zinc-800 text-zinc-300'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 uppercase font-mono text-[10px] text-[#B89A68]">
                      {log.entityType}
                    </td>
                    <td className="py-3.5 px-4 text-white font-medium">
                      {log.entityName || log.entityId}
                    </td>
                    <td className="py-3.5 px-4 text-[#8E9296] font-mono text-[10px] truncate max-w-xs">
                      {log.details ? JSON.stringify(log.details) : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
