import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/data-store';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session || (session.user.role !== 'super_admin' && session.user.role !== 'admin')) {
    return NextResponse.json({ error: 'Unauthorized to modify settings' }, { status: 403 });
  }

  try {
    const body = await req.json();
    const updated = await store.updateSiteSettings(body);
    return NextResponse.json({ success: true, settings: updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
