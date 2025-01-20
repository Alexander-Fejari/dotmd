'use client';
import Image from 'next/image';
import Link from "next/link";
import {useState} from "react";
import {signIn, signOut, useSession} from 'next-auth/react';
import {Button} from "@/components/ui/button";
import Loader from "@/components/Loader";


export default function GreetingUser() {
    const {data: session} = useSession();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        await signIn(undefined, { callbackUrl: "/dashboard" });
        setIsLoading(false);
    };

    if (!session) {
        return (
            <div className="flex items-center gap-4 my-4">
                <Button
                    variant={"default"}
                    onClick={handleSignIn}
                    disabled={isLoading}
                    >
                    {isLoading ? <Loader fullScreen={false} /> : "Sign In"}
                </Button>
            </div>
        );
    }

    const {name, image} = session.user || {};

    return (
        <div className="flex items-center gap-4 my-4">
            <div className="flex items-center gap-2">
                {image && <Image priority={true} src={image} alt={`${name}'s profile picture`} width={22} height={22}/>}
                <h2>
                    <span className={'text-green-600'}>Bienvenue, </span>
                    <span className={'font-bold'}>{name}</span>
                </h2>
            </div>
            <Button>
                <Link href={"/dashboard"}>
                    Dashboard
                </Link>
            </Button>
            <Button variant={"outline"} onClick={() => signOut()}>Sign Out</Button>
        </div>
    );
}
