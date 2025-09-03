import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";
import SignInForm from "@/ui/signIn/registerForm";

export default async function LoginPage() {
    const session = await getServerSession(authOptions);

    if (session && session.user) {
        redirect("/dashboard");
    }

    return (
        <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-sm space-y-6 rounded-xl bg-white p-6 shadow-md md:-mt-24">
                <div className="text-center">
                    <h1 className="text-xl font-semibold text-gray-800">Willkommen bei Tracksy</h1>
                    <p className="text-sm text-gray-500">Registriere dich, um anzufangen</p>
                </div>
                <SignInForm />
            </div>
        </main>
    );
}
