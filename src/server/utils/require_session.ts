import { auth } from "@/server/auth/auth";

export async function requireSession(headers: Headers) {
  const session = await auth.api.getSession({ headers });

  if (!session) {
    throw new Error(`Unauthorized, no active session`);
  }

  return session;
}