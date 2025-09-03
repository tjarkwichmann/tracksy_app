"use client";
import "@/globals.css";
import "leaflet/dist/leaflet.css";
import { ReactNode } from "react";
import Nav from "@/ui/utilities/Nav";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isNewActivity = pathname.includes("/activity/new/");
    const isLoginPage = pathname.includes("/login");
    const isSignInPage = pathname.includes("/register");
    return (
        <html lang="de">
            <link rel="manifest" href="/manifest.json" />
            <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
                <SessionProvider refetchInterval={0} refetchOnWindowFocus={true}>
                    <main className="flex flex-col min-h-screen md:flex-row md:items-stretch">
                        {!(isNewActivity || isLoginPage || isSignInPage) && <Nav />}
                        <div className="flex-1 px-4 py-6">{children}</div>
                    </main>
                </SessionProvider>
            </body>
        </html>
    );
}
