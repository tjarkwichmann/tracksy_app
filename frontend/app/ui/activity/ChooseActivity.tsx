"use client";

import { useState } from "react";
import StartWorkout from "@/ui/activity/StartWorkout";
import StartRun from "@/ui/activity/StartRun";

const tabs = ["Workout", "Lauf"] as const;
type Tab = (typeof tabs)[number];

/**
 * 
 * @returns JSX-Komponente, die es dem Benutzer ermöglicht, zwischen der Erstellung eines Workouts oder eines Laufs zu wählen
 * Zeigt zwei Tabs an: "Workout" und "Lauf". Je nach Auswahl wird die entsprechende Komponente geladen.

 */
export default function ChooseActivity() {
    const [activeTab, setActiveTab] = useState<Tab>("Workout");

    return (
        <main className="min-h-screen bg-gray-50 p-4 pb-24">
            <h1 className="mb-4 text-xl font-semibold text-gray-800">Neue Aktivität</h1>

            <div className="mb-6 flex justify-around rounded-full bg-white shadow">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`w-full py-2 text-sm font-medium rounded-full ${
                            activeTab === tab
                                ? tab === "Workout"
                                    ? "bg-gradient-to-r from-blue-400 to-blue-500 text-white"
                                    : "bg-gradient-to-r from-orange-400 to-orange-500 text-white"
                                : "bg-white text-gray-800"
                        }`}
                        onClick={() => setActiveTab(tab)}>
                        {tab}
                    </button>
                ))}
            </div>
            <div className="rounded-xl bg-white p-4 shadow">
                {activeTab === "Workout" ? <StartWorkout /> : <StartRun />}
            </div>
        </main>
    );
}
