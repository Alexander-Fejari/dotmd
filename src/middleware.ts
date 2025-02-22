import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"], // Applique le middleware à ces routes
};

export function middleware(req: NextRequest) {
    const isProduction = process.env.NODE_ENV === "production";
    const token = req.cookies.get(isProduction ? "__Secure-next-auth.session-token" : "next-auth.session-token");

    if (!token) {
        const url = req.nextUrl.clone();
        url.pathname = "/api/auth/signin"; // Redirige vers la page de connexion
        url.searchParams.set("callbackUrl", req.nextUrl.pathname); // Ajoute le callbackUrl
        return NextResponse.redirect(url);
    }

    return NextResponse.next(); // Laisse passer si authentifié
}
