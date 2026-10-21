'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Lock, Mail, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('admin@tauheedbuilders.com');
  const [password, setPassword] = useState('Tauheed@2026');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid credentials');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Login failed. Please verify your email and password.');
      setLoading(false);
    }
  };

  const handleQuickLogin = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('Tauheed@2026');
  };

  return (
    <div className="min-h-screen bg-[#0E1012] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#16191D] border border-[#252A30] rounded-lg shadow-2xl p-8">
        
        {/* Brand Logo */}
        <div className="text-center mb-8">
          <div className="bg-white/95 rounded-lg p-3 inline-block shadow-md">
            <Image
              src="/logo.png"
              alt="Tauheed Builders & Developers"
              width={200}
              height={55}
              className="h-10 w-auto object-contain mx-auto"
              priority
            />
          </div>
          <div className="mt-4">
            <h1 className="font-serif text-xl font-bold text-white">Management Console</h1>
            <p className="text-xs text-[#8E9296] mt-1">
              Authorized access only for executive directors and project staff.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#C8C7C2] mb-1">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#8E9296] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tauheedbuilders.com"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#C8C7C2] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[#8E9296] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-3.5 py-2.5 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:outline-none focus:ring-1 focus:ring-[#B89A68]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        {/* Quick Demo Credentials Box */}
        <div className="mt-8 pt-6 border-t border-[#252A30] text-xs text-[#8E9296]">
          <div className="flex items-center gap-1.5 font-semibold text-[#D4BD8F] mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Pre-Configured Demo Accounts:</span>
          </div>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('admin@tauheedbuilders.com')}
              className="w-full text-left p-2 rounded bg-[#1F242B] hover:bg-[#252B33] text-[11px] text-[#C8C7C2] flex items-center justify-between"
            >
              <span><strong>Super Admin:</strong> admin@tauheedbuilders.com</span>
              <span className="text-[#B89A68]">Auto-Fill</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('sales@tauheedbuilders.com')}
              className="w-full text-left p-2 rounded bg-[#1F242B] hover:bg-[#252B33] text-[11px] text-[#C8C7C2] flex items-center justify-between"
            >
              <span><strong>Sales Staff:</strong> sales@tauheedbuilders.com</span>
              <span className="text-[#B89A68]">Auto-Fill</span>
            </button>
          </div>
          <div className="text-[10px] text-[#73777C] mt-2">
            Password: <code className="text-[#B89A68]">Tauheed@2026</code>
          </div>
        </div>

      </div>
    </div>
  );
}
