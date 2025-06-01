import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  useCallback,
} from "react";
import { useSettings } from "./settingsContext";
import { useHistory } from "./historyContext";
import notificationSound from "../assets/mixkit-bell-notification-933.wav";

type TimerMode = "work" | "shortBreak" | "longBreak";
type TimerStatus = "idle" | "running" | "paused";

interface PomodoroContextType {
  timeLeft: number;
  mode: TimerMode;
  status: TimerStatus;
  completedPomodoros: number;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;
}

const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

export function PomodoroProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  const { addHistoryEntry } = useHistory();

  const [mode, setMode] = useState<TimerMode>("work");
  const [status, setStatus] = useState<TimerStatus>("idle");
  const [timeLeft, setTimeLeft] = useState(settings.workDuration * 60);
  const [completedPomodoros, setCompletedPomodoros] = useState(0);

  const getDurationForMode = useCallback(
    (currentMode: TimerMode) => {
      switch (currentMode) {
        case "work":
          return settings.workDuration * 60;
        case "shortBreak":
          return settings.shortBreakDuration * 60;
        case "longBreak":
          return settings.longBreakDuration * 60;
        default:
          return settings.workDuration * 60;
      }
    },
    [settings]
  );

  const getNextMode = useCallback(() => {
    if (mode === "work") {
      const nextPomodoroCount = completedPomodoros + 1;
      return nextPomodoroCount % settings.longBreakInterval === 0
        ? "longBreak"
        : "shortBreak";
    }
    return "work";
  }, [mode, completedPomodoros, settings.longBreakInterval]);

  const switchMode = useCallback(() => {
    const currentDuration = getDurationForMode(mode);
    const wasCompleted = timeLeft === 0;

    // Add to history
    addHistoryEntry({
      type: mode,
      duration: Math.round((currentDuration - timeLeft) / 60),
      completed: wasCompleted,
    });

    if (mode === "work" && wasCompleted) {
      setCompletedPomodoros((prev) => prev + 1);
    }

    const nextMode = getNextMode();
    setMode(nextMode);
    setTimeLeft(getDurationForMode(nextMode));

    // Auto-start next session if enabled
    if (
      (nextMode !== "work" && settings.autoStartBreaks) ||
      (nextMode === "work" && settings.autoStartPomodoros)
    ) {
      setStatus("running");
    } else {
      setStatus("idle");
    }

    // Show notification
    if (settings.notifications && "Notification" in window) {
      const messages = {
        work: "Break time! Take a rest.",
        shortBreak: "Break over! Time to focus.",
        longBreak: "Long break over! Ready to work?",
      };
      new Notification("Pomodoro Timer", {
        body: messages[mode],
        // icon: "/favicon.ico",
      });
      const audio = new Audio(notificationSound);
      audio.play().catch((err) => {
        console.warn("No se pudo reproducir el sonido:", err);
      });
    }
  }, [
    mode,
    timeLeft,
    getDurationForMode,
    getNextMode,
    addHistoryEntry,
    settings,
  ]);

  useEffect(() => {
    setTimeLeft(getDurationForMode(mode));
  }, [settings, mode, getDurationForMode]);
  useEffect(() => {
    let interval: number;

    if (status === "running" && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [status, timeLeft]);

  useEffect(() => {
    if (status === "running" && timeLeft === 0) {
      switchMode();
    }
  }, [timeLeft, status, switchMode]);

  // Request notification permission
  useEffect(() => {
    if (
      settings.notifications &&
      "Notification" in window &&
      Notification.permission === "default"
    ) {
      Notification.requestPermission();
    }
  }, [settings.notifications]);

  const startTimer = () => setStatus("running");
  const pauseTimer = () => setStatus("paused");

  const resetTimer = () => {
    setStatus("idle");
    setTimeLeft(getDurationForMode(mode));
  };

  const skipTimer = () => {
    setTimeLeft(0);
    switchMode();
  };

  return (
    <PomodoroContext.Provider
      value={{
        timeLeft,
        mode,
        status,
        completedPomodoros,
        startTimer,
        pauseTimer,
        resetTimer,
        skipTimer,
      }}
    >
      {children}
    </PomodoroContext.Provider>
  );
}

export function usePomodoro() {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error("usePomodoro must be used within a PomodoroProvider");
  }
  return context;
}
