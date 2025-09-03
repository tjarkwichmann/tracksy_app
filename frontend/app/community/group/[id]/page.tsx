import GroupHeader from "@/ui/community/group/GroupHeader";
import Challenges from "@/ui/community/group/Challenges";
import GroupFeed from "@/ui/community/group/GroupFeed";

import { getGroupById, getGroupMemberships } from "@/lib/data/groups";
import { getUserById } from "@/lib/data/user";
import { getChallengesByGroupId, getChallengeProgressByChallengeId } from "@/lib/data/challenges";

type GroupPageProps = {
    params: { id: string };
};

/**
 *
 * @param param0 - Id der Gruppe, die angezeigt werden soll wird über die Routenparameter übergeben
 * @returns Gruppenseite mit Gruppenheader, Challenges und Gruppenfeed
 */
export default async function GroupPage({ params }: GroupPageProps) {
    const { id } = await params;
    const group = await getGroupById(id);
    const groupMemberships = await getGroupMemberships(id);
    const challenges = await getChallengesByGroupId(id);
    const challengeProgress = await Promise.all(
        challenges.map(async (challenge) => {
            const challenge_progress = await getChallengeProgressByChallengeId(challenge.id);
            return { ...challenge, challenge_progress };
        })
    );

    const groupMembers = await Promise.all(
        groupMemberships.map(async (membership) => {
            const user = await getUserById(membership.user_id);
            return user;
        })
    );

    return (
        <main className="min-h-screen bg-gray-50   p-6">
            <div className="space-y-2 shadow-sm max-w-3xl mx-auto p-4 bg-white rounded-lg">
                <GroupHeader
                    groupName={group.name}
                    groupDescription={group.description}
                    members={groupMembers}
                    ownerId={group.owner_id}
                />
                <Challenges isGroupView={true} challenges={challengeProgress} />
                <GroupFeed id={id} />
            </div>
        </main>
    );
}
