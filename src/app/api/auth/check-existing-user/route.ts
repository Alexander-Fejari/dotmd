import { NextRequest } from "next/server";
import prisma from "@/lib/server/db/prisma";
import { stat } from "fs";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get(`email`);
  
  if (!email) {
    return new Response(`Email is required`, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }
    });

    const exists = !!user;

    return Response.json({ data: { exists }, status: 200 });
  }
  catch (error) {
    console.error(`Error checking existing user:`, error);
    return new Response(`Internal Server Error`, { status: 500 });
  }
}