import { NextResponse } from "next/server";
import { linkGitHubAccount } from "@/server/services/repo_account";

export async function POST(req: Request) {
  const result = await linkGitHubAccount(req);
  return NextResponse.json(result.data || { error: result.error }, { status: result.status });
}