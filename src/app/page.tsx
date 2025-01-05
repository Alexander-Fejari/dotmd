'use client'

import {signIn, signOut, useSession} from "next-auth/react";

export default function Home() {
    const {data: session} = useSession();
    if(session) {
        console.log("session:", session);
    }
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1 className="text-4xl uppercase font-black">NEXT.JS 15 w/ prisma next-auth psql</h1>
            {session ? (
                <h2> Welcome {session?.user?.name}</h2>
            ): "You're not logged in"}
            <div className="flex items-center gap-4">
                <button onClick={()=> signIn()}>
                    <a
                        className="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500"
                        href="#"
                    >
                        <span
                            className="absolute inset-0 translate-x-0.5 translate-y-0.5 bg-green-600 transition-transform group-hover:translate-x-0 group-hover:translate-y-0"
                        ></span>

                        <span className="relative block border border-current bg-white px-8 py-3"> Sign in </span>
                    </a>
                </button>
                <button onClick={() => signOut()}>
                    <a
                        className="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500"
                        href="#"
                    >
                        <span
                            className="absolute inset-0 translate-x-0 translate-y-0 bg-green-600 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                        ></span>

                        <span className="relative block border border-current bg-white px-8 py-3"> Sign out </span>
                    </a>
                </button>
            </div>

        </div>
    );
}
