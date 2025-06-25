import { validateToken } from "@/lib/server/auth/get_user_from_request";
import { handlePostLogin } from "@/lib/server/auth/post_signup";

export async function POST(req: Request) {
  const token = req.headers.get("Authorization") || `ok`;
  const payload = await validateToken(token);
  if (!payload.user) return new Response(`Unauthorized`, { status: 401 });

  try {
    await handlePostLogin(payload.user);
    return new Response(`OK`, { status: 200 });
  } 
  catch (error) {
    console.error(`Post login error:`, error);
    return new Response(`Internal Server Error`, { status: 500 });
  }
}