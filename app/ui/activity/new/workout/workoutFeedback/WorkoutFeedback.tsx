import { WorkoutExercise, SetWithSetId } from "@/lib/definitions";
import FeedBackFooter from "../../FeedBackFooter";
import WorkoutFeedbackBody from "./WorkoutFeedbackBody";
import WorkoutFeedbackHeader from "./WorkoutFeedbackHeader";
import { WorkoutProp } from "@/lib/definitions";

interface WorkoutFeedbackProps {
    isVisible: boolean;
    workout: {
        start_time: string;
        end_time: string;
        duration: number;
        xp_earned: number;
        user_id: number;
        sets: SetWithSetId[];
    };
    earnedBadges?: {
        id: string;
        title: string;
        description: string;
        xp_reward: number;
        type: string;
    }[];
    exercises: WorkoutExercise[];
}

/**
 *
 * @param param0 - Props für die WorkoutFeedback-Komponente
 * @param param0.isVisible - Steuert die Sichtbarkeit des Feedback-Popups
 * @param param0.workout - Enthält die Details des Workouts, einschließlich Start- und Endzeit, Dauer, verdienten XP und Benutzer-ID
 * @param param0.earnedBadges - Enthält die verdienten Badges des Benutzers, die im Feedback angezeigt werden
 * @param param0.exercises - Enthält die Übungen, die im Workout durchgeführt wurden,
 *                             einschließlich Name, Beschreibung, Sätze und Wiederholungen
 * @returns Komponente die das Feedback für das Workout anzeigt
 */
export default function WorkoutFeedback({ isVisible, workout, exercises, earnedBadges }: WorkoutFeedbackProps) {
    return (
        isVisible && (
            <div className="fixed inset-0 bg-gray-300 flex items-center space-y-3 justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden">
                    <WorkoutFeedbackHeader workout={workout} />

                    <WorkoutFeedbackBody workout={workout} exercises={exercises} earnedBadges={earnedBadges} />

                    <FeedBackFooter />
                </div>
            </div>
        )
    );
}
