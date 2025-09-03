"use client";

import { useState, lazy, Suspense } from "react";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

const tabs = ["Freunde", "Gruppen"] as const;
type Tab = (typeof tabs)[number];

/**
 *
 * @returns Komponente, die es Benutzern ermöglicht, zwischen Freundes- und Gruppen zu wählen.
 */
export default function ChooseCommunity() {
    const [activeTab, setActiveTab] = useState<Tab>("Freunde");

    const ActiveComponent =
        activeTab === "Freunde"
            ? lazy(() => import("@/ui/community/FriendsFeed"))
            : lazy(() => import("@/ui/community/CommunityTabGroupSelection"));

    return (
        <main className="min-h-screen bg-gray-50 p-4 pb-24">
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-800">Community</h1>
                <Link href="/community/network">
                    <UserGroupIcon className="h-10 w-10 mr-4 hover:cursor-pointer" />
                </Link>
            </div>
            <div className="mb-6 flex justify-around rounded-full bg-white shadow">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`w-full py-2 text-sm font-medium rounded-full ${
                            activeTab === tab
                                ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setActiveTab(tab)}>
                        {tab}
                    </button>
                ))}
            </div>
            <div className="rounded-xl shadow">
                <Suspense fallback={<div className="text-gray-500">Lade...</div>}>
                    <ActiveComponent />
                </Suspense>
            </div>
        </main>
    );
}
