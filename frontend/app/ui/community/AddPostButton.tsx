"use client";

import { PlusCircleIcon } from "@heroicons/react/24/solid";
import AddPostPopUp from "@/ui/community/addPostPopUp/AddPostPopUp";
import { useState } from "react";

/**
 *
 * @param param0 - Props für die AddPostButton-Komponente
 * @param param0.onPostCreated - Callback-Funktion, die aufgerufen wird, wenn ein neuer Beitrag erstellt wurde
 * @returns Button-Komponente, die ein Pop-up zum Hinzufügen eines neuen Beitrags öffnet
 */
export default function AddPostButton({ onPostCreated }: { onPostCreated: () => void }) {
    const [isAddPostPopUpOpen, setIsAddPostPopUpOpen] = useState(false);
    return (
        <main>
            <div className="fixed bottom-30 right-8 z-100">
                <PlusCircleIcon
                    onClick={() => setIsAddPostPopUpOpen(!isAddPostPopUpOpen)}
                    className="h-18 w-18 text-blue-500 cursor-pointer active:text-blue-500"
                />
            </div>
            <AddPostPopUp
                isVisible={isAddPostPopUpOpen}
                setIsVisible={setIsAddPostPopUpOpen}
                onPostCreated={onPostCreated}
            />
        </main>
    );
}
