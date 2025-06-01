import { motion } from "motion/react";
import { usePomodoro } from "../context/context";
import Controllers from "./Controllers";
import Card from "./ui/Card";

export const Timer = () => {
  const { timeLeft, mode, status, completedPomodoros } = usePomodoro();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };
  const getModeColor = () => {
    switch (mode) {
      case "work":
        return "bg-pomodoro-red hover:bg-pomodoro-red timer-circle shadow-pomodoro-red/30";
      case "shortBreak":
        return "bg-pomodoro-green hover:bg-pomodoro-green timer-circle shadow-pomodoro-green/30";
      case "longBreak":
        return "bg-pomodoro-blue hover:bg-pomodoro-blue timer-circle shadow-pomodoro-blue/30";
      default:
        return "bg-pomodoro-red hover:bg-pomodoro-red timer-circle shadow-pomodoro-red/30";
    }
  };

  const getStatusAnimation = () => {
    if (status === "running") {
      return "animate-pulse-soft";
    }
    return "";
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      <Card className="p-6">
        <div className="text-center space-y-8">
          <article className="flex flex-col items-center gap-2">
            <div className="space-y-4 flex justify-center items-center flex-col">
              <div
                className={`mx-auto w-72 h-72 rounded-full ${getModeColor()} ${getStatusAnimation()} flex items-center justify-center shadow-2xl`}
              >
                <div className="text-white">
                  <h3 className="text-6xl font-bold tracking-wide">
                    {formatTime(timeLeft)}
                  </h3>
                  <p className="text-base opacity-90 tracking-wide">
                    Session {completedPomodoros + 1}
                  </p>
                </div>
              </div>
            </div>
          </article>
          <div className="flex justify-center gap-4">
            <Controllers />
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
