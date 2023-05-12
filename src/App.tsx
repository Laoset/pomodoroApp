import Timer from "./components/Timer";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { ContextoAll } from "./Context";
import { useState } from "react";

function App() {
  const [pomodoro, setPomodoro] = useState(25);
  const [shortBreak, setShortBreak] = useState(5);
  const [longBreak, setLongBreak] = useState(15);
  const [sessions, setSessions] = useState<number>(0);
  return (
    <ContextoAll.Provider
      value={{
        pomodoro,
        shortBreak,
        longBreak,
        setPomodoro,
        setLongBreak,
        setShortBreak,
        sessions,
        setSessions,
      }}
    >
      <main className="flex flex-col xl:justify-center xl:items-center xl:align-middle xl:w-[50rem] text-white h-full">
        <header className="self-center xl:mt-20">
          <h1 className="lg:text-6xl font-mono xl:tracking-wide text-4xl">
            Pomodoro
          </h1>
        </header>
        <section>
          <Timer />
        </section>
        <footer className="flex flex-col items-center gap-1 mb-4">
          <p>Made with ❣️ by Kevin Corman </p>
          <div className="flex flex-row gap-4">
            <a href="https://github.com/Laoset" target="_blank">
              <BsGithub className="cursor-pointer text-xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/alan-kevin-corman-samanamud-22b566176/"
              target="_blank"
            >
              <BsLinkedin className="cursor-pointer text-xl" />
            </a>
          </div>
        </footer>
      </main>
    </ContextoAll.Provider>
  );
}

export default App;
