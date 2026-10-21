import { cookies } from 'next/headers';
import { UserProfile, UserRole } from './types';
import { store } from './data-store';

const AUTH_COOKIE_NAME = 'tauheed_admin_session';

export interface AdminSession {
  user: UserProfile;
  token: string;
}

/**
 * Get the currently authenticated admin user from cookies
 */
export async function getSession(): Promise<AdminSession | null> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(AUTH_COOKIE_NAME);
    if (!sessionCookie?.value) return null;

    const parsed = JSON.parse(decodeURIComponent(sessionCookie.value));
    if (!parsed?.userId) return null;

    const users = await store.getUsers();
    const user = users.find(u => u.id === parsed.userId);
    if (!user) return null;

    return {
      user,
      token: parsed.token || 'mock-token',
    };
  } catch {
    return null;
  }
}

/**
 * Verify if the request has sufficient role permissions
 */
export async function requireRole(allowedRoles: UserRole[] = ['super_admin', 'admin', 'sales_staff']): Promise<UserProfile | null> {
  const session = await getSession();
  if (!session) return null;
  if (!allowedRoles.includes(session.user.role)) return null;
  return session.user;
}

/**
 * Perform login authentication
 */
export async function authenticateAdmin(email: string, pass: string): Promise<UserProfile | null> {
  const users = await store.getUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
  
  // For demo/out-of-the-box local operation, accept standard password or any test credentials for defined staff
  if (user && (pass === 'Tauheed@2026' || pass === 'admin123' || pass.length >= 6)) {
    return user;
  }
  return null;
}
