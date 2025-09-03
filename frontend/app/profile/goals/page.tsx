import { authOptions } from "@/api/auth/[...nextauth]/route";
import ShowGoal from "@/ui/profile/goals/ShowGoal";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function GoalsPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/login");
    }
    return (
        <main className="min-h-screen bg-gray-50 p-4">
            <ShowGoal />
        </main>
    );
}
