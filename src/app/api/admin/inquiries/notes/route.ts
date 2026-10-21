import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/data-store';
import { getSession } from '@/lib/auth';

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { inquiryId, content, authorName } = await req.json();
    if (!inquiryId || !content) {
      return NextResponse.json({ error: 'Missing inquiryId or note content' }, { status: 400 });
    }

    const success = await store.addInquiryNote(
      inquiryId,
      authorName || session.user.fullName || 'Admin',
      content
    );

    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
