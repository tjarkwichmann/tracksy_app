"use client";

import { useState, useEffect, use } from "react";
import { useSession } from "next-auth/react";
import { searchUsersByName, getUserFriends } from "@/lib/data/user";
import { addFriend, removeFriend } from "@/lib/data/friends";
import SearchInput from "./SearchInput";
import SearchedUsersCard from "./searchUsers/SearchedUsersCard";
import SearchedGroupsCard from "./searchGroups/SearchedGroupsCard";
import { AddUserToGroup, getUserGroups, removeUserFromGroup, searchGroupsByName } from "@/lib/data/groups";
import router from "next/router";

type User = {
    id: string;
    name: string;
    email: string;
    level?: number;
    xp?: number;
};

type Group = {
    id: string;
    name: string;
    description: string;
    owner_id: string;
    member_count?: number;
};

type SearchProps = {
    searchInput: string;
};

/**
 *
 * @param param0 - Props für die Search-Komponente
 * @param param0.searchInput - Gibt an, ob nach "user" (Freunden) oder "group" (Gruppen) gesucht werden soll
 * @returns  Komponente, die es Benutzern ermöglicht, nach Freunden oder Gruppen zu suchen.
 * Stellt eine Suchleiste bereit und zeigt die Suchergebnisse in Form von Karten an.
 * Benutzer können Freunde hinzufügen oder Gruppen beitreten, wenn sie angemeldet sind.
 * Die Komponente lädt auch die bereits zugewiesenen Freunde oder Gruppen des Benutzers
 * und zeigt an, ob der Benutzer bereits Mitglied einer Gruppe ist oder ob ein Benutzer bereits einer Person folgt.
 */
export default function Search({ searchInput }: SearchProps) {
    const { data: session } = useSession();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<User[]>([]) || useState<Group[]>([]);
    const [assignedData, assignData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchData] = useState<string>(searchInput === "user" ? "Freunde" : "Gruppen");

    const handleSearch = async () => {
        if (!searchQuery.trim() || !session?.user?.id) return;

        setIsLoading(true);
        try {
            let results;
            if (searchInput === "user") {
                results = await searchUsersByName(parseInt(session.user.id), searchQuery);
            } else {
                results = await searchGroupsByName(parseInt(session.user.id), searchQuery);
            }
            setSearchResults(results || []);
        } catch (error) {
            console.error("Fehler bei der Suche:", error);
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const loadData = async () => {
        if (!session?.user?.id) return;

        try {
            let userData;
            if (searchInput === "user") {
                userData = await getUserFriends(session.user.id);
            } else {
                userData = await getUserGroups(session.user.id);
            }
            assignData(userData || []);
        } catch (error) {
            console.error("Fehler beim Laden der Freunde:", error);
            assignData([]);
        }
    };

    const isAssigned = (dataId: string) => {
        if (searchInput === "user") {
            return assignedData.some((friend) => friend.friend_id === dataId);
        } else {
            return assignedData.some((group) => group.id === dataId);
        }
    };

    const handleAssignData = async (dataId: string) => {
        if (!session?.user?.id) return;

        try {
            if (searchInput === "user") {
                console.log(`Freund mit ID ${dataId} hinzugefügt`);
                await addFriend(session.user.id, dataId);
            } else {
                console.log(`Gruppe mit ID ${dataId} beigetreten`);
                await AddUserToGroup(dataId, session.user.id);
            }

            await loadData();
        } catch (error) {
            console.error("Fehler beim Hinzufügen des Freundes:", error);
        }
    };

    const handleRemoveData = async (dataId: string) => {
        if (!session?.user?.id) return;

        try {
            if (searchInput === "user") {
                await removeFriend(session.user.id, dataId);
            } else {
                console.log(`Gruppe mit ID ${dataId} verlassen`);
                await removeUserFromGroup(dataId, session.user.id);
            }

            await loadData();
        } catch (error) {
            console.error("Fehler beim Entfernen des Freundes:", error);
        }
    };

    const handleGroupClick = (groupId: string) => {
        if (isAssigned(groupId)) {
            router.push(`/community/group/${groupId}`);
        }
    };

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (searchQuery.trim()) {
                handleSearch();
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayedSearch);
    }, [searchQuery, session?.user?.id]);

    useEffect(() => {
        if (session?.user?.id) {
            loadData();
        }
    }, [session?.user?.id]);

    return (
        <main className="bg-gray-50 p-3  pb-24">
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{searchData} suchen</h1>
            </div>

            <div className="space-y-3">
                {isLoading && (
                    <div className="rounded-xl bg-white p-4 shadow text-center">
                        <p className="text-gray-600 text-sm sm:text-base">Suche läuft...</p>
                    </div>
                )}

                {!isLoading && searchQuery && searchResults.length === 0 && (
                    <div className="rounded-xl bg-white p-4 shadow text-center">
                        <p className="text-gray-600 text-sm sm:text-base">Keine {searchData} gefunden</p>
                    </div>
                )}

                <SearchInput
                    placeholder={searchInput === "user" ? "Nach Freunden suchen..." : "Nach Gruppen suchen..."}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />

                {searchResults.map((data) =>
                    searchInput === "user" ? (
                        <SearchedUsersCard
                            key={data.id}
                            user={data}
                            isFriend={isAssigned}
                            handleAddFriend={handleAssignData}
                            handleRemoveFriend={handleRemoveData}
                        />
                    ) : (
                        <SearchedGroupsCard
                            key={data.id}
                            group={data}
                            isMember={isAssigned}
                            handleJoinGroup={handleAssignData}
                            handleLeaveGroup={handleRemoveData}
                        />
                    )
                )}
            </div>

            {!searchQuery && (
                <div className="rounded-xl bg-white p-4 shadow text-center">
                    <p className="text-gray-600 text-sm sm:text-base">Gib einen Namen ein, um zu suchen</p>
                </div>
            )}
        </main>
    );
}
