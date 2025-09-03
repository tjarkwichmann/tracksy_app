import StatCard from "@/ui/dashboard/StatCard";
import LevelBar from "@/ui/utilities/LevelBar";
import { getUserById } from "@/lib/data/user";
import { getUserWorkouts } from "@/lib/data/workouts";
import { getUserRuns } from "@/lib/data/runs";
import { getUserLevel } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { getBadgeProgress } from "@/lib/utils";
import { getUserChallenges, getChallengeProgressByChallengeId } from "@/lib/data/challenges";
import Challenges from "@/ui/community/group/Challenges";
import RunPreview from "@/ui/utilities/activityPreview/runPreview/RunPreview";
import WorkoutPreview from "@/ui/utilities/activityPreview/workoutPreview/WorkoutPreview";
import { SparklesIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import { fetchGoal, fetchProgress, fetchBadges } from "@/lib/utils";
import Link from "next/link";

/**
 *
 * @returns JSX-Komponente für die Startseite des Dashboards
 * Diese Seite zeigt dem Benutzer seine Fortschritte, Ziele und Aktivitäten an.
 * Wenn der Benutzer nicht angemeldet ist, wird er auf die Login-Seite weitergeleitet.
 * Die Seite enthält Statistiken zu Zielen, Badges und Aktivitäten sowie eine Liste der
 * letzten Aktivitäten des Benutzers.
 */
export default async function HomePage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/login");
    }

    const userId = session.user.id;

    if (!userId) {
        return (
            <main className="flex flex-col gap-6 px-4 py-6 pb-24 bg-gray-50 min-h-screen">
                <section>
                    <h1 className="text-2xl font-semibold text-gray-900">Bitte anmelden </h1>
                    <p className="text-sm text-gray-500">Um deine Daten zu sehen, musst du dich anmelden.</p>
                </section>
            </main>
        );
    }

    const [workouts, user, runs, groups] = await Promise.all([
        getUserWorkouts(userId).catch(() => {
            return [];
        }),
        getUserById(userId).catch(() => {
            return { name: "", level: 0, xp: 0 };
        }),
        getUserRuns(userId).catch(() => {
            return [];
        }),
        getUserChallenges(userId).catch(() => {
            return [];
        }),
    ]);

    const goal = await fetchGoal(userId);
    let currentCount = 0;
    if (goal) {
        currentCount = await fetchProgress(userId, goal.type);
    }

    const challengeProgress = await Promise.all(
        groups.map(async (challenge) => {
            const challenge_progress = await getChallengeProgressByChallengeId(challenge.id);
            return { ...challenge, challenge_progress };
        })
    );

    const recentWorkouts = workouts
        ?.sort((a: any, b: any) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
        .slice(0, 2);

    const recentRuns = runs
        ?.sort((a: any, b: any) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime())
        .slice(0, 2);

    const userData = {
        name: user.name,
        level: getUserLevel(user.xp),
        xp: user.xp,
    };

    userData.xp = user.xp;

    const badgeProgress = await getBadgeProgress(userId);

    return (
        <main className="flex flex-col gap-6 p-4 mt-8 bg-gray-50 min-h-screen pb-18">
            <div className="p-4 bg-white space-y-4 rounded-xl shadow">
                <section>
                    <h1 className="text-2xl font-semibold text-gray-900">Hallo, {userData.name}</h1>
                    <p className="text-sm text-gray-500">Bereit für dein nächstes Workout?</p>
                </section>

                <LevelBar userData={userData} />

                <section className="grid grid-cols-2 gap-4">
                    <Link href="/profile/goals">
                        {goal ? (
                            <StatCard label="Ziel-Fortschritt" progress={[currentCount, goal.frequency]} icon="goal" />
                        ) : (
                            <StatCard label="Noch kein Ziel" progress={[0, 1]} icon="goal" />
                        )}
                    </Link>
                    <Link href="/profile/badges">
                        <StatCard label="Badges erreicht" progress={badgeProgress} icon="badge" />
                    </Link>
                </section>

                <section className="rounded-xl bg-white ">
                    {challengeProgress.length > 0 ? (
                        <Challenges isGroupView={false} challenges={challengeProgress} />
                    ) : (
                        <p className="text-sm text-gray-500">Keine aktiven Challenges gefunden.</p>
                    )}
                </section>

                <section className="rounded-xl space-y-3 bg-white p-2">
                    <span className="text-lg font-semibold text-gray-900">Letzte Aktivitäten</span>
                    {recentRuns.length === 0 && recentWorkouts.length === 0 ? (
                        <p className="text-md text-gray-500 py-2">
                            Starte jetzt durch – dein erstes Workout oder Lauf wartet auf dich!
                        </p>
                    ) : (
                        <>
                            {recentWorkouts.map((workout) => (
                                <WorkoutPreview key={workout.id} workout={workout} />
                            ))}
                            {recentRuns.map((run) => (
                                <RunPreview key={run.id} run={run} />
                            ))}
                        </>
                    )}
                </section>

                <section className="flex items-center justify-center rounded-xl  border mb-10 border-gray-100 px-8 py-8 text-gray-700 shadow-sm">
                    <SparklesIcon className="w-10 h-10 text-yellow-400 mr-4" />
                    <span className="text-xl font-semibold text-gray-700">Kleine Schritte. Große Wirkung.</span>
                </section>
            </div>
        </main>
    );
}
