import {
  IoPlaySkipForwardOutline,
  IoPlayOutline,
  IoPauseOutline,
} from "react-icons/io5";
import Button from "./Button";
import { usePomodoro } from "../context/context";

const Controllers = () => {
  const { startTimer, pauseTimer, resetTimer, status, skipTimer } =
    usePomodoro();

  return (
    <div className="flex justify-center gap-4">
      {status === "idle" || status === "paused" ? (
        <Button
          className="bg-primary hover:bg-gray-800 text-white cursor-pointer"
          onClick={startTimer}
        >
          <IoPlayOutline className="h-6 w-6" />
          {/* <span className="text-sm">
            {status === "idle" ? "Start" : "Resume"}
          </span> */}
        </Button>
      ) : (
        <Button onClick={pauseTimer} className="cursor-pointer">
          <IoPauseOutline className="h-6 w-6" />
          {/* <span className="text-sm">Pause</span> */}
        </Button>
      )}
      <Button onClick={resetTimer} className="cursor-pointer">
        <IoPauseOutline className="h-6 w-6" />
        {/* <span className="text-sm">Reset</span> */}
      </Button>
      <Button onClick={skipTimer} className="cursor-pointer">
        <IoPlaySkipForwardOutline className="h-6 w-6" />
        {/* <span className="text-sm">Skip</span> */}
      </Button>
    </div>
  );
};

export default Controllers;
