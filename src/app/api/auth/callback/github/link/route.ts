import { NextRequest, NextResponse } from "next/server";
import { linkRepoAccount } from "@/server/services/repo_account/link_repo_account";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get(`code`);
  if (!code) 
    return NextResponse.json({ error: `Missing code or provider` }, { status: 400 });

  const res = await linkRepoAccount(req, code, `github`);

  const redirectTo = `${process.env.BETTER_AUTH_URL}/auth/signup?step=3${res.success ? '' : `&error=${encodeURIComponent(res.error)}`}`;
  return NextResponse.redirect(redirectTo);
}