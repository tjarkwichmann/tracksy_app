"use client";

import React from "react";
import { formatTimeWithHourAndMinute } from "@/lib/utils";
import PreviewHeader from "@/ui/utilities/activityPreview/PreviewHeader";

type RunPreviewProps = {
    run: {
        start_time: string;
        end_time: string;
        duration: number;
        distance: number;
        average_speed: number;
        xp_earned: number;
    };
    onClick?: () => void;
    isClickable?: boolean;
};

export default function RunPreview({ run, isClickable = false }: RunPreviewProps) {
    if (!run) return null;

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm transition-all duration-200 hover:shadow-md">
            <PreviewHeader type={"run"} startTime={run.start_time} endTime={run.end_time} />

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                    <div className="text-lg font-bold">{run.duration} min</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Dauer</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold">{run.distance.toFixed(2)} km</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Distanz</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold">{run.average_speed.toFixed(1)}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">Ø Pace</div>
                </div>
                <div className="text-center">
                    <div className="text-lg font-bold text-orange-600">{run.xp_earned}</div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">XP</div>
                </div>
            </div>
        </div>
    );
}
