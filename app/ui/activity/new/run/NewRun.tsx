"use client";
import { useEffect, useState, useRef } from "react";
import { createRun } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import CancelPopUp from "../CancelPopUp";

const MapComponent = dynamic(() => import("./MapComponent"), {
    ssr: false,
    loading: () => <p>Karte wird geladen...</p>,
});
import SavePopUp from "../SavePopUp";
import ControlButtons from "./ControlButtons";
import CurrentSpeedDisplay from "./CurrentSpeedDisplay";
import RunStatsGrid from "./RunStatsGrid";
import RunTimer from "./RunTimer";
import RunTrackerHeader from "./RunTrackerHeader";
import RunFeedback from "./runFeedback/RunFeedback";
import { calculateDistance } from "@/lib/utils";
import { RoutePoint } from "@/lib/definitions";

/**
 *
 * @returns JSX-Element für den Lauf-Tracker
 * Diese Komponente ermöglicht es Benutzern, ihre Läufe zu verfolgen,
 * einschließlich Start, Pause, Fortsetzen und Speichern von Läufen.
 * Sie zeigt auch die aktuelle Geschwindigkeit, Distanz, durchschnittliche Geschwindigkeit und die Zeit an.
 * Nach dem Speichern des Laufs wird ein Feedback-Popup angezeigt, das die Details des Laufs und verdiente Badges anzeigt.
 * Akuell simuliert die Komponente die Distanz und Geschwindigkeit für Testzwecke.
 */
export default function RunTracker() {
    const { data: session } = useSession();
    const [showSavePopup, setShowSavePopup] = useState(false);
    const [showCancelPopup, setShowCancelPopup] = useState(false);
    const [route, setRoute] = useState<RoutePoint[]>([]);
    const [startTime, setStartTime] = useState(null);
    const [distance, setDistance] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [avgSpeed, setAvgSpeed] = useState(0);
    const [currentSpeed, setCurrentSpeed] = useState(0);
    const [showRunFeedback, setShowRunFeedback] = useState(false);
    const [savedRun, setSavedRun] = useState(null);
    const [earnedBadges, setEarnedBadges] = useState([]);
    const [position, setPosition] = useState<[number, number] | null>(null);

    const timerIntervalRef = useRef(null);
    const runWayPointIntervalRef = useRef(null);

    const router = useRouter();

    // Erhöht die Zeit und Distanz alle 1000ms, wenn der Tracker läuft und nicht pausiert ist
    // Die erhöhte Distanz basiert auf einer simulierten Geschwindigkeit
    // und die aktuelle Geschwindigkeit wird ebenfalls simuliert
    useEffect(() => {
        let watchId: number;

        if (isRunning && !isPaused) {
            let lastPosition: GeolocationPosition | null = null;

            timerIntervalRef.current = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);

            if (navigator.geolocation) {
                watchId = navigator.geolocation.watchPosition(
                    (position) => {
                        if (lastPosition) {
                            const newDistance = calculateDistance(
                                lastPosition.coords.latitude,
                                lastPosition.coords.longitude,
                                position.coords.latitude,
                                position.coords.longitude
                            );

                            setDistance((prev) => prev + newDistance);

                            // pace in min/km
                            const pace = position.coords.speed ? 60 / (position.coords.speed * 3.6) : 0;
                            setCurrentSpeed(pace);

                            // Aktualisiere die Route
                            setRoute((prev) => [
                                ...prev,
                                {
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude,
                                    time_stamp: new Date().toISOString(),
                                },
                            ]);
                        }
                        lastPosition = position;
                        setPosition([position.coords.latitude, position.coords.longitude]);
                    },
                    (error) => console.error("Fehler beim GPS-Tracking:", error),
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0,
                    }
                );
            }

            runWayPointIntervalRef.current = setInterval(() => {}, 5000);
        }

        return () => {
            if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
            if (runWayPointIntervalRef.current) clearInterval(runWayPointIntervalRef.current);
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };
    }, [isRunning, isPaused]);

    useEffect(() => {
        if (elapsedTime > 100 && distance > 0) {
            const avgPaceValue = elapsedTime / 60 / distance; // Convert to minutes per kilometer
            setAvgSpeed(avgPaceValue);
        }
    }, [distance, elapsedTime]);

    const resetTrackingData = () => {
        setElapsedTime(0);
        setRoute([]);
        setDistance(0);
        setAvgSpeed(0);
        setCurrentSpeed(0);
    };

    const cancelRun = () => {
        setIsRunning(false);
        setIsPaused(false);
        setShowCancelPopup(false);

        resetTrackingData();
        router.push("/activity/");
    };

    const handleStart = () => {
        if (!startTime) {
            setStartTime(new Date());
        }
        setIsRunning(true);
        setIsPaused(false);
    };

    const handlePause = () => {
        setIsPaused(true);
        setCurrentSpeed(0);
    };

    const handleResume = () => {
        setIsPaused(false);
    };

    const handleSaveRun = async () => {
        const endTime = new Date();
        const runData = {
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            duration: elapsedTime,
            distance: distance.toFixed(2),
            xp_earned: Math.floor(distance * 10 * (0.5 * avgSpeed)),
            average_speed: avgSpeed,
            user_id: parseInt(session.user.id),
            route_points: route,
        };

        console.log("Run data to be saved:", runData);

        try {
            const run = await createRun(runData);
            setEarnedBadges(run.badges || []);
            setSavedRun(runData);
            setShowRunFeedback(true);
            setShowSavePopup(false);
        } catch (error) {
            console.error("Error saving run:", error);
        }
    };

    return (
        <div className="min-h-auto bg-orange-50 mb-auto">
            <RunTrackerHeader showCancelPopup={() => setShowCancelPopup(true)} />

            {!showCancelPopup && !showSavePopup && !showRunFeedback && (
                <div className="p-6">
                    <RunTimer elapsedTime={elapsedTime} isRunning={isRunning} isPaused={isPaused} />

                    <RunStatsGrid distance={distance} averageSpeed={avgSpeed} />

                    <CurrentSpeedDisplay currentSpeed={currentSpeed} isVisible={isRunning && !isPaused} />

                    <MapComponent route={route} position={position} />

                    <ControlButtons
                        isRunning={isRunning}
                        isPaused={isPaused}
                        handleStart={handleStart}
                        handlePause={handlePause}
                        handleResume={handleResume}
                        showSavePopup={() => setShowSavePopup(true)}
                    />
                </div>
            )}

            <SavePopUp
                activityType="Lauf"
                isVisible={showSavePopup}
                onCancel={() => setShowSavePopup(false)}
                onConfirm={handleSaveRun}
            />

            {savedRun && <RunFeedback isVisible={showRunFeedback} run={savedRun} earnedBadges={earnedBadges} />}

            <CancelPopUp
                activityType="Lauf"
                isVisible={showCancelPopup}
                onCancel={() => setShowCancelPopup(false)}
                onConfirm={cancelRun}
            />
        </div>
    );
}
