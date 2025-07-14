import { auth } from "@/lib/server/auth/auth";
import { handlePostLogin } from "@/lib/server/auth/post_signup";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //console.log(`Post signup request received. Session:`, session);

  try {
    if (session)
      await handlePostLogin(session.user);
    return new Response(`OK`, { status: 200 });
  } 
  catch (error) {
    console.error(`Post login error:`, error);
    return new Response(`Internal Server Error`, { status: 500 });
  }
}