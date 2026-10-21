'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { getWhatsAppUrl } from '@/lib/utils';

interface WhatsAppButtonProps {
  phone: string;
  defaultMessage?: string;
}

export default function WhatsAppButton({
  phone,
  defaultMessage = "Hello Tauheed Builders & Developers, I am interested in inquiring about your property developments.",
}: WhatsAppButtonProps) {
  const url = getWhatsAppUrl(phone, defaultMessage);

  return (
    <aside aria-label="Quick contact" className="fixed bottom-6 right-6 z-40 group">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Concierge"
        className="flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-ping opacity-75" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#B89A68] rounded-full" />
        </div>
        <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider">
          WhatsApp Concierge
        </span>
      </a>
    </aside>
  );
}
