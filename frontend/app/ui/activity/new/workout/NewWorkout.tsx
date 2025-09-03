"use client";

import { useEffect, useState } from "react";
import { Exercise, WorkoutExercise, SetWithSetId } from "@/lib/definitions";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { createWorkout } from "@/lib/actions";
import { useSession } from "next-auth/react";
import WorkoutFeedback from "@/ui/activity/new/workout/workoutFeedback/WorkoutFeedback";
import WorkoutTrackerHeader from "./WorkoutTrackerHeader";
import DateAndTimeDisplay from "./DateAndTimeDisplay";
import ExerciseList from "./ExerciseList";
import CancelPopUp from "../CancelPopUp";
import ExerciseSelectionPopup from "./ExerciseSelectionPopup";
import SavePopUp from "../SavePopUp";
import { getAllExercises } from "@/lib/data/excercises";
import useSWR from "swr";

interface NewWorkoutProps {
    exercises?: Exercise[];
}

/**
 *
 * @param param0 - Props für die NewWorkout-Komponente
 * @param param0.exercises - Optionales Array von Übungen, die im Workout verwendet werden. Falls nicht in Server-Kompenten geladen, wird es hier als Fallback verwendet.
 * @returns Komponente für die Erstellung eines neuen Workouts
 */
export default function NewWorkout({ exercises: initialExercises }: NewWorkoutProps) {
    const { data: session } = useSession();

    const { data: exercises = initialExercises || [] } = useSWR("exercises", getAllExercises, {
        fallbackData: initialExercises || [],
    });

    const [showSavePopup, setShowSavePopup] = useState(false);
    const [startTime, setStartTime] = useState<Date | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [elapsed, setElapsed] = useState("00:00");
    const [workoutExercises, setWorkoutExercises] = useState<WorkoutExercise[]>([]);
    const [showExercisePopup, setShowExercisePopup] = useState(false);
    const [workoutWasSaved, setWorkoutWasSaved] = useState(false);
    const [earnedBadges, setEarnedBadges] = useState([]);

    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const [showFeedbackPopup, setShowFeedbackPopup] = useState(false);
    const [duration, setDuration] = useState(0);

    if (!session || !session.user) {
        return <div>Sie müssen angemeldet sein, um ein Workout zu starten.</div>;
    }

    useEffect(() => {
        const start = new Date();
        setStartTime(start);

        const interval = setInterval(() => {
            const now = new Date();
            const diff = Math.floor((now.getTime() - start.getTime()) / 1000);
            const minutes = String(Math.floor(diff / 60)).padStart(2, "0");
            const seconds = String(diff % 60).padStart(2, "0");
            setElapsed(`${minutes}:${seconds}`);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const today = new Date().toLocaleDateString("de-DE", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
    });

    const addExercise = (exerciseFromDb: Exercise) => {
        const newWorkoutExercise: WorkoutExercise = {
            id: Date.now().toString(),
            exerciseId: exerciseFromDb.id,
            name: exerciseFromDb.name,
            sets: [
                {
                    id: Date.now().toString(),
                    exercise_id: exerciseFromDb.id,
                    weight: 0,
                    reps: 0,
                },
            ],
        };
        setWorkoutExercises([...workoutExercises, newWorkoutExercise]);
        setShowExercisePopup(false);
        setSearchTerm("");
    };

    const removeExercise = (exerciseId: string) => {
        setWorkoutExercises(workoutExercises.filter((ex) => ex.id !== exerciseId));
    };

    const addSet = (exerciseId: string) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                if (exercise.id === exerciseId) {
                    const newSet: SetWithSetId = {
                        id: Date.now().toString(),
                        exercise_id: exercise.exerciseId,
                        weight: 0,
                        reps: 0,
                    };
                    return { ...exercise, sets: [...exercise.sets, newSet] };
                }
                return exercise;
            })
        );
    };

    const router = useRouter();

    const cancelWorkout = () => {
        setWorkoutExercises([]);
        setStartTime(null);
        setElapsed("00:00");
        setShowExercisePopup(false);
        router.back();
    };

    const removeSet = (exerciseId: string, setId: string) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                if (exercise.id === exerciseId) {
                    return { ...exercise, sets: exercise.sets.filter((set) => set.id !== setId) };
                }
                return exercise;
            })
        );
    };

    const updateSet = (
        exerciseId: string,
        setId: string,
        field: "weight" | "reps" | "completed",
        value: string | boolean
    ) => {
        setWorkoutExercises(
            workoutExercises.map((exercise) => {
                if (exercise.id === exerciseId) {
                    return {
                        ...exercise,
                        sets: exercise.sets.map((set) => {
                            if (set.id === setId) {
                                return { ...set, [field]: value };
                            }
                            return set;
                        }),
                    };
                }
                return exercise;
            })
        );
    };

    function calculateXp(workoutExercises: WorkoutExercise[], duration: number) {
        let totalSets = 0;
        let totalVolume = 0;

        workoutExercises.forEach((exercise) => {
            exercise.sets.forEach((set) => {
                const weight = set.weight || 0;
                const reps = set.reps || 0;
                totalSets += 1;
                totalVolume += weight * reps;
            });
        });

        const baseXp = totalSets * 5;
        const volumeXp = Math.floor(totalVolume / 100);
        const durationXp = Math.floor(duration / 120);

        return baseXp + volumeXp + durationXp;
    }

    const handleSaveWorkout = async (workoutExercises: WorkoutExercise[], startTime: Date | null) => {
        if (workoutExercises.length === 0 || !startTime) {
            alert("Fügen Sie mindestens eine Übung hinzu.");
            return;
        }

        const endTime = new Date();
        setDuration(Math.floor((endTime.getTime() - startTime.getTime()) / 1000));

        const allSets: Array<{
            exercise_id: number;
            weight: number;
            reps: number;
        }> = [];

        workoutExercises.forEach((exercise) => {
            exercise.sets.forEach((set) => {
                allSets.push({
                    exercise_id: parseInt(exercise.exerciseId),
                    weight: set.weight || 0,
                    reps: set.reps || 0,
                });
            });
        });

        const workoutData = {
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            duration,
            xp_earned: calculateXp(workoutExercises, duration),
            user_id: parseInt(session.user.id),
            sets: allSets,
        };

        try {
            const workout = await createWorkout(workoutData);
            setEarnedBadges(workout.badges || []);
            setShowSavePopup(false);
            setWorkoutWasSaved(true);
            setTimeout(() => setWorkoutWasSaved(false), 1000);
            setShowFeedbackPopup(true);
        } catch (error) {
            console.error("Fehler beim Speichern des Workouts:", error);
            alert("Fehler beim Speichern des Workouts. Bitte versuchen Sie es später erneut.");
        }
    };

    return (
        <main className="flex flex-col  items-center justify-center bg-gradient-to-br from-blue-50 to-gray-50 min-h-screen">
            <div className="flex rounded-t-lg min-h-screen text-sm flex-col p-6 pt-20 w-full max-w-lg">
                <WorkoutTrackerHeader showSavePopup={() => setShowSavePopup(true)} />
                <DateAndTimeDisplay today={today} elapsed={elapsed} />
                <ExerciseList
                    workoutExercises={workoutExercises}
                    removeExercise={removeExercise}
                    addSet={addSet}
                    removeSet={removeSet}
                    updateSet={updateSet}
                />

                {workoutWasSaved && (
                    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-white border border-blue-200 p-4 shadow-lg rounded-lg z-50">
                        <span className="text-lg font-semibold text-blue-800">✅ Workout erfolgreich gespeichert!</span>
                    </div>
                )}
                <button
                    onClick={() => setShowExercisePopup(true)}
                    className="mb-6 p-4 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg hover:from-blue-500 hover:to-blue-600 hover:cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 font-medium transform hover:scale-105">
                    <PlusIcon className="h-5 w-5" />
                    Übung hinzufügen
                </button>
                <button
                    onClick={() => setShowCancelPopup(true)}
                    className="mb-12 p-4 bg-gradient-to-r from-gray-400 to-gray-500 text-white rounded-lg hover:from-gray-500 hover:to-gray-600 hover:shadow-lg hover:cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 font-medium transform hover:scale-105">
                    Workout abbrechen
                </button>
                <SavePopUp
                    activityType="Workout"
                    isVisible={showSavePopup}
                    onCancel={() => setShowSavePopup(false)}
                    onConfirm={() => handleSaveWorkout(workoutExercises, startTime)}
                />
                <CancelPopUp
                    activityType="Workout"
                    isVisible={showCancelPopup}
                    onCancel={() => setShowCancelPopup(false)}
                    onConfirm={cancelWorkout}
                />
                <ExerciseSelectionPopup
                    isVisible={showExercisePopup}
                    exercises={exercises}
                    searchTerm={searchTerm}
                    onClose={() => {
                        setShowExercisePopup(false);
                        setSearchTerm("");
                    }}
                    onSearchChange={setSearchTerm}
                    onExerciseSelect={addExercise}
                />
                <WorkoutFeedback
                    earnedBadges={earnedBadges}
                    isVisible={showFeedbackPopup}
                    exercises={workoutExercises}
                    workout={{
                        start_time: startTime?.toISOString() || "",
                        end_time: new Date().toISOString(),
                        duration: duration,
                        xp_earned: calculateXp(workoutExercises, duration),
                        user_id: parseInt(session.user.id),
                        sets: workoutExercises.flatMap((ex) =>
                            ex.sets.map((set) => ({
                                id: set.id,
                                exercise_id: ex.exerciseId,
                                weight: set.weight,
                                reps: set.reps,
                            }))
                        ),
                    }}
                />
            </div>
        </main>
    );
}
