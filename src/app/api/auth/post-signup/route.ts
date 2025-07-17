import { handlePostLogin } from "@/server/auth/post_signup";

export async function POST(req: Request) {
  try {
    const result = await handlePostLogin(req.headers);
    if (result) {
      return new Response(`UserData created successfully`, { status: 201 });
    }
    return new Response(`UserData already exists`, { status: 409 });
  } 
  catch (error) {
    console.error(`Post login error:`, error);
    return new Response(`Internal Server Error`, { status: 500 });
  }
}