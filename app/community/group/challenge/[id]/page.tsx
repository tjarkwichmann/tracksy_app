import ChallengeDetails from "@/ui/community/group/ChallengeDetails";
import { getGroupChallengeById, getChallengeProgressByChallengeId } from "@/lib/data/challenges";
import { getUserById } from "@/lib/data/user";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";

type ChallengePageProps = { params: { id: string } };

/**
 *
 * @param param0 - Id der Challenge, die angezeigt werden soll
 * @returns JSX-Element mit den Details der Challenge
 */
export default async function ChallengePage({ params }: ChallengePageProps) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/login");
    }

    const { id } = await params;

    const challenge = await getGroupChallengeById(id);
    if (!challenge) {
        return <div className="text-center text-red-500">Challenge not found</div>;
    }

    const challengeProgress = await getChallengeProgressByChallengeId(challenge.id);

    // Die Nutzerinformationen werden mit den Challenge-Progress gemapped. Um die die Nutzerinformationen anzeigen zu können.
    const userPromises = challengeProgress.map(async (progress) => {
        const user = await getUserById(progress.user_id);
        return { ...progress, user };
    });

    const enrichedChallengeProgress = await Promise.all(userPromises);
    challenge.challenge_progress = enrichedChallengeProgress;

    if (!challenge.challenge_progress || challenge.challenge_progress.length === 0) {
        return <div className="text-center text-gray-500">No progress data available for this challenge.</div>;
    }

    return (
        <main className="min-h-screen bg-gray-50 p-6 mb-12">
            <ChallengeDetails challenge={challenge} />
        </main>
    );
}
