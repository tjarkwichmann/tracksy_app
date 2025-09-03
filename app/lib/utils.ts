import {
    TrophyIcon,
    FireIcon,
    BoltIcon,
    HeartIcon,
    SparklesIcon,
    RocketLaunchIcon,
    ShieldCheckIcon,
    LightBulbIcon,
    GlobeEuropeAfricaIcon,
    StarIcon,
} from "@heroicons/react/24/solid";
import { getCurrentWeekRuns } from "./data/runs";
import { getCurrentWeekWorkouts } from "./data/workouts";
import { getUserBadges, getAllBadges } from "./data/badges";
import { getUserGoal } from "./data/goals";

export const getBadgeIcon = (title) => {
    const iconMap = {
        "Erste Schritte": SparklesIcon,
        Starter: RocketLaunchIcon,
        Aktiv: BoltIcon,
        Motiviert: HeartIcon,
        Durchstarter: FireIcon,
        Centurion: ShieldCheckIcon,
        Dedication: TrophyIcon,
        Legende: GlobeEuropeAfricaIcon,

        "Gym Rookie": SparklesIcon,
        Kraftpaket: BoltIcon,
        "Iron Warrior": ShieldCheckIcon,
        "Muscle Builder": TrophyIcon,
        "Gym Hero": GlobeEuropeAfricaIcon,

        Laufanfänger: SparklesIcon,
        Jogger: BoltIcon,
        Runner: FireIcon,
        "Ausdauer-Ass": TrophyIcon,
        "Marathon-Mindset": GlobeEuropeAfricaIcon,

        "Streak Starter": FireIcon,
        Gewohnheit: BoltIcon,
        Routine: HeartIcon,
        Beständigkeit: ShieldCheckIcon,
        "Quartal-Champion": TrophyIcon,
        "Halbjahres-Held": GlobeEuropeAfricaIcon,
        "Jahres-Legende": GlobeEuropeAfricaIcon,

        "Comeback Kid": LightBulbIcon,
        Perfectionist: StarIcon,
    };

    return iconMap[title] || TrophyIcon;
};

export function getUserLevel(xp: number): number {
    const level = Math.floor(xp / 1000) + 1;
    return level < 1 ? 1 : Math.floor(level);
}

export function getNextLevelXp(xp: number): number {
    const level = getUserLevel(xp);
    const nextLevelXp = level * 1000;
    return nextLevelXp - xp;
}

export function getProgressToNextLevel(xp: number): number {
    const level = getUserLevel(xp);
    const nextLevelXp = getNextLevelXp(xp);
    const currentLevelXp = (level - 1) * 1000;

    if (nextLevelXp <= 0) {
        return 100;
    }

    const progress = ((xp - currentLevelXp) / nextLevelXp) * 100;
    return Math.min(Math.max(progress, 0), 100);
}

export async function getBadgeProgress(userId: string): Promise<[number, number]> {
    try {
        const badges = await getAllBadges();
        const earnedBadges = await getUserBadges(userId);

        const badgesWithEarnedStatus = badges.map((badge) => {
            const isEarned = earnedBadges.some((earnedBadge) => earnedBadge.id === badge.id);
            return { ...badge, earned: isEarned };
        });

        const achievedBadges = badgesWithEarnedStatus.filter((badge) => badge.earned);

        return [achievedBadges.length, badgesWithEarnedStatus.length];
    } catch (error) {
        console.error("Error fetching badges:", error);
        return [0, 0];
    }
}

export function formatDateWithDayAndTime(dateString): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Ungültiges Datum";
    }

    return date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatTimeWithHourAndMinute(dateString: string) {
    return new Date(dateString).toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function formatDateWithDay(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "Ungültiges Datum";
    }

    return date.toLocaleDateString("de-DE", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

export function formatDateFoDateType(dateString: string): string {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return "";
    }

    return date.toISOString().split("T")[0];
}

export function getDurationInMinutes(startime, endtime): string {
    const start = new Date(startime);
    const end = new Date(endtime);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return "Ungültige Zeitangabe";
    }

    const durationInMs = end.getTime() - start.getTime();
    const durationInMinutes = Math.floor(durationInMs / 60000);

    return `${durationInMinutes} Minuten`;
}

export const fetchGoal = async (userId: string) => {
    const dbGoal = await getUserGoal(userId);
    if (!dbGoal) return null;
    return {
        type: dbGoal.goal_type === "run_count" ? "läufe" : dbGoal.goal_type === "workout_count" ? "workout" : "beides",
        frequency: dbGoal.target_value,
    };
};

export const fetchProgress = async (userId: string, type: string) => {
    if (type === "workout") {
        const workouts = await getCurrentWeekWorkouts(userId);
        return workouts.length;
    } else if (type === "läufe") {
        const runs = await getCurrentWeekRuns(userId);
        return runs.length;
    } else if (type === "beides") {
        const workouts = await getCurrentWeekWorkouts(userId);
        const runs = await getCurrentWeekRuns(userId);
        return workouts.length + runs.length;
    }
    return 0;
};

export const fetchBadges = async (userId: string) => {
    const badges = await getAllBadges();
    const earnedBadges = await getUserBadges(userId);
    const badgesWithEarnedStatus = badges.map((badge) => {
        const isEarned = earnedBadges.some((earnedBadge) => earnedBadge.id === badge.id);
        return { ...badge, earned: isEarned };
    });
    return {
        achievedBadges: badgesWithEarnedStatus.filter((badge) => badge.earned),
        lockedBadges: badgesWithEarnedStatus.filter((badge) => !badge.earned),
    };
};

export const goalTypes = [
    { value: "workout", label: "Workout" },
    { value: "läufe", label: "Läufe" },
    { value: "beides", label: "Beides" },
];

export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Erdradius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}
