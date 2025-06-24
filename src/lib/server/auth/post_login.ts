import { cookies  } from "next/headers";
import { verifyJwt } from "better-auth/plugins";
import prisma from "@/lib/server/db/prisma";

//export async function 