import { NextRequest, NextResponse } from "next/server";
import { getAuthUrl } from "@/server/services/repo_account/link_repo_account";

export async function GET(req: NextRequest) {
  const repoProvider = req.nextUrl.searchParams.get("repoProvider");
  if (!repoProvider || (repoProvider !== `github` && repoProvider !== `gitlab`)) {
    return NextResponse.json({ error: `Invalid or missing repoProvider` }, { status: 400 });
  }

  try {
    const repoAuthUrl = await getAuthUrl(repoProvider);
    if (repoAuthUrl instanceof Error) {
      return NextResponse.json({ error: repoAuthUrl.message }, { status: 400 });
    }
    else if (repoAuthUrl instanceof URL) {
      return NextResponse.redirect(repoAuthUrl.toString(), { status: 200 });
    }
  }
  catch (error) {
    console.error(`Error generating auth URL:`, error);
    return NextResponse.json({ error: `Internal Server Error` }, { status: 500 });
  }
}