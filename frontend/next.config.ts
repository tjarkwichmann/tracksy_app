import type { NextConfig } from "next";
import { networkInterfaces } from "os";

function getLocalIPs(): string[] {
    const nets = networkInterfaces();
    const results = ["http://localhost:3000", "http://127.0.0.1:3000"];

    for (const name of Object.keys(nets)) {
        for (const net of nets[name] || []) {
            if (net.family === "IPv4" && !net.internal) {
                results.push(`http://${net.address}:3000`);
            }
        }
    }

    return results;
}

const devConfig: Partial<NextConfig> = {};

const baseConfig: NextConfig = {
    reactStrictMode: true,
    ...devConfig,
};

const withPWA = require("next-pwa")({
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
});

export default withPWA(baseConfig);
