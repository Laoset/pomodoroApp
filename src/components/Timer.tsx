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
    <Card className="mt-2 p-6">
      <div className="text-center space-y-8">
        <article className="flex flex-col items-center gap-2">
          <div className="space-y-4 flex justify-center items-center flex-col">
            <div
              className={`mx-auto w-80 h-80 rounded-full ${getModeColor()} ${getStatusAnimation()} flex items-center justify-center shadow-2xl`}
            >
              <div className="text-white">
                <div className="text-6xl font-mono font-bold mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-xl opacity-90">
                  Session {completedPomodoros + 1}
                </div>
              </div>
            </div>
          </div>
        </article>
        <div className="flex justify-center gap-4">
          <Controllers />
        </div>
      </div>
    </Card>
  );
};
