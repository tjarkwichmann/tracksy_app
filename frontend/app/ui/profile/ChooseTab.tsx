"use client";

import React, { useState } from "react";
import GoalAndBadges from "@/ui/profile/GoalAndBadges";
import LogoutButton from "./LogoutButton";

export default function ChooseTab() {
    const [selectedTab, setSelectedTab] = useState<"Ziele" | "Stats">("Ziele");
    return (
        <main className="min-h-screen bg-gray-50 p-4 pb-24">
            <div className="mb-6 flex justify-end rounded-lg  ">
                <LogoutButton />
            </div>
            <h1 className="mb-4 text-xl font-semibold text-gray-800">Dein Bereich</h1>

            <div className="mb-6 flex justify-around rounded-full bg-white shadow">
                {(["Ziele", "Stats"] as const).map((tab) => (
                    <button
                        key={tab}
                        className={`w-full py-2 text-sm font-medium rounded-full ${
                            selectedTab === tab
                                ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                                : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedTab(tab)}>
                        {tab}
                    </button>
                ))}
            </div>

            {selectedTab === "Stats" && (
                <section className="rounded-lg bg-white p-4 shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Ziele</h2>
                    <p className="text-sm text-gray-500">Wöchentliche Ziele, Fortschritt und Motivation.</p>
                </section>
            )}

            {selectedTab === "Ziele" && <GoalAndBadges />}
        </main>
    );
}
