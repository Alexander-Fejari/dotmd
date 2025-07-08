import { jwtVerify, createRemoteJWKSet } from 'jose'
 
export async function validateToken(token: string) {
  try {
    const JWKS = createRemoteJWKSet(
      new URL('http://localhost:3000/api/auth/jwks')
    )
    console.log('Validating token:', token);
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: 'http://localhost:3000', // Should match your JWT issuer, which is the BASE_URL by default
      audience: 'http://localhost:3000', // Should match your JWT audience, which is the BASE_URL by default
    })
    return payload
  } 
  catch (error) {
    console.error('Token validation failed:', error)
    throw error
  }
}

// import jwt from "jsonwebtoken";
// import prisma from "@/lib/server/db/prisma";

// const secret = process.env.BETTER_AUTH_SECRET!;
// if (!secret) 
//   throw new Error("Missing BETTER_AUTH_SECRET");

// export async function getUserFromRequest(req: Request) {
//   const authHeader = req.headers.get(`Authorization`);

//   if (!authHeader || !authHeader.startsWith(`Bearer`)) {
//     console.warn(`No valid Authorization header found`);
//     return null;
//   }
    
//   const token = authHeader.split(" ")[1];

//   try {
//     const payload = jwt.verify(token, secret) as { id: string };

//     const user = await prisma.userData.findUnique({
//       where: { id: payload.id },
//     });

//     console.log(user);
//     return user;
//   } 
//   catch (err) {
//     console.error(`Invalid JWT:`, err);
//     return null;
//   }
// }