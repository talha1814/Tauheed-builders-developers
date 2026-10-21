import React from 'react';
import AdminSidebar from './AdminSidebar';
import { getSession } from '@/lib/auth';
import { redirect } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const session = await getSession();

  // If no active session, redirect to login
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen flex bg-[#0E1012] text-[#E8E7E2]">
      {/* Sidebar */}
      <AdminSidebar user={session.user} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="h-14 border-b border-[#22262B] bg-[#14171A] px-6 flex items-center justify-between shrink-0">
          <div className="text-xs text-[#8E9296]">
            Tauheed Builders & Developers Management Console
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#8E9296]">
              Session: <strong className="text-white">{session.user.email}</strong>
            </span>
          </div>
        </header>

        <main className="p-6 lg:p-8 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
