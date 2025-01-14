import { NextRequest, NextResponse } from "next/server";
import { getOctokit } from "@/lib/octokit";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const owner = searchParams.get("owner");
    const repo = searchParams.get("repo");

    if (!token || !owner || !repo) {
        return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
    }

    const octokit = getOctokit(token);

    try {
        const { data: readme } = await octokit.repos.getReadme({
            owner: owner.trim(),
            repo: repo.trim(),
        });

        const content = Buffer.from(readme.content, "base64").toString("utf-8");

        return NextResponse.json({ content });
    } catch (error: unknown) {
        if (error instanceof Error && error.message.includes("404")) {
            return NextResponse.json({ content: null }); // Pas de README trouvé
        }
        return NextResponse.json({ error: "Failed to fetch README" }, { status: 500 });
    }
}
