import { NextRequest, NextResponse } from 'next/server';
import { AdminLoginSchema } from '@/lib/validations';
import { authenticateAdmin } from '@/lib/auth';

const AUTH_COOKIE_NAME = 'tauheed_admin_session';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AdminLoginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid login credentials', details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;
    const user = await authenticateAdmin(email, password);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password. Please verify your credentials.' },
        { status: 401 }
      );
    }

    // Set secure HTTP-only session cookie
    const sessionData = {
      userId: user.id,
      email: user.email,
      role: user.role,
      token: `token_${Date.now()}_${user.id}`,
    };

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });

    response.cookies.set({
      name: AUTH_COOKIE_NAME,
      value: encodeURIComponent(JSON.stringify(sessionData)),
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true, message: 'Logged out successfully' });
  response.cookies.delete(AUTH_COOKIE_NAME);
  return response;
}
