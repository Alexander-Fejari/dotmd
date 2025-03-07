import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { getOctokit } from "@/lib/octokit";

// POST /api/github/addReadme
export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);

    if (!session || !session.accessToken) {
        console.warn("⚠️ Tentative d'accès non autorisé");
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { owner, repo, content } = await req.json();

    if (!owner || !repo || !content) {
        return NextResponse.json({ error: "Données manquantes" }, { status: 400 });
    }

    const octokit = getOctokit(session.accessToken);

    try {
        const response = await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path: "README.md",
            message: "📄 Ajout d'un README via DotMD",
            content: Buffer.from(content, "utf-8").toString("base64"),
            committer: {
                name: session.user?.name || "DotMD Bot",
                email: session.user?.email || "dotmd@bot.com",
            },
            author: {
                name: session.user?.name || "DotMD Bot",
                email: session.user?.email || "dotmd@bot.com",
            },
        });

        return NextResponse.json({ success: true, response });
    } catch (error) {
        console.error("❌ Erreur lors de la création du README :", error);
        return NextResponse.json({ error: "Erreur lors de la création du README" }, { status: 500 });
    }
}
