"use client";
import { ArrowLeftIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import GroupMembersPopUp from "./GroupMembersPopUp";
import { useState } from "react";

interface GroupHeaderProps {
    groupName: string;
    groupDescription: string;
    members: { name: string; id: number; level: number; email: string }[];
    ownerId: number;
}

/**
 *
 * @param param0 - Props für die GroupHeader-Komponente
 * @param param0.groupName - Name der Gruppe
 * @param param0.groupDescription - Beschreibung der Gruppe
 * @param param0.members - Liste der Mitglieder der Gruppe
 * @param param0.ownerId - ID des Gruppenerstellers
 * @returns Header-Komponente für eine Gruppe
 */
export default function GroupHeader({ groupName, groupDescription, members, ownerId }: GroupHeaderProps) {
    const router = useRouter();
    const [showMembers, setShowMembers] = useState(false);

    const handleBack = () => {
        router.back();
    };
    return (
        <div>
            <button
                onClick={() => handleBack()}
                className="justify-self-start text-blue-500  rounded-full  hover:cursor-pointer">
                <ArrowLeftIcon className="w-8 h-8" />
            </button>
            <div className="flex flex-col items-center justify-between p-6 bg-gradient-to-r from-white to-blue-50 shadow-lg rounded-2xl mb-4 ">
                <div className="flex items-center gap-5">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-extrabold tracking-tight">{groupName}</h1>
                        <p className="text-base text-gray-500 mt-1">{groupDescription}</p>
                        <div onClick={() => setShowMembers(!showMembers)} className="mt-3 flex items-center gap-2">
                            <UserGroupIcon className="w-6 h-6 text-blue-500" />
                            <span className="text-sm text-gray-700 font-medium">{members.length} Mitglieder</span>
                        </div>
                    </div>
                </div>
            </div>
            <GroupMembersPopUp
                onClose={() => setShowMembers(false)}
                isVisible={showMembers}
                setIsVisible={setShowMembers}
                members={members}
                ownerId={ownerId}
            />
        </div>
    );
}
