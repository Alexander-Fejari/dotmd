import { NextResponse } from "next/server";
import { linkRepoAccount } from "@/server/services/repo_account/link_repo_account";

export async function POST(req: Request) {
  const result = await linkRepoAccount(req);
  return NextResponse.json(result.data || { error: result.error }, { status: result.status });
}