import { NextResponse } from 'next/server';
import { store } from '@/lib/data-store';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  const inquiries = await store.getInquiries();

  // CSV Headers
  const headers = [
    'ID',
    'Date',
    'Customer Name',
    'Email',
    'Phone',
    'Preferred Contact',
    'Project of Interest',
    'Status',
    'Assigned Staff',
    'Follow-up Date',
    'Message',
  ];

  const escapeCSV = (str: string | undefined | null) => {
    if (!str) return '""';
    return `"${str.replace(/"/g, '""')}"`;
  };

  const rows = inquiries.map(i => [
    escapeCSV(i.id),
    escapeCSV(i.createdAt.split('T')[0]),
    escapeCSV(i.name),
    escapeCSV(i.email),
    escapeCSV(i.phone),
    escapeCSV(i.preferredContact),
    escapeCSV(i.projectOfInterest || 'General'),
    escapeCSV(i.status.toUpperCase()),
    escapeCSV(i.assignedStaffName || 'Unassigned'),
    escapeCSV(i.followUpDate || 'None'),
    escapeCSV(i.message),
  ].join(','));

  const csvContent = [headers.join(','), ...rows].join('\n');

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="tauheed-leads-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}
