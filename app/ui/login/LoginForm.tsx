"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                console.error("SignIn error:", result.error);
                setError("Ungültige Anmeldedaten");
            } else if (result?.ok) {
                window.location.href = "/dashboard";
            }
        } catch (err) {
            console.error("Login error:", err);
            setError("Ein Fehler ist aufgetreten");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-Mail
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Passwort
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50">
                {isLoading ? "Wird angemeldet..." : "Anmelden"}
            </button>
            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    Noch kein Konto{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/register")}
                        className="text-blue-600 hover:text-blue-800 hover:cursor-pointer font-medium">
                        Hier registrieren
                    </button>
                </p>
            </div>
        </form>
    );
}
