"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createUser } from "@/lib/actions";

export default function registerForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        setSuccess("");

        if (password !== confirmPassword) {
            setError("Die Passwörter stimmen nicht überein");
            setIsLoading(false);
            return;
        }

        if (password.length < 6) {
            setError("Das Passwort muss mindestens 6 Zeichen lang sein");
            setIsLoading(false);
            return;
        }

        try {
            await createUser(email, password, name);
            setSuccess("Konto erfolgreich erstellt! Sie werden weitergeleitet...");

            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err) {
            console.error("Registration error:", err);
            setError("Fehler beim Erstellen des Kontos. Versuchen Sie es erneut.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="text-red-500 text-sm text-center">{error}</div>}
            {success && <div className="text-green-500 text-sm text-center">{success}</div>}

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                </label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    E-Mail-Adresse
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">Mindestens 6 Zeichen</p>
            </div>

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Passwort bestätigen
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors">
                {isLoading ? "Konto wird erstellt..." : "Konto erstellen"}
            </button>

            <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                    Bereits ein Konto?{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="text-blue-600 hover:text-blue-800 hover:cursor-pointer font-medium">
                        Hier anmelden
                    </button>
                </p>
            </div>
        </form>
    );
}
