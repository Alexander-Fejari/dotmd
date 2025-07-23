import { NextRequest, NextResponse } from "next/server";
import { updateUserData } from "@/server/services/user/update_user_data";
import { requireSession } from "@/server/utils/require_session";
import { headers } from "next/headers";

export async function POST(req: NextRequest) {
  const session = await requireSession(await headers());
  const body = await req.json();

  try {
    const result = await updateUserData(session.user.id, body);
    return NextResponse.json({ success: true, updated: result });
  } 
  catch (error) {
    console.error(`Error in POST /user-data/complete:`, error);
    return new NextResponse(`Internal Server Error`, { status: 500 });
  }
}