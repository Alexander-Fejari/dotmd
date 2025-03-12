'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from "next/link";
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Loader from '@/components/Loader';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

export default function GreetingUser() {
    const { data: session, status } = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleSignIn = async () => {
        setIsLoading(true);
        await signIn('github', { callbackUrl: '/dashboard' });
        setIsLoading(false);
    };

    const handleSignOut = async () => {
        setIsLoading(true);
        await signOut({ callbackUrl: '/' });
        setIsLoading(false);
    };

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center py-4">
                <Loader fullScreen={false} />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex justify-center py-4 px-2">
                <Button
                    variant="default"
                    onClick={handleSignIn}
                    disabled={isLoading}
                    className="w-full max-w-[200px] rounded-full"
                >
                    {isLoading ? <Loader fullScreen={false} /> : 'Se connecter avec GitHub'}
                </Button>
            </div>
        );
    }

    const { name, image } = session.user || {};

    return (
        <div className="flex items-center justify-between w-full py-3 px-3 ">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="flex items-center gap-2 p-2 w-full justify-start"
                    >
                        {image && (
                            <Image
                                priority={true}
                                src={image}
                                alt={`${name ?? 'Utilisateur'}'s profile picture`}
                                width={28}
                                height={28}
                                className="rounded-full"
                            />
                        )}
                        <div className="flex items-center gap-1">
                            <span className="hidden md:inline text-primary text-sm font-thin">Bienvenue, </span>
                            <span className="text-sm">{name ?? 'Utilisateur'}</span>
                            <ChevronDown className="w-4 h-4 text-primary ml-1" />
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[calc(100%-1.5rem)] mx-3">
                    <DropdownMenuItem asChild className={"hover:bg-primary/90"}>
                        <Link href="/dashboard" className="w-full text-sm py-2">
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={handleSignOut}
                        disabled={isLoading}
                        className="text-sm py-2 hover:bg-primary/90"
                    >
                        {isLoading ? <Loader fullScreen={false} /> : 'Se déconnecter'}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
