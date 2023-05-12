import { useState, useContext } from "react";
import { FiSettings } from "react-icons/fi";
import { ContextoAll } from "../Context";

const Settings = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  //estado de erros y controlers
  const [error, setError] = useState<string>("");
  4535465;
  //consumo el context
  const contexto = useContext(ContextoAll);
  const changeWorkTime = contexto.setPomodoro;
  const changeShortTime = contexto.setShortBreak;
  const changeLongTime = contexto.setLongBreak;

  const handleChangeTime = (event: any) => {
    if (event.target.value < 1 || event.target.value > 45) {
      setError("Error");
    } else {
      changeWorkTime(Number(event.target.value));
    }
  };
  const handleChangeShortTime = (event: any) => {
    if (event.target.value < 1 || event.target.value > 45) {
      setError("Error");
    } else {
      changeShortTime(Number(event.target.value));
    }
  };
  const handleChangeLongTime = (event: any) => {
    if (event.target.value < 1 || event.target.value > 45) {
      setError("Error");
    } else {
      changeLongTime(Number(event.target.value));
    }
  };
  return (
    <>
      <FiSettings
        className="flex h-8 w-8 justify-center cursor-pointer"
        onClick={() => setShowModal(true)}
      />
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none cursor-default xl:w-auto ">
            <div className="relative xl:w-auto my-6 mx-auto xl:max-w-3xl ">
              <div className="border-0 rounded-xl shadow-xl relative flex flex-col xl:w-full bg-white outline-none focus:outline-none ">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t ">
                  <p className="text-black text-4xl font-mono">Settings</p>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 xl:flex-row flex-col flex  text-center gap-2">
                  <label className="text-black flex flex-col xl:flex xl:flex-col">
                    <p className="text-lg font-mono">Work</p>
                    <input
                      value={contexto.pomodoro}
                      type="number"
                      className="border-solid border-slate-700 border-2 rounded-md  px-2"
                      onChange={handleChangeTime}
                    />
                  </label>
                  <br />
                  <label className="text-black flex flex-col xl:flex xl:flex-col">
                    <p className="text-lg font-mono">Short Break</p>
                    <input
                      value={contexto.shortBreak}
                      type="number"
                      className="border-solid border-slate-700 border-2 rounded-md px-2"
                      onChange={handleChangeShortTime}
                    />
                  </label>
                  <br />
                  <label className="text-black flex flex-col xl:flex lg:flex-col">
                    <p className="text-lg font-mono">Long Break</p>
                    <input
                      value={contexto.longBreak}
                      type="number"
                      className="border-solid border-slate-700 border-2 rounded-md  px-2"
                      onChange={handleChangeLongTime}
                    />
                  </label>
                  <br />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default Settings;
