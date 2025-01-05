import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Provider from "@/app/Provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DotMD",
    description: "Next app for customize your Markdown",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Provider>
            <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-green-600`}
            >
            {children}
            </body>
            </html>
        </Provider>

    );
}
