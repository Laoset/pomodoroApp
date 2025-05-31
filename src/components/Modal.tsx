import { useState } from 'react';

const Modal = () => {
  const [showModal, setShowModal] = useState<boolean>(true);
  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative my-6 mx-auto max-w-3xl w-96 h-36">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col items-center w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-center p-5">
                  <button
                    className="text-black background-transparent  px-3 py-1 text-2xl outline-none focus:outline-none bg-red-400 rounded-lg"
                    onClick={() => setShowModal(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="relative p-4 flex-auto flex flex-row  text-center">
                  <p className="text-black text-2xl font-mono">
                    You have completed 4 sessions of pomodoro, congrats !
                  </p>
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

export default Modal;
