import { NextResponse } from "next/server";
import { linkGitHubAccount } from "@/lib/services/accounts";

export async function POST(req: Request) {
  const result = await linkGitHubAccount(req);
  return NextResponse.json(result.data || { error: result.error }, { status: result.status });
}