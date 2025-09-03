import ChooseCommunity from "@/ui/community/ChooseCommunityTab";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function CommunityPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/login");
    }
    return (
        <main className="min-h-screen bg-gray-50 p-4 pb-24">
            <ChooseCommunity />
        </main>
    );
}
