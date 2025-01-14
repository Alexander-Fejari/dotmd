'use client'
import { SessionProvider as NextAuthProvider } from "next-auth/react";
import {ReactNode} from "react";

const SessionProvider = ({ children }: { children: ReactNode }) => {
    return <NextAuthProvider>{children}</NextAuthProvider>;
}
export default SessionProvider;
