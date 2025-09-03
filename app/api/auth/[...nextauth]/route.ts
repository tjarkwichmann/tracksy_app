import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyUserPost } from "@/lib/actions";

/**
 * Authentifizierungsoptionen für NextAuth
 * Diese Konfiguration ermöglicht die Anmeldung über E-Mail und Passwort.
 * Die Benutzerdaten werden im JWT-Token gespeichert und in der Sitzung verfügbar gemacht.
 */
export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                try {
                    const user = await verifyUserPost(credentials.email, credentials.password);

                    if (user) {
                        return {
                            id: user.id.toString(),
                            email: user.email,
                            name: user.name || user.email,
                        };
                    }

                    return null;
                } catch (error) {
                    console.error("Authentifizierungsfehler:", error);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },

        async session({ session, token }) {
            if (token.id) {
                (session.user as any).id = token.id;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
            }
            return session;
        },
    },

    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
        updateAge: 60 * 60 * 3,
    },

    jwt: {
        maxAge: 24 * 60 * 60,
    },

    pages: {
        signIn: "/login",
    },

    events: {
        async signOut({ token }) {
            console.log("User signed out:", token?.email);
        },
        async signIn({ user }) {
            console.log("User signed in:", user?.email);
        },
    },

    cookies: {
        sessionToken: {
            name: `next-auth.session-token`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: process.env.NODE_ENV === "production",
            },
        },
    },

    debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
