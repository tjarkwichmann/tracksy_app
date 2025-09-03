import { authOptions } from "@/api/auth/[...nextauth]/route";
import NetworkChooseCommunity from "@/ui/community/network/NetWorkChooseCommunity";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

/**
 *
 * @returns JSX-Kompoennte für die Suche von Usern oder Gruppen
 * Diese Seite wird über das Group-Icon in Communty-Bereich aufgerufen
 *
 */
export default async function NetworkPage() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/login");
    }
    return (
        <main className="min-h-screen bg-gray-50 p-4 pb-24">
            <NetworkChooseCommunity />
        </main>
    );
}
