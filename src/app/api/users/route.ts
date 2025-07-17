// import prisma from '@/lib/server/db/prisma';

// /**
//  * @openapi
//  * /api/users:
//  *   get:
//  *     description: Returns the hello world
//  *     responses:
//  *       200:
//  *         description: Hello World!
//  */

// export async function GET() {
//     try {
//         const users = await prisma.user.findMany();
//         console.log(`Fetched ${users.length} users from the database.`);
//         return Response.json({ success: true, data: users });
//     } catch (error) {
//         return Response.json({ success: false, error: (error as Error).message }, { status: 500 });
//     }
// }
