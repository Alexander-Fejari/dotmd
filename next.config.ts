import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "avatars.githubusercontent.com",
                port: "",
                pathname: "/**", // Autorise toutes les images venant de ce domaine
            },
        ],
    },
};

export default nextConfig;
