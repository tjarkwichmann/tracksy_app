"use client";

import { useEffect, useState } from "react";
import {
    PencilIcon,
    FireIcon,
    AcademicCapIcon,
    RocketLaunchIcon,
    MapPinIcon,
    ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { changeWeeklyGoal } from "@/lib/actions";
import { useSession } from "next-auth/react";
import { fetchGoal, fetchProgress, goalTypes, formatDateFoDateType } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createUserGoal } from "@/lib/actions";
import useSWR from "swr";
import FrequencyDisplay from "./FrequencyDisplay";
import SelectGoal from "./SelectGoal";

/**
 *
 * @returns Komponente, die das wöchentliche Ziel eines Benutzers anzeigt und bearbeitet.
 * Diese Seite wird aufgerufen, wenn ein Benutzer sein Ziel anzeigen oder bearbeiten möchte.
 * Sie zeigt das aktuelle Ziel an, ermöglicht die Bearbeitung und das Speichern eines neuen Ziels.
 * Falls kein Ziel vorhanden ist, kann der Benutzer ein neues Ziel anlegen.
 */
export default function ShowGoal() {
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const router = useRouter();

    // Standardziel, falls kein Ziel vorhanden ist
    const defaultGoal = { type: "workout", frequency: 3 };

    const {
        data: goal,
        isLoading: loadingGoal,
        mutate: mutateGoal,
    } = useSWR(userId ? ["goal", userId] : null, ([, id]) => fetchGoal(id));

    const {
        data: currentCount = 0,
        isLoading: loadingProgress,
        mutate: mutateProgress,
    } = useSWR(userId && goal ? ["progress", userId, goal.type] : null, ([, id, type]) => fetchProgress(id, type));

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState(defaultGoal);

    useEffect(() => {
        if (goal) {
            setEditData(goal);
        } else {
            setEditData(defaultGoal);
        }
    }, [goal]);

    const handleSave = async () => {
        if (!userId) return;
        let goalType =
            editData.type === "läufe" ? "run_count" : editData.type === "workout" ? "workout_count" : "mixed_count";
        if (goal) {
            await changeWeeklyGoal(userId, goalType, editData.frequency);
        } else {
            console.log("Creating new goal:", userId, goalType, editData.frequency);
            await createUserGoal(userId, goalType, editData.frequency, formatDateFoDateType(new Date().toISOString()));
        }

        mutateGoal();
        mutateProgress();
        setIsEditing(false);
    };

    const handleCancel = () => {
        if (goal) {
            setEditData(goal);
        } else {
            setEditData(defaultGoal);
        }
        setIsEditing(false);
    };

    const getGoalTypeLabel = (type: string) => {
        return goalTypes.find((gt) => gt.value === type)?.label || type;
    };

    const getGoalIcon = (type: string) => {
        switch (type) {
            case "workout":
                return <RocketLaunchIcon className="h-6 w-6 text-blue-500" />;
            case "läufe":
                return <MapPinIcon className="h-6 w-6 text-green-500" />;
            case "beides":
                return <FireIcon className="h-6 w-6 text-orange-500" />;
            default:
                return <AcademicCapIcon className="h-6 w-6 text-gray-400" />;
        }
    };

    const progressPercentage = goal ? Math.min((currentCount / goal.frequency) * 100, 100) : 0;

    if (loadingGoal || loadingProgress) {
        return (
            <main className="min-h-screen flex items-center justify-center">
                <div>Lade Ziel...</div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 pb-24">
            <div className="mb-4 flex items-center gap-2">
                <ArrowLeftIcon
                    onClick={() => router.back()}
                    className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer"
                />
            </div>
            <div className="max-w-2xl mx-auto">
                <h1 className="mb-6 text-2xl font-bold text-gray-800">Mein Ziel</h1>

                <div className="rounded-2xl bg-white p-6 shadow-lg border border-gray-100">
                    {!goal && !isEditing ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <div className="text-lg font-semibold text-gray-700 mb-2">Noch kein Ziel angelegt</div>
                            <div className="text-gray-500 mb-6 text-center">
                                Lege jetzt dein wöchentliches Ziel fest, um deine Fortschritte besser zu verfolgen!
                            </div>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
                                Ziel anlegen
                            </button>
                        </div>
                    ) : isEditing ? (
                        <SelectGoal
                            goalTypes={goalTypes}
                            editData={editData}
                            setEditData={setEditData}
                            handleSave={handleSave}
                            handleCancel={handleCancel}
                            getGoalIcon={getGoalIcon}
                        />
                    ) : (
                        <div>
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-full p-3">{getGoalIcon(goal.type)}</div>
                                    <div>
                                        <h2 className="text-lg font-bold text-gray-800">
                                            {getGoalTypeLabel(goal.type)}
                                        </h2>
                                        <p className="text-sm text-gray-500">Dein wöchentliches Ziel</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                    <PencilIcon className="h-5 w-5" />
                                </button>
                            </div>

                            <FrequencyDisplay
                                goal={goal}
                                progressPercentage={progressPercentage}
                                currentCount={currentCount}
                                getGoalTypeLabel={getGoalTypeLabel}
                            />
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
