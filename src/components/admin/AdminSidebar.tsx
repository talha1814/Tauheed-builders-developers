'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Layers,
  CreditCard,
  Image as ImageIcon,
  Users2,
  FileEdit,
  UserCheck,
  Settings,
  History,
  LogOut,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { UserProfile } from '@/lib/types';

interface AdminSidebarProps {
  user?: UserProfile | null;
}

export default function AdminSidebar({ user }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      router.push('/admin/login');
      router.refresh();
    } catch {
      window.location.href = '/admin/login';
    }
  };

  const menuItems = [
    { name: 'Overview', href: '/admin', icon: LayoutDashboard },
    { name: 'Projects', href: '/admin/projects', icon: Building2 },
    { name: 'Units & Inventory', href: '/admin/units', icon: Layers },
    { name: 'Payment Plans', href: '/admin/payment-plans', icon: CreditCard },
    { name: 'Customer Leads', href: '/admin/inquiries', icon: Users2 },
    { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
    { name: 'CMS Pages', href: '/admin/pages', icon: FileEdit },
    { name: 'Staff & Roles', href: '/admin/users', icon: UserCheck, roles: ['super_admin', 'admin'] },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings, roles: ['super_admin', 'admin'] },
    { name: 'Audit Trail', href: '/admin/audit-logs', icon: History, roles: ['super_admin'] },
  ];

  return (
    <aside className="w-64 bg-[#121417] text-[#D8DADC] border-r border-[#22262B] flex flex-col justify-between shrink-0 min-h-screen">
      {/* Top Branding */}
      <div>
        <div className="p-5 border-b border-[#22262B]">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="bg-white rounded px-2 py-1">
              <Image
                src="/logo.png"
                alt="Tauheed Logo"
                width={140}
                height={35}
                className="h-7 w-auto object-contain"
              />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#B89A68] bg-[#B89A68]/15 px-1.5 py-0.5 rounded border border-[#B89A68]/30">
              CMS
            </span>
          </Link>
        </div>

        {/* User Card */}
        {user && (
          <div className="p-4 mx-3 my-3 bg-[#1A1E24] rounded border border-[#262B32] flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#B89A68] text-[#171A1D] flex items-center justify-center font-bold text-xs uppercase">
              {user.fullName.charAt(0)}
            </div>
            <div className="overflow-hidden flex-1">
              <div className="text-xs font-semibold text-white truncate">{user.fullName}</div>
              <div className="text-[10px] text-[#B89A68] font-mono uppercase">{user.role.replace('_', ' ')}</div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => {
            if (item.roles && user && !item.roles.includes(user.role)) {
              return null;
            }

            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-[#B89A68] text-[#171A1D] font-bold shadow-sm'
                    : 'text-[#9CA1A6] hover:bg-[#1A1E24] hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#171A1D]' : 'text-[#8E9296]'}`} />
                  <span>{item.name}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-[#171A1D]" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-[#22262B] space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2 text-xs text-[#8E9296] hover:text-white hover:bg-[#1A1E24] rounded transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Public Website</span>
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3.5 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
