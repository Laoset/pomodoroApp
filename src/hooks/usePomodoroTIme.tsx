import { useContext } from 'react';
import { ContextoAll } from '../context/context';

export const usePomodoroTime = () => {
  // Vamos a consumir el contexto que hemos creado, el cual contiene los valores de tiempo para el pomodoro, el descanso corto y el descanso largo.
  // Con el objetivo de usar la configuracion del usuario en el temporizador.
  const { pomodoro, shortBreak, longBreak } = useContext(ContextoAll);

  return {
    pomodoro: pomodoro * 60, // Convertimos los minutos a segundos
    shortBreak: shortBreak * 60, // Convertimos los minutos a segundos
    longBreak: longBreak * 60, // Convertimos los minutos a segundos
  };
};
