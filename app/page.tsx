import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "./api/auth/[...nextauth]/route";

/**
 *
 * @returns JSX-Element für die Root-Seite der Anwendung.
 * Seite wird nicht verwendet, da es keine Inhalte gibt.
 * Der Nutzer wird direkt auf die Login-Seite weitergeleitet, wenn er nicht angemeldet ist.
 * Wenn der Nutzer angemeldet ist, wird er auf die Dashboard-Seite weitergeleitet.
 */
export default async function Page() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
        redirect("/login");
    } else if (session.user.id) {
        redirect("/dashboard");
    } else return <main className="flex min-h-screen flex-col p-6"></main>;
}
