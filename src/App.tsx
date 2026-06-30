import { useCallback, useMemo, useState } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Tracker } from "./pages/Tracker";
import { Log } from "./pages/Log";
import type { Goal, BeadData } from "./types";
import { BEAD_LENGTH } from "./components/Bead";

const DEFAULT_TOTAL = 1000;

function App() {
    const [history, setHistory] = useLocalStorage<Goal[]>("beads_history", []);
    const [activeBeads, setActiveBeads] = useLocalStorage<BeadData[]>("beads_active", []);
    const [showCelebration, setShowCelebration] = useState(false);
    const [celebrationGoalName, setCelebrationGoalName] = useState("");

    const currentGoal = useMemo(() => {
        return history.find((g) => g.status === "active") || null;
    }, [history]);

    const handleSetGoal = useCallback((name: string) => {
        const newGoal: Goal = {
            id: Math.random().toString(36).substring(2, 9),
            name,
            total: DEFAULT_TOTAL,
            remaining: DEFAULT_TOTAL,
            status: "active",
            createdAt: Date.now(),
        };

        setHistory((prev) => {
            const updated = prev.map((g) =>
                g.status === "active" ? { ...g, status: "completed" as const } : g,
            );
            return [newGoal, ...updated];
        });
    }, []);

    const handleBagInteract = useCallback(
        (x: number, y: number) => {
            if (!currentGoal || currentGoal.remaining <= 0) return;

            const beadId = Math.random().toString(36).substring(2, 9);
            const imageIndex = Math.floor(Math.random() * BEAD_LENGTH);
            setActiveBeads((prev) => [...prev, { id: beadId, x, y, imageIndex }]);

            const newRemaining = Math.max(0, currentGoal.remaining - 1);

            setHistory((prev) =>
                prev.map((g) => {
                    if (g.id === currentGoal.id) {
                        const newStatus = newRemaining === 0 ? "completed" : "active";
                        return { ...g, remaining: newRemaining, status: newStatus };
                    }
                    return g;
                }),
            );

            if (newRemaining === 0) {
                setCelebrationGoalName(currentGoal.name);
                setShowCelebration(true);
            }
        },
        [currentGoal],
    );

    const handleDismissCelebration = useCallback(() => {
        setShowCelebration(false);
    }, []);

    const handleStartNewGoal = useCallback(() => {
        setShowCelebration(false);
    }, []);

    const handleBeadComplete = useCallback((id: string) => {
        setActiveBeads((prev) => prev.filter((b) => b.id !== id));
    }, []);

    return (
        <Router basename={import.meta.env.BASE_URL}>
            <div className="min-h-[100dvh] relative flex flex-col bg-background text-on-background font-sans antialiased overflow-hidden">
                {/* Background decoration */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-0 left-0 w-full h-96 bg-primary/10 rounded-full blur-[120px] -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-3/4 h-96 bg-secondary/10 rounded-full blur-[120px] translate-y-1/2"></div>
                </div>

                <Navbar />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Tracker
                                currentGoal={currentGoal}
                                activeBeads={activeBeads}
                                onSetGoal={handleSetGoal}
                                onBagInteract={handleBagInteract}
                                onBeadComplete={handleBeadComplete}
                                showCelebration={showCelebration}
                                celebrationGoalName={celebrationGoalName}
                                onDismissCelebration={handleDismissCelebration}
                                onStartNewGoal={handleStartNewGoal}
                            />
                        }
                    />
                    <Route path="/log" element={<Log history={history} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
