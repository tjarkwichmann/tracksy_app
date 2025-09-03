"use client";

import { useState, Suspense } from "react";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Search from "./Search";

const tabs = ["Freunde", "Gruppen"] as const;
type Tab = (typeof tabs)[number];

/**
 *
 * @returns Komponente, die es Benutzern ermöglicht, zwischen Freundes- und Gruppennetzwerk zu wählen.
 * Stellt zwei Tabs bereit: "Freunde" und "Gruppen", um entsprechende Suchergebnisse anzuzeigen.
 */
export default function NetworkChooseCommunity() {
    const [activeTab, setActiveTab] = useState<Tab>("Freunde");

    return (
        <main className="min-h-screen bg-gray-50 p-4 pb-24">
            <div className="mb-6 flex items-center justify-between gap-4">
                <ArrowLeftIcon className="h-10 w-10 hover:cursor-pointer" onClick={() => window.history.back()} />
                <h1 className="text-2xl font-bold text-gray-800">Community Netzwerk</h1>
                <UserGroupIcon className="h-10 w-10 mr-4 hover:cursor-pointer" />
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
                    <Search key={activeTab} searchInput={activeTab === "Freunde" ? "user" : "group"} />
                </Suspense>
            </div>
        </main>
    );
}
