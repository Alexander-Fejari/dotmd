'use client';

import {useState} from "react";
import {signIn, useSession} from "next-auth/react";
import {fetchRepositoriesWithReadme} from "@/app/services/github.service";
import {RepoWithReadme} from "@/types/github";
import RepoList from "@/app/components/RepoList";
import UserProfile from "@/app/components/UserProfile";

export default function Home() {
    const {data: session} = useSession();
    const [repos, setRepos] = useState<RepoWithReadme[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchRepos = async () => {
        if (!session?.accessToken) return;

        setLoading(true);
        try {
            const repos = await fetchRepositoriesWithReadme(session.accessToken as string);
            setRepos(repos);
        } catch (error) {
            console.error("Erreur lors de la récupération des dépôts:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto flex flex-col justify-center items-center gap-y-12">
            <h1>GitHub Repositories</h1>
            {session ? (
                <>
                    <UserProfile name={`${session.user?.name}`} image={`${session.user?.image}`}/>
                    <button onClick={fetchRepos} disabled={loading}>
                        <a
                            className="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500"
                            href="#"
                        >
                    <span
                        className="absolute inset-0 translate-x-0 translate-y-0 bg-green-600 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    ></span>

                            <span
                                className="relative block border border-current bg-white px-8 py-3">{loading ? "Fetching..." : "Fetch Repositories"}</span>
                        </a>
                    </button>
                    <RepoList repos={repos}/>
                </>
            ) : (
                <>
                    <p>You are not logged in.</p>
                    <button onClick={() => signIn()}>                        <a
                        className="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500"
                        href="#"
                    >
                    <span
                        className="absolute inset-0 translate-x-0 translate-y-0 bg-green-600 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    ></span>

                        <span
                            className="relative block border border-current bg-white px-8 py-3">Sign In</span>
                    </a>
                    </button>
                </>
            )}
        </div>
    );
}
