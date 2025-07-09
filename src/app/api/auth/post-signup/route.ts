import { auth } from "@/lib/server/auth/auth";
import { handlePostLogin } from "@/lib/server/auth/post_signup";
import { headers } from "next/headers";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  //console.log(`Session:`, session);

  try {
    if (session)
      await handlePostLogin(session.user);
    //console.log(`Post login request received`);
    return new Response(`OK`, { status: 200 });
  } 
  catch (error) {
    console.error(`Post login error:`, error);
    return new Response(`Internal Server Error`, { status: 500 });
  }
}