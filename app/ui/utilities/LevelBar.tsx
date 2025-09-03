"use client";

import { getNextLevelXp, getProgressToNextLevel, getUserLevel } from "@/lib/utils";

type UserData = {
    name: string;
    level: number;
    xp: number;
};

type LevelBarProps = {
    userData: UserData;
};

export default function LevelBar({ userData }: LevelBarProps) {
    const progress = getProgressToNextLevel(userData.xp);
    const nextLevelXp = getNextLevelXp(userData.xp);
    const level = getUserLevel(userData.xp);

    if (!userData) {
        return (
            <div className="rounded-xl bg-white p-4 shadow flex flex-col gap-2">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    return (
        <div className="rounded-xl bg-gradient-to-r from-white to-orange-50 p-4 shadow flex flex-col gap-2">
            <div className="flex justify-between text-sm text-gray-700 font-semibold">
                <span>Level {level}</span>
                <span>{userData.xp} XP</span>
            </div>
            <div className="h-3 w-full bg-gray-200 rounded-full">
                <div
                    className="h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                />
            </div>
            {nextLevelXp > 0 && (
                <div className="text-xs text-gray-500 text-center">{nextLevelXp} XP bis zum nächsten Level</div>
            )}
        </div>
    );
}
