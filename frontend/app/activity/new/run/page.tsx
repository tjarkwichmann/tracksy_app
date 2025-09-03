import NewRun from "@/ui/activity/new/run/NewRun";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

/**
 *
 * @returns JSX-Element zum erstellen eines neuen Laufs
 * Diese Seite wird aufgerufen, wenn ein Benutzer einen neuen Lauf erstellen möchte.
 * Wenn der Benutzer nicht angemeldet ist, wird eine Nachricht angezeigt, dass er sich anmelden muss
 * um eine Aktivität zu erstellen.
 */
export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/login");
    }

    return <NewRun />;
}
