'use client';

import React from 'react';
import {signOut} from 'next-auth/react';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import Loader from '@/components/Loader';

interface SidebarUserProfileProps {
    name: string;
    avatarUrl: string;
}

const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({name, avatarUrl}) => {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const handleSignOut = async () => {
        setIsLoading(true);
        await signOut({callbackUrl: '/'});
        setIsLoading(false);
    };

    return (
        <div className="flex items-center justify-between gap-2 py-4 px-6 border-t border-primary md:gap-4">
            <Avatar>
                <AvatarImage src={avatarUrl} alt={name}/>
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                disabled={isLoading}
                className="text-primary hover:bg-primary/20"
            >
                {isLoading ? <Loader fullScreen={false}/> : 'Se déconnecter'}
            </Button>
        </div>
    );
};

export default SidebarUserProfile;
