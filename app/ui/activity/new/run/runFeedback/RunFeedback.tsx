"use client";
import FeedBackFooter from "../../FeedBackFooter";
import RunFeedbackBody from "./RunFeedbackBody";
import RunFeedbackHeader from "./RunFeedbackHeader";
import { RoutePoint } from "@/lib/definitions";

interface RunFeedbackProps {
    isVisible: boolean;
    run: {
        start_time: string;
        end_time: string;
        duration: number;
        distance: number;
        xp_earned: number;
        average_speed: number;
        user_id: number;
        route?: RoutePoint[];
    };
    earnedBadges?: {
        id: string;
        title: string;
        description: string;
        xp_reward: number;
        type: string;
    }[];
}

/**
 *
 * @param param0 - Props für die RunFeedback-Komponente
 * @param param0.isVisible - Steuert die Sichtbarkeit des Feedback-Popups
 * @param param0.run - Enthält die Details des Laufs, einschließlich Start- und Endzeit, Dauer, Distanz, verdienten XP und durchschnittlicher Geschwindigkeit
 * @param param0.earnedBadges - Enthält die verdienten Badges des Benutzers, die im Feedback angezeigt werden sollen
 * @returns JSX-Komponente, die das Feedback für den Lauf anzeigt
 */
export default function RunFeedback({ isVisible, run, earnedBadges }: RunFeedbackProps) {
    return (
        isVisible && (
            <div className="fixed inset-0 bg-gray-300 bg-opacity-60 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
                    <RunFeedbackHeader run={run} />

                    <RunFeedbackBody run={run} earnedBadges={earnedBadges} />

                    <FeedBackFooter />
                </div>
            </div>
        )
    );
}
