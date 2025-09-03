import { useEffect, useState } from "react";
import { XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";
import useSWR from "swr";
import { getUserWorkouts } from "@/lib/data/workouts";
import { getUserRuns } from "@/lib/data/runs";
import { getUserGroups } from "@/lib/data/groups";
import { useSession } from "next-auth/react";
import ActivitySelection from "./ActivitySelection";
import PostTypeSelector from "./PostTypeSelector";
import GroupSelection from "./GroupSelection";
import { createPost } from "@/lib/actions";

type AddPostPopUpProps = {
    isVisible: boolean;
    setIsVisible?: (visible: boolean) => void;
    onPostCreated?: () => void;
};

/**
 *
 * @param param0 - Props für die AddPostPopUp-Komponente
 * @param param0.isVisible - Steuert die Sichtbarkeit des Popups
 * @param param0.setIsVisible - Funktion zum Setzen der Sichtbarkeit des Popups
 * @param param0.onPostCreated - Callback-Funktion, die aufgerufen wird, wenn ein neuer Post erstellt wurde
 * @returns  Komponente, die ein Popup anzeigt, um einen neuen Post zu erstellen
 * PopUp wird übe den Add-Button im Commutity-Bereich geöffnet
 */
export default function AddPostPopUp({ isVisible, setIsVisible, onPostCreated }: AddPostPopUpProps) {
    const [postText, setPostText] = useState("");
    const [selectedType, setSelectedType] = useState("text" as "text" | "workout" | "run");
    const [selectedGroup, setSelectedGroup] = useState<{
        name: string;
        description: string;
        owner_id: string;
        id: string;
    } | null>(null);
    const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
    const [selectedRun, setSelectedRun] = useState<any>(null);
    const { data: session } = useSession();
    const userId = session?.user?.id || "";

    const [workoutIsOpen, setWorkoutIsOpen] = useState(false);
    const [runIsOpen, setRunIsOpen] = useState(false);
    const [groupIsOpen, setGroupIsOpen] = useState(false);

    const { data: runs = [] } = useSWR(userId ? ["runs", userId] : null, () =>
        getUserRuns(userId).then((runs) =>
            runs.sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
        )
    );
    const { data: workouts = [] } = useSWR(userId ? ["workouts", userId] : null, () =>
        getUserWorkouts(userId).then((workouts) =>
            workouts.sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
        )
    );
    const { data: groups = [] } = useSWR(userId ? ["groups", userId] : null, () => getUserGroups(userId));

    const handleAddPost = () => {
        const postData = {
            user_id: userId,
            content: postText,
            group_id: selectedGroup ? selectedGroup.id : null,
            workout_id: selectedType === "workout" ? selectedWorkout?.id : undefined,
            run_id: selectedType === "run" ? selectedRun?.id : undefined,
            created_at: new Date().toISOString(),
        };

        createPost(postData)
            .then(() => {
                setPostText("");
                setSelectedType("text");
                setSelectedGroup(null);
                setSelectedWorkout(null);
                setSelectedRun(null);
                onPostCreated?.();
                setIsVisible?.(false);
            })
            .catch((error) => {
                console.error("Fehler beim Erstellen des Posts:", error);
            });
    };

    useEffect(() => {
        setSelectedWorkout(null);
        setSelectedRun(null);
    }, [selectedType]);

    return (
        isVisible && (
            <div className="fixed inset-0 bg-gray-300 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white mb-20 rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[80vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100">
                        <h2 className="text-2xl font-semibold text-gray-900">Neuen Post erstellen</h2>
                        <button onClick={() => {}} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                            <XMarkIcon className="text-gray-500" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6">
                        <PostTypeSelector selectedType={selectedType} setSelectedType={setSelectedType} />

                        {/* Post Content */}
                        <div className="space-y-3">
                            <label className="text-sm font-medium text-gray-700">Was möchtest du teilen?</label>
                            <textarea
                                value={postText}
                                onChange={(e) => setPostText(e.target.value)}
                                placeholder="Schreibe hier deine Gedanken..."
                                className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                rows={4}
                            />
                            <div className="text-right text-sm text-gray-400">{postText.length}/280</div>
                        </div>

                        {selectedType === "workout" && (
                            <ActivitySelection
                                activities={workouts}
                                isOpen={workoutIsOpen}
                                setIsOpen={setWorkoutIsOpen}
                                selected={selectedWorkout}
                                setSelected={setSelectedWorkout}
                                type="Workout"
                            />
                        )}

                        {selectedType === "run" && (
                            <ActivitySelection
                                activities={runs}
                                isOpen={runIsOpen}
                                setIsOpen={setRunIsOpen}
                                selected={selectedRun}
                                setSelected={setSelectedRun}
                                type="Lauf"
                            />
                        )}

                        <GroupSelection
                            groups={groups}
                            isOpen={groupIsOpen}
                            setIsOpen={setGroupIsOpen}
                            selectedGroup={selectedGroup}
                            setSelectedGroup={setSelectedGroup}
                        />
                    </div>

                    {/* Footer */}
                    <div className="flex justify-between items-center p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl">
                        <button
                            onClick={() => {
                                setIsVisible?.(false);
                            }}
                            className="px-6 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors">
                            Abbrechen
                        </button>
                        <button
                            onClick={handleAddPost}
                            disabled={!postText.trim()}
                            className="px-8 py-2.5 bg-gradient-to-r from-blue-400 to-blue-500 text-white font-medium rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-2">
                            <PlusIcon className="w-6 h-6" />
                            <span>Post erstellen</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}
