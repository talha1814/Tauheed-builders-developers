import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/data-store';
import { getSession } from '@/lib/auth';

export async function PATCH(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, status, staffName, note } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ error: 'Missing ID or status' }, { status: 400 });
    }

    const success = await store.updateInquiryStatus(id, status, staffName, note);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
