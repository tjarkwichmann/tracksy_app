"use client";
import BadgeHeader from "@/ui/profile/badges/BadgeHeader";
import BadgeSection from "@/ui/profile/badges/BadgeSection";
import BadgeStats from "@/ui/profile/badges/BadgeStats";
import { getBadgeIcon } from "@/lib/utils";
import { getAllBadges, getUserBadges } from "@/lib/data/badges";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/**
 *
 * @returns Komponente, die alle Abzeichen eines Benutzers anzeigt
 * Diese Seite wird aufgerufen, wenn ein Benutzer seine Abzeichen anzeigen möchte.
 * Wird auch für die Anzeige der neu verdienten Abzeichen verwendet im Feedback von Aktivitäten verwendet.
 */
export default function ShowBadges() {
    const { data: session } = useSession();
    const userId = session?.user?.id;

    const router = useRouter();
    const [achievedBadges, setAchievedBadges] = useState([]);
    const [lockedBadges, setLockedBadges] = useState([]);

    const handleBackClick = () => {
        router.back();
    };

    useEffect(() => {
        const fetchBadges = async () => {
            try {
                const badges = await getAllBadges();
                const earnedBadges = await getUserBadges(userId);

                const badgesWithEarnedStatus = badges.map((badge) => {
                    const isEarned = earnedBadges.some((earnedBadge) => earnedBadge.id === badge.id);
                    return { ...badge, earned: isEarned };
                });
                setAchievedBadges(badgesWithEarnedStatus.filter((badge) => badge.earned));
                setLockedBadges(badgesWithEarnedStatus.filter((badge) => !badge.earned));
            } catch (error) {
                console.error("Error fetching badges:", error);
            }
        };
        fetchBadges();
    }, [userId]);

    return (
        <main className="min-h-screen bg-gray-50 p-4">
            <BadgeHeader onBackClick={handleBackClick} />

            <BadgeStats
                achievedCount={achievedBadges.length}
                totalXP={achievedBadges.reduce((sum, badge) => sum + badge.xp_reward, 0)}
            />

            <BadgeSection
                title="Verdiente Abzeichen"
                badges={achievedBadges}
                getBadgeIcon={getBadgeIcon}
                isLocked={false}
            />

            <BadgeSection
                title="Kommende Abzeichen"
                badges={lockedBadges}
                getBadgeIcon={getBadgeIcon}
                isLocked={true}
            />
        </main>
    );
}
