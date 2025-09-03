import { useMemo } from "react";
import WorkoutPreviewSetsAndExcersises from "./WorkoutPreviewSetAndExcercises";
import { SetWithoutSetId, WorkoutProp } from "@/lib/definitions";

type WorkoutPreviewProps = {
    workout: WorkoutProp["workout"];
};

export default function WorkoutPreviewBody({ workout }: WorkoutPreviewProps) {
    const exerciseMap = useMemo(() => {
        const map: { [exerciseId: string]: SetWithoutSetId[] } = {};
        workout.sets.forEach((set) => {
            if (!map[set.exercise_id]) map[set.exercise_id] = [];
            map[set.exercise_id].push(set);
        });
        return map;
    }, [workout.sets]);

    const exerciseIds = Object.keys(exerciseMap);
    const exerciseCount = exerciseIds.length;

    const totalSets = workout.sets.length;
    return (
        <section className="p-4">
            <div className="flex items-center justify-between mb-4">
                <div className="flex space-x-6">
                    <div className="text-center">
                        <div className="text-lg font-bold">{`${workout.duration} min`}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Dauer</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold ">{totalSets}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">Sätze</div>
                    </div>
                    <div className="text-center">
                        <div className="text-lg font-bold text-blue-500">{workout.xp_earned}</div>
                        <div className="text-xs text-gray-500 uppercase tracking-wide">XP</div>
                    </div>
                </div>
            </div>

            <WorkoutPreviewSetsAndExcersises exerciseIds={exerciseIds} exerciseMap={exerciseMap} />
        </section>
    );
}
