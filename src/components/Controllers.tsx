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
          className="bg-primary hover:bg-gray-800 text-white cursor-pointer p-1"
          onClick={startTimer}
        >
          <IoPlayOutline className="h-6 w-6" />
        </Button>
      ) : (
        <Button onClick={pauseTimer} className="cursor-pointer p-1">
          <IoPauseOutline className="h-6 w-6" />
        </Button>
      )}
      <Button onClick={resetTimer} className="cursor-pointer p-1">
        <IoPauseOutline className="h-6 w-6" />
      </Button>
      <Button onClick={skipTimer} className="cursor-pointer p-1">
        <IoPlaySkipForwardOutline className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Controllers;
