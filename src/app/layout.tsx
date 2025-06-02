import type {Metadata} from "next";
import React from "react";
import { IBM_Plex_Sans, IBM_Plex_Mono} from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
    variable: "--font-ibm-plex-sans",
    subsets: ["latin"],
    weight: ["100","200","300", "400", "500", "600", "700"]
});

const plexMono = IBM_Plex_Mono({
    variable: "--font-ibm-plex-mono",
    subsets: ["latin"],
    weight: ["100","200","300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
    title: "DotMD",
    description: "Éditeur de README",
    icons: {
        icon: "/dotmd.ico", // Chemin relatif depuis public/
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${plexMono.variable} ${plexSans.variable} antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
