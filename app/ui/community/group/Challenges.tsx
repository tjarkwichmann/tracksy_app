import { TrophyIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { getGroupById } from "@/lib/data/groups";

interface ChallengesProps {
    isGroupView: boolean;
    challenges: {
        id: string;
        title: string;
        descrciption: string;
        type: "run_distance" | "run_count" | "workout_count" | "mixed_count" | "xp";
        target_value: number;
        start_date: string;
        end_date: string;
        group_id: number;
        challenge_progress: {
            user_Id: number;
            progress: number;
            last_updated: string;
            challenge_id: number;
        }[];
    }[];
}

function getGroupName(groupId: string): Promise<string> {
    return getGroupById(groupId).then((group) => group.name);
}

/**
 *
 * @param param0 - Props für die Challenges-Komponente
 * @param param0.challenges - Liste der aktiven Challenges, die angezeigt werden sollen
 * @param param0.isGroupView - Steuert, ob die Komponente von der Gruppenseite oder vom Dashboard aus aufgerufen wird
 * @returns Komponente, die eine Liste aktiver Challenges anzeigt. Challenges werden als kleine Card angezeigt.
 */
export default function Challenges({ challenges, isGroupView }: ChallengesProps) {
    return challenges.length > 0 ? (
        <div className="rounded-2xl  p-2 shadow-lg flex flex-col gap-4 border border-blue-100 ">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                    <TrophyIcon className="w-6 h-6 text-orange-500" />
                </div>
                <h2 className="text-md font-bold tracking-tight">Aktive Challenges</h2>
            </div>
            {challenges.map((challenge) => {
                let challengeProgress: number;
                let percent: number;

                if (!challenge.challenge_progress) {
                    console.warn(`Challenge ${challenge.id} has no progress data.`);
                    challengeProgress = 0;
                    percent = 0;
                } else {
                    challengeProgress = challenge.challenge_progress.map((p) => p.progress).reduce((a, b) => a + b, 0);
                    percent = Math.min((challengeProgress / challenge.target_value) * 100, 100);
                }

                return (
                    <div
                        key={challenge.id}
                        className="p-4 bg-white rounded-lg shadow-sm hover:scale-[1.01] transition-all duration-300">
                        <Link href={`/community/group/challenge/${challenge.id}`} className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-semibold">{challenge.title}</h3>
                                {!isGroupView && (
                                    <span className="text-sm text-gray-500">
                                        {getGroupName(challenge.group_id.toString())}
                                    </span>
                                )}
                            </div>
                            <div className="text-base text-gray-700 font-medium">
                                <span className="block">{challenge.title}</span>
                                <span className="text-sm text-gray-500 font-normal">{challenge.descrciption}</span>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-xs text-gray-400">
                                        {new Date(challenge.start_date).toLocaleDateString()} -{" "}
                                        {new Date(challenge.end_date).toLocaleDateString()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 mt-2">
                                <div className="flex justify-between items-center text-sm font-semibold text-gray-700">
                                    <span className="text-xs text-gray-500">{percent.toFixed(0)}%</span>
                                </div>
                                <div className="relative h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                                    <div
                                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-orange-600 rounded-full transition-all duration-500"
                                        style={{ width: `${percent}%` }}
                                    />
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    ) : (
        <div className="rounded-2xl bg-gradient-to-br from-blue-50 to-white p-4 shadow-lg flex flex-col items-center gap-4 border border-blue-100">
            <TrophyIcon className="w-12 h-12 text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900">Keine aktiven Challenges</h2>
            <p className="text-sm text-gray-500">Tritt einer Gruppe bei, um an spannenden Challenges teilzunehmen!</p>
        </div>
    );
}
