'use client';

import Image from 'next/image';
import {signOut} from 'next-auth/react';

interface UserProfileProps {
    name: string | null;
    image: string | null;
}

export default function UserProfile({name, image}: UserProfileProps) {
    return (
        <div className="flex flex-col items-center gap-4 my-4">
            <div className="flex items-center gap-2">
                {image && <Image priority={true} src={image} alt={`${name} profile picture`} width={64} height={64}/>}
                <h2>Welcome, {name}</h2>
            </div>
            <button onClick={() => signOut()}>
                <a
                    className="group relative inline-block text-sm font-medium text-green-600 focus:outline-none focus:ring active:text-green-500"
                    href="#"
                >
                    <span
                        className="absolute inset-0 translate-x-0 translate-y-0 bg-green-600 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    ></span>

                    <span
                        className="relative block border border-current bg-white px-8 py-3"> Sign out </span>
                </a>
            </button>
        </div>
    );
}
