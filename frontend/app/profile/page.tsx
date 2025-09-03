import { authOptions } from "@/api/auth/[...nextauth]/route";
import ChooseTab from "@/ui/profile/ChooseTab";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export default async function UserPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/login");
    }
    return (
        <main className="min-h-screen bg-gray-50 p-4 ">
            <ChooseTab />
        </main>
    );
}
