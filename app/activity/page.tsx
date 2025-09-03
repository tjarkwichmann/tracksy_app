import ChooseActivity from "@/ui/activity/ChooseActivity";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

/**
 *
 * @returns JSX-Komponente für die Auswahl einer Aktivität
 * Diese Seite wird aufgerufen, wenn ein Benutzer eine Aktivität auswählen möchte.
 * Wenn der Benutzer nicht angemeldet ist, wird er auf die Login-Seite weitergeleitet
 */
export default async function ActivityPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/login");
    }

    return (
        <main className="min-h-screen bg-gray-50 p-4 pb-24">
            <ChooseActivity />
        </main>
    );
}
