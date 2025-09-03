"use client";

import { useState } from "react";

export default function Page() {
    const [selectedRange, setSelectedRange] = useState<"Woche" | "Monat" | "Jahr">("Woche");

    // Platzhalter-Daten
    const stats = {
        Woche: { workouts: 3, runs: 2, duration: 180 },
        Monat: { workouts: 12, runs: 6, duration: 720 },
        Jahr: { workouts: 86, runs: 45, duration: 4300 },
    };

    const current = stats[selectedRange];

    return (
        <main className="min-h-screen bg-gray-50 p-4 pb-24">
            <h1 className="mb-4 text-xl font-semibold text-gray-800">Deine Statistiken</h1>

            {/* Zeitbereichsauswahl */}
            <div className="mb-6 flex justify-around rounded-full bg-white shadow">
                {(["Woche", "Monat", "Jahr"] as const).map((range) => (
                    <button
                        key={range}
                        className={`w-full py-2 text-sm font-medium rounded-full ${
                            selectedRange === range ? "bg-blue-500 text-white" : "text-gray-600 hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedRange(range)}>
                        {range}
                    </button>
                ))}
            </div>

            {/* Statistiken */}
            <section className="space-y-4">
                <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Gesamtdauer</h2>
                    <p className="text-sm text-gray-500">{current.duration} Minuten</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Workouts</h2>
                    <p className="text-sm text-gray-500">{current.workouts} Workouts absolviert</p>
                </div>

                <div className="rounded-lg bg-white p-4 shadow">
                    <h2 className="text-lg font-semibold text-gray-700">Läufe</h2>
                    <p className="text-sm text-gray-500">{current.runs} Läufe abgeschlossen</p>
                </div>
            </section>
        </main>
    );
}
