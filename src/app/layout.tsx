import type {Metadata} from "next";
import React from "react";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

// Configurer Outfit pour sans-serif
const outfit = Outfit({
    variable: "--font-sans",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

// Configurer JetBrains Mono pour monospace
const jetBrainsMono = JetBrains_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
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
            className={`${outfit.variable} ${jetBrainsMono.variable} font-sans antialiased`}
        >
        {children}
        </body>
        </html>
    );
}
