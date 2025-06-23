import { NextResponse } from "next/server";
import { listGitHubAccounts } from "@/lib/server/services/repo_account";

export async function GET(req: Request) {
  const result =  await listGitHubAccounts(req);
  return NextResponse.json(result.data || { error: result.error }, { status: result.status });
}