"use client";

import {
    CheckBadgeIcon,
    XMarkIcon,
    ClockIcon,
    MapIcon,
    TrophyIcon,
    FireIcon,
    BoltIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

type RunFeedbackHeaderProps = {
    run: {
        duration: number;
        distance: number;
        average_speed: number;
        xp_earned: number;
    };
};

/**
 *
 * @param param0 - Props für die RunFeedbackHeader-Komponente
 * @param param0.run - Enthält die Details des Laufs, einschließlich Dauer, Distanz, durchschnittlicher Geschwindigkeit und verdienten XP
 * @returns JSX-Komponente, die den Header des Feedbacks für den Lauf anzeigt
 * Zeigt kurz die Distanz, Dauer, durchschnittliche Geschwindigkeit und verdienten XP an.
 */
export default function RunFeedbackHeader({ run }: RunFeedbackHeaderProps) {
    const router = useRouter();

    return (
        <div className="bg-gradient-to-r from-orange-300 to-orange-400 p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-white bg-opacity-20 p-3 rounded-full">
                            <CheckBadgeIcon className="h-8 w-8 text-orange-500" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Lauf beendet!</h2>
                            <p className="text-blue-100">Starke Leistung!</p>
                        </div>
                    </div>
                    <button
                        onClick={() => router.back()}
                        className="text-white hover:text-blue-200 transition-colors p-1">
                        <XMarkIcon className="h-6 w-6" />
                    </button>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <ClockIcon className="h-5 w-5 mr-1" />
                        </div>
                        <div className="text-2xl font-bold">{Math.floor(run.duration / 60)}</div>
                        <div className="text-sm text-blue-100">Minuten</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <MapIcon className="h-5 w-5 mr-1" />
                        </div>
                        <div className="text-2xl font-bold">{run.distance}</div>
                        <div className="text-sm text-blue-100">km</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <BoltIcon className="h-5 w-5 mr-1" />
                        </div>
                        <div className="text-2xl font-bold">{run.average_speed.toFixed(2)}</div>
                        <div className="text-sm text-blue-100">Pace</div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center justify-center mb-1">
                            <FireIcon className="h-5 w-5 mr-1" />
                        </div>
                        <div className="text-2xl font-bold">{run.xp_earned}</div>
                        <div className="text-sm text-blue-100">XP</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
