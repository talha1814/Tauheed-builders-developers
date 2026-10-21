'use client';

import React, { useState } from 'react';
import { Inquiry, UserProfile } from '@/lib/types';
import { formatDate, getWhatsAppUrl } from '@/lib/utils';
import {
  Search,
  Download,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  UserCheck,
  Send,
  X,
  Plus,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';

interface InquiriesPipelineClientProps {
  initialInquiries: Inquiry[];
  staffMembers: UserProfile[];
}

export default function InquiriesPipelineClient({
  initialInquiries,
  staffMembers,
}: InquiriesPipelineClientProps) {
  const [inquiries, setInquiries] = useState<Inquiry[]>(initialInquiries);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeInquiry, setActiveInquiry] = useState<Inquiry | null>(null);
  const [newNoteContent, setNewNoteContent] = useState('');

  const filtered = inquiries.filter((i) => {
    const matchStatus = statusFilter === 'all' || i.status === statusFilter;
    const matchSearch =
      searchTerm === '' ||
      i.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      i.phone.includes(searchTerm) ||
      (i.projectOfInterest && i.projectOfInterest.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const handleUpdateStatus = async (inquiryId: string, newStatus: Inquiry['status'], staffName?: string) => {
    try {
      const res = await fetch('/api/admin/inquiries', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: inquiryId, status: newStatus, staffName }),
      });
      if (res.ok) {
        setInquiries(
          inquiries.map((i) => (i.id === inquiryId ? { ...i, status: newStatus, assignedStaffName: staffName || i.assignedStaffName } : i))
        );
        if (activeInquiry && activeInquiry.id === inquiryId) {
          setActiveInquiry({ ...activeInquiry, status: newStatus, assignedStaffName: staffName || activeInquiry.assignedStaffName });
        }
      }
    } catch {
      alert('Failed to update status.');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeInquiry || !newNoteContent.trim()) return;

    try {
      const res = await fetch('/api/admin/inquiries/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId: activeInquiry.id,
          content: newNoteContent.trim(),
          authorName: 'Admin',
        }),
      });

      if (res.ok) {
        const newNote = {
          id: `note-${Date.now()}`,
          inquiryId: activeInquiry.id,
          authorId: 'user-1',
          authorName: 'Admin',
          content: newNoteContent.trim(),
          createdAt: new Date().toISOString(),
        };

        const updatedInquiry = {
          ...activeInquiry,
          internalNotes: [newNote, ...activeInquiry.internalNotes],
        };

        setActiveInquiry(updatedInquiry);
        setInquiries(inquiries.map(i => i.id === activeInquiry.id ? updatedInquiry : i));
        setNewNoteContent('');
      }
    } catch {
      alert('Failed to append note.');
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#16191D] p-4 rounded-lg border border-[#252A30]">
        <div className="flex flex-1 items-center gap-3 w-full">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#8E9296] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search leads by customer, phone, project..."
              className="w-full pl-9 pr-3.5 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
          >
            <option value="all">All Pipeline Stages</option>
            <option value="new">New Lead</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="site-visit">Site Visit</option>
            <option value="converted">Converted (Closed)</option>
            <option value="lost">Lost</option>
          </select>
        </div>

        {/* CSV Export */}
        <a
          href="/api/export-leads"
          download
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#1F242B] hover:bg-[#252B33] text-white text-xs font-semibold rounded border border-[#2E343D] transition-colors shrink-0"
        >
          <Download className="w-3.5 h-3.5 text-[#B89A68]" />
          <span>Export CSV</span>
        </a>
      </div>

      {/* Leads Table */}
      <div className="bg-[#16191D] rounded-lg border border-[#252A30] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#E8E7E2]">
            <thead>
              <tr className="border-b border-[#252A30] bg-[#14171A] text-[#8E9296] uppercase font-semibold">
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact</th>
                <th className="py-3 px-4">Project of Interest</th>
                <th className="py-3 px-4">Assigned Staff</th>
                <th className="py-3 px-4">Pipeline Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#252A30]">
              {filtered.map((inq) => (
                <tr
                  key={inq.id}
                  onClick={() => setActiveInquiry(inq)}
                  className="hover:bg-[#1A1E24] transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 text-[#8E9296] whitespace-nowrap">
                    {formatDate(inq.createdAt)}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{inq.name}</div>
                    <div className="text-[11px] text-[#8E9296]">{inq.email}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-mono text-white">{inq.phone}</div>
                    <div className="text-[10px] text-[#B89A68] uppercase font-semibold">
                      via {inq.preferredContact}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-[#C8C7C2]">
                    {inq.projectOfInterest || 'General Inquiry'}
                  </td>
                  <td className="py-3.5 px-4 text-[#8E9296]">
                    {inq.assignedStaffName || 'Unassigned'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${
                      inq.status === 'new'
                        ? 'bg-blue-900/60 text-blue-300 border border-blue-800'
                        : inq.status === 'contacted'
                        ? 'bg-amber-900/60 text-amber-300 border border-amber-800'
                        : inq.status === 'site-visit'
                        ? 'bg-purple-900/60 text-purple-300 border border-purple-800'
                        : inq.status === 'converted'
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-800'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      {inq.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveInquiry(inq);
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold text-[#B89A68] hover:text-[#D4BD8F] bg-[#1F242B] rounded border border-[#2E343D]"
                    >
                      View Dossier
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail & Notes Modal / Drawer */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#16191D] border border-[#252A30] rounded-lg max-w-2xl w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-[#252A30]">
              <div>
                <span className="text-[10px] font-mono text-[#8E9296] uppercase">{activeInquiry.id}</span>
                <h3 className="font-serif text-xl font-bold text-white mt-0.5">{activeInquiry.name}</h3>
                <div className="text-xs text-[#8E9296] mt-0.5">
                  Submitted on {formatDate(activeInquiry.createdAt)} via {activeInquiry.source}
                </div>
              </div>
              <button onClick={() => setActiveInquiry(null)} className="text-[#8E9296] hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact & Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <a
                href={`tel:${activeInquiry.phone}`}
                className="p-3 bg-[#1F242B] hover:bg-[#262C34] rounded border border-[#2E343D] text-center"
              >
                <Phone className="w-4 h-4 text-[#B89A68] mx-auto mb-1" />
                <div className="text-[11px] font-semibold text-white truncate">{activeInquiry.phone}</div>
                <div className="text-[10px] text-[#8E9296]">Click to Call</div>
              </a>

              <a
                href={getWhatsAppUrl(activeInquiry.phone, `Hello ${activeInquiry.name}, this is Tauheed Builders & Developers regarding your inquiry for ${activeInquiry.projectOfInterest || 'our projects'}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#1F242B] hover:bg-[#262C34] rounded border border-[#2E343D] text-center"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] mx-auto mb-1" />
                <div className="text-[11px] font-semibold text-white">WhatsApp</div>
                <div className="text-[10px] text-[#8E9296]">Send Message</div>
              </a>

              <a
                href={`mailto:${activeInquiry.email}`}
                className="p-3 bg-[#1F242B] hover:bg-[#262C34] rounded border border-[#2E343D] text-center col-span-2 sm:col-span-1"
              >
                <Mail className="w-4 h-4 text-[#B89A68] mx-auto mb-1" />
                <div className="text-[11px] font-semibold text-white truncate">{activeInquiry.email}</div>
                <div className="text-[10px] text-[#8E9296]">Email Dossier</div>
              </a>
            </div>

            {/* Customer Message */}
            <div className="p-4 bg-[#1F242B] rounded border border-[#2E343D] space-y-1">
              <div className="text-[11px] font-semibold uppercase text-[#8E9296]">Customer Message</div>
              <p className="text-xs text-[#E8E7E2] leading-relaxed italic">
                &ldquo;{activeInquiry.message}&rdquo;
              </p>
            </div>

            {/* Stage & Assignment Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[#C8C7C2] mb-1">Pipeline Stage</label>
                <select
                  value={activeInquiry.status}
                  onChange={(e) => handleUpdateStatus(activeInquiry.id, e.target.value as any)}
                  className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded font-medium"
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="site-visit">Site Visit Scheduled</option>
                  <option value="converted">Converted (Closed Sale)</option>
                  <option value="lost">Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-[#C8C7C2] mb-1">Assign Senior Consultant</label>
                <select
                  value={activeInquiry.assignedStaffName || ''}
                  onChange={(e) => handleUpdateStatus(activeInquiry.id, activeInquiry.status, e.target.value)}
                  className="w-full px-3 py-2 bg-[#1F242B] border border-[#2E343D] text-white rounded font-medium"
                >
                  <option value="">Unassigned</option>
                  {staffMembers.map(s => (
                    <option key={s.id} value={s.fullName}>{s.fullName} ({s.role})</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Internal Notes Thread */}
            <div className="space-y-3 pt-2 border-t border-[#252A30]">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">Internal Follow-Up Notes</span>
                <span className="text-[#8E9296] text-[11px]">{activeInquiry.internalNotes.length} Notes</span>
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  value={newNoteContent}
                  onChange={(e) => setNewNoteContent(e.target.value)}
                  placeholder="Record client feedback, site visit time, or offer details..."
                  className="flex-1 px-3 py-2 text-xs bg-[#1F242B] border border-[#2E343D] text-white rounded focus:ring-1 focus:ring-[#B89A68] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#B89A68] hover:bg-[#D4BD8F] text-[#171A1D] text-xs font-bold uppercase rounded tracking-wider shrink-0"
                >
                  Add Note
                </button>
              </form>

              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {activeInquiry.internalNotes.map((note) => (
                  <div key={note.id} className="p-3 bg-[#1F242B] rounded text-xs space-y-1 border border-[#2E343D]">
                    <div className="flex items-center justify-between text-[10px] text-[#8E9296]">
                      <span className="font-semibold text-[#D4BD8F]">{note.authorName}</span>
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                    <p className="text-[#E8E7E2]">{note.content}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
