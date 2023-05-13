/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
interface MyContextProps {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;
  sessions: number;
  setPomodoro: (value: number) => void;
  setLongBreak: (value: number) => void;
  setShortBreak: (value: number) => void;
  setSessions: (value: number) => void;
}
export const ContextoAll = React.createContext<MyContextProps>({
  pomodoro: 25,
  shortBreak: 5,
  longBreak: 15,
  sessions: 0,
  setPomodoro: () => {},
  setLongBreak: () => {},
  setShortBreak: () => {},
  setSessions: () => {},
});
