"use client";

import { ArrowLeftIcon, TrophyIcon } from "@heroicons/react/24/outline";
import { TrophyIcon as TrophyIconSolid } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { formatDateWithDayAndTime } from "@/lib/utils";

type ChallengeDetailsProbs = {
    challenge: {
        id: string;
        title: string;
        description: string;
        type: string;
        target_value: number;
        start_date: string;
        end_date: string;
        challenge_progress: {
            user_id: string;
            progress: number;
            last_updated: string;
            user: {
                id: string;
                name: string;
            };
        }[];
    };
};

/**
 *
 * @param param0 - Props für die ChallengeDetails-Komponente
 * @param param0.challenge - Die Challenge, deren Details angezeigt werden sollen
 * @returns Komponente, die die Details einer Challenge anzeigt
 */
export default function ChallengeDetails({ challenge }: ChallengeDetailsProbs) {
    const router = useRouter();

    const challengeType = () => {
        switch (challenge.type) {
            case "run_distance":
                return "Laufdistanz";
            case "run_count":
                return "Laufanzahl";
            case "workout_count":
                return "Workoutanzahl";
            case "mixed_count":
                return "Gemischte Anzahl";
            default:
                return "XP";
        }
    };

    const challengeUnit = () => {
        switch (challenge.type) {
            case "run_distance":
                return "km";
            case "run_count":
                return "Läufe";
            case "workout_count":
                return "Workouts";
            default:
                return "XP";
        }
    };

    const handleBack = () => {
        router.back();
    };

    if (!challenge) {
        return (
            <div className="rounded-xl bg-white p-4 shadow flex flex-col gap-2">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    const sortedProgress = [...challenge.challenge_progress].sort((a, b) => b.progress - a.progress);

    const rankColors = ["text-yellow-400", "text-gray-400", "text-orange-400"];

    return (
        <div className="rounded-2xl bg-gradient-to-r from-white to-blue-50 p-4 shadow-lg max-w-3xl mx-auto border border-blue-100 flex flex-col gap-6">
            <div className="flex items-center gap-3">
                <button
                    onClick={handleBack}
                    className="p-2 rounded-full bg-white hover:bg-blue-50 hover:cursor-pointer">
                    <ArrowLeftIcon className="w-6 h-6 text-blue-600" />
                </button>
                <div className="w-10 h-10 rounded-full  flex items-center justify-center">
                    <TrophyIcon className="w-6 h-6 text-orange-500" />
                </div>
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">{challenge.title}</h1>
            </div>
            <p className="text-gray-700">{challenge.description}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span>{challengeType()}</span>
                <span>
                    Ziel:{" "}
                    <span className="font-semibold text-gray-700">
                        {challenge.target_value} {challengeUnit()}
                    </span>
                </span>
                <span>
                    Zeitraum: {new Date(challenge.start_date).toLocaleDateString()} –{" "}
                    {new Date(challenge.end_date).toLocaleDateString()}
                </span>
            </div>
            <div className="flex flex-col gap-4">
                {sortedProgress.map((progress, idx) => {
                    const percent = Math.min((progress.progress / challenge.target_value) * 100, 100);
                    const rank = idx + 1;
                    const rankStyle = "bg-gray-50 text-gray-700";
                    return (
                        <div
                            key={progress.user_id}
                            className={`p-4 ${rankStyle} rounded-lg shadow-sm flex flex-col gap-2 border border-gray-100`}>
                            <div className="flex justify-between items-center">
                                <div className={`flex items-center gap-2 `}>
                                    <span className="w-7 h-7 rounded-full font-bold flex items-center justify-center">
                                        {rank <= 3 ? (
                                            <TrophyIconSolid className={`${rankColors[rank - 1]} w-5 h-5`} />
                                        ) : (
                                            <span className="text-gray-500">{rank}</span>
                                        )}
                                    </span>

                                    <h2 className="text-base font-semibold text-gray-800">{progress.user.name}</h2>
                                </div>
                                <span className="text-xs text-gray-500">{percent.toFixed(0)}%</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-medium text-gray-700">
                                <span>
                                    Erreicht: {progress.progress} {challengeUnit()}
                                </span>
                                <span className="text-xs text-gray-400">
                                    Letztes Update: {formatDateWithDayAndTime(progress.last_updated)}
                                </span>
                            </div>
                            <div className="relative h-3 w-full bg-gray-200 rounded-full overflow-hidden mt-1">
                                <div
                                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500"
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
