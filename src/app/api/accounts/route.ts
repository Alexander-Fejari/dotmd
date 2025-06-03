import { NextResponse } from "next/server";
import { listGitHubAccounts } from "@/lib/services/accounts";

export async function GET(req: Request) {
  const result =  await listGitHubAccounts(req);
  return NextResponse.json(result.data || { error: result.error }, { status: result.status });
}