import { authOptions } from "@/api/auth/[...nextauth]/route";
import { getAllExercises } from "@/lib/data/excercises";
import NewWorkout from "@/ui/activity/new/workout/NewWorkout";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

/**
 *
 * @returns JSX-Komponente für die Erstellung eines neuen Workouts
 * Diese Seite wird aufgerufen, wenn ein Benutzer ein neues Workout erstellen möchte.
 * Fetched die Übungen aus der Datenbank und leitet den Benutzer zur Login-Seite weiter, wenn er nicht angemeldet ist.
 */
export default async function NewWorkoutPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/login");
    }

    let exercises = [];
    try {
        exercises = await getAllExercises();
    } catch (error) {
        exercises = [];
    }

    return <NewWorkout exercises={exercises} />;
}
