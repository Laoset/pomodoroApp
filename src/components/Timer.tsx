import { useState, useContext, useEffect, useRef } from "react";
import { ContextoAll } from "../Context";
import { HiOutlinePlay, HiOutlinePause } from "react-icons/hi2";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Settings from "./Settings";
import { showNotification, requestNotificationPermission } from "../util/util";
import Modal from "./ModalFinalPomodoro";
import { getColorFromMode } from "./Color";

const Timer = () => {
  //usamos el contexto y lo declarmos como const
  const contexto = useContext(ContextoAll);
  //me traigo las sesiones para sumar
  const sesionsitas = contexto.sessions;
  //estado de pausa
  const [paused, setPaused] = useState<boolean>(true);
  //estado para open el modal
  const [openModal, setOpenModal] = useState<boolean>(false);
  //estado de modos
  const [mode, setMode] = useState<string>("work");
  //estado de segundos que seran descontado
  const [seconds, setSeconds] = useState<number>(0);
  //ref
  const secondsLeftRef = useRef(seconds);
  const pausedRef = useRef(paused);
  const modeRef = useRef(mode);
  //util de color mode
  const colors = getColorFromMode(mode);
  //f
  const t = () => {
    secondsLeftRef.current--;
    setSeconds(secondsLeftRef.current);
  };
  //effect
  useEffect(() => {
    inicializador();
    //funcion que cambia el modo
    const switchMode = () => {
      let next;
      let modosnext;
      switch (modeRef.current) {
        case "work":
          if (sesionsitas >= 3) {
            contexto.setSessions(sesionsitas + 1);
            next = "breaklong";
            modosnext = contexto.breakLong * 60;
          } else {
            contexto.setSessions(sesionsitas + 1);
            next = "break";
            modosnext = contexto.shortBreak * 60;
          }
          break;
        case "break":
          if (sesionsitas >= 1) {
            next = "work";
            modosnext = contexto.pomodoro * 60;
          } else {
            next = "work";
            modosnext = contexto.pomodoro * 60;
            setPaused(true);
            pausedRef.current = true;
          }
          break;
        case "breaklong":
          if (sesionsitas >= 3) {
            contexto.setSessions(0);
            showNotification();
            next = "work";
            modosnext = contexto.pomodoro * 60;
            setPaused(true);
            pausedRef.current = true;
            setOpenModal(true);
          } else {
            next = "work";
            modosnext = contexto.pomodoro * 60;
            setPaused(true);
            pausedRef.current = true;
          }
          break;
        default:
          next = "work";
          modosnext = contexto.pomodoro * 60;
          break;
      }
      setMode(next);
      modeRef.current = next;
      setSeconds(modosnext);
      secondsLeftRef.current = modosnext;
    };
    if (modeRef.current === "work") {
      secondsLeftRef.current = contexto.pomodoro * 60;
    }
    if (modeRef.current === "break") {
      secondsLeftRef.current = contexto.shortBreak * 60;
    }
    if (modeRef.current === "breaklong") {
      secondsLeftRef.current = contexto.longBreak * 60;
    }
    setSeconds(secondsLeftRef.current);
    const inter = setInterval(() => {
      if (pausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }
      t();
    }, 500);
    return () => clearInterval(inter);
  }, [contexto, modeRef, mode]);
  //funcion que inicia el timer
  const inicializador = () => {
    setSeconds(contexto.pomodoro * 60);
  };
  const handleChangeWorkTime = () => {
    setMode("work");
    modeRef.current = "work";
  };
  const handleChangeShortTime = () => {
    setMode("break");
    modeRef.current = "break";
  };
  const handleChangeLongTime = () => {
    setMode("breaklong");
    modeRef.current = "breaklong";
  };
  let totalSeconds;
  switch (mode) {
    case "work":
      totalSeconds = contexto.pomodoro * 60;
      break;
    case "break":
      totalSeconds = contexto.shortBreak * 60;
      break;
    case "breaklong":
      totalSeconds = contexto.longBreak * 60;
      break;
    default:
      totalSeconds = contexto.pomodoro * 60;
      break;
  }
  //la barrita que sigue el count
  const percentage = Math.round((seconds / totalSeconds) * 100);
  const minutos = Math.floor(seconds / 60);
  let segunditos = seconds % 60;
  if (segunditos < 10) segunditos = "0" + segunditos;

  return (
    <div className="flex flex-col justify-center xl:h-[40rem] h-full w-full items-center">
      <nav className="flex flex-row gap-5 text-xl xl:mb-20 mb-10 h-14 bg-[#1b263b] shadow-lg shadow-slate-700 rounded-md w-96 place-content-center">
        <button
          className="hover:text-[#eabf9f] hover:scale-110 duration-200 rounded-md"
          onClick={handleChangeWorkTime}
        >
          Work
        </button>
        <button
          className="hover:text-[#eabf9f] hover:scale-110 duration-200 rounded-md"
          onClick={handleChangeShortTime}
        >
          Short Break
        </button>
        <button
          className="hover:text-[#eabf9f] hover:scale-110 duration-200 rounded-md"
          onClick={handleChangeLongTime}
        >
          Long Break
        </button>
      </nav>
      <div className="mb-5 ">
        <Settings />
      </div>
      {openModal ? <Modal /> : null}
      <article className="flex flex-col items-center gap-2">
        <div>
          <CircularProgressbarWithChildren
            value={percentage}
            styles={buildStyles({
              pathColor: colors,
              trailColor: "rgba(255,255,255,.2)",
            })}
          >
            <p className="text-[#eabf9f] text-6xl mb-6">
              {minutos + ":" + segunditos}
            </p>
            <p>
              Pomodoro completed : <span>{sesionsitas}</span>
            </p>
          </CircularProgressbarWithChildren>
        </div>
      </article>
      <div className="flex flex-row gap-4 items-center mt-2">
        {paused ? (
          <HiOutlinePlay
            className="flex h-16 w-16  justify-center cursor-pointer"
            onClick={() => {
              requestNotificationPermission();
              setPaused(false);
              pausedRef.current = false;
            }}
          />
        ) : (
          <HiOutlinePause
            className="flex h-16 w-16  justify-center cursor-pointer"
            onClick={() => {
              setPaused(true);
              pausedRef.current = true;
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Timer;
