import { NextRequest, NextResponse } from "next/server";
import { getAuthUrl } from "@/server/services/repo_account/link_repo_account";

export async function GET(req: NextRequest) {
  const repoProvider = req.nextUrl.searchParams.get("repoProvider");
  if (!repoProvider) return NextResponse.json({ error: "repoProvider required" }, { status: 400 });

  const urlOrError = await getAuthUrl(repoProvider);
  if (urlOrError instanceof Error) {
    return NextResponse.json({ error: urlOrError.message }, { status: 400 });
  }
  const redirectUrl = urlOrError.toString();

  return NextResponse.json({url: redirectUrl });
}