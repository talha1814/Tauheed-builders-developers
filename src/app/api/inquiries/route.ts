import { NextRequest, NextResponse } from 'next/server';
import { InquirySchema } from '@/lib/validations';
import { store } from '@/lib/data-store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Server-side Zod validation
    const parsed = InquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid inquiry data', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      phone,
      preferredContact,
      projectId,
      projectOfInterest,
      unitId,
      unitOfInterest,
      message,
      source,
    } = parsed.data;

    // Save to persistent repository
    const inquiry = await store.createInquiry({
      name,
      email,
      phone,
      preferredContact,
      projectId,
      projectOfInterest,
      unitId,
      unitOfInterest,
      message,
      source: source || 'Website Public Form',
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Inquiry registered successfully',
        inquiry: {
          id: inquiry.id,
          name: inquiry.name,
          createdAt: inquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error handling inquiry submission:', error);
    return NextResponse.json(
      { error: 'Failed to process inquiry. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') || undefined;
    const search = searchParams.get('search') || undefined;

    const inquiries = await store.getInquiries({ status, search });
    return NextResponse.json({ inquiries });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
