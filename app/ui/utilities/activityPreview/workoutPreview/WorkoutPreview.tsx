"use client";

import React from "react";
import PreviewHeader from "../PreviewHeader";
import WorkoutPreviewBody from "./WorkoutPreviewBody";
import { WorkoutProp } from "@/lib/definitions";
type WorkoutPreviewProps = {
    workout: WorkoutProp["workout"];
};

export default function WorkoutPreview({ workout }: WorkoutPreviewProps) {
    if (!workout || !workout.sets) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm transition-all duration-200 hover:shadow-md">
            <PreviewHeader type={"workout"} startTime={workout.start_time} endTime={workout.end_time} />
            <WorkoutPreviewBody workout={workout} />
        </div>
    );
}
