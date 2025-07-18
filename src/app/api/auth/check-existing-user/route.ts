import { NextRequest } from "next/server";
import { checkUserExists } from "@/server/auth/check_existing_user";

export async function GET(req: NextRequest) {
  try {
   const res = await checkUserExists(req);
   if (res.emailExists || res.displayNameExists) {
     return Response.json(res, { status: 404 });
  }
   return Response.json(res, { status: 200 }); // Return 404 if user exists, 200 if not
  }
  catch (error) {
    console.error(`Error checking existing user:`, error);
    return new Response(`Internal Server Error`, { status: 500 });
  }
}