"use client";

import { CheckCircleIcon, SparklesIcon } from "@heroicons/react/24/outline";

type StatCardProps = {
    label: string;
    progress: [number, number];
    icon: "goal" | "badge";
};

/**
 *
 * @param param0 - Props für die StatCard-Komponente
 * @param param0.label - Beschriftung der Karte
 * @param param0.progress - Fortschritt als Tupel [aktueller Wert, maximaler Wert]
 * @param param0.icon - Symboltyp, entweder "goal" für CheckCircleIcon oder "badge" für SparklesIcon
 * @returns Zeigt die Fortschrittsstatistik an.
 */
export default function StatCard({ label, progress, icon }: StatCardProps) {
    const IconComponent = icon === "goal" ? CheckCircleIcon : SparklesIcon;

    return (
        <div className="flex-1 rounded-xl bg-gradient-to-r from-white to-blue-50 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-gray-700 mb-2">
                <IconComponent className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-semibold">{label}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-200">
                <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300"
                    style={{
                        width: `${progress[1] === 0 ? 0 : Math.min(100, Math.round((progress[0] / progress[1]) * 100))}%`,
                    }}></div>
            </div>
            <p className="mt-1 text-xs text-gray-500 text-right">
                {progress[0]}/{progress[1]}
            </p>
        </div>
    );
}
