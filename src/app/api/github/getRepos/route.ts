import { NextRequest, NextResponse } from "next/server";
import { getOctokit } from "@/lib/octokit";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
        return NextResponse.json({ error: "Token is missing" }, { status: 400 });
    }

    const octokit = getOctokit(token);

    try {
        const { data: repos } = await octokit.repos.listForAuthenticatedUser({
            per_page: 35, // Permet de récupérer plus de repos si nécessaire
        });

        return NextResponse.json(repos);
    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
}
