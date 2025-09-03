"use client";

import { signOut, useSession } from "next-auth/react";
import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const { data: session, update } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            localStorage.clear();
            sessionStorage.clear();

            await update();

            await signOut({
                callbackUrl: "/login",
                redirect: false,
            });

            router.push("/login");
            router.refresh();

            setTimeout(() => {
                window.location.href = "/login";
            }, 100);
        } catch (error) {
            console.error("Logout error:", error);
            window.location.href = "/login";
        }
    };

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full shadow-md hover:scale-105 hover:cursor-pointer transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400">
            <ArrowLeftEndOnRectangleIcon className="h-5 w-5" />
            Logout
        </button>
    );
}
