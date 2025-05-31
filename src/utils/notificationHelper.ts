//Pedir permiso al navegar sobre notificaciones
import sound from '../assets/mixkit-bell-notification-933.wav';

export function requestNotificationPermission() {
  if (!('Notification' in window)) {
    return;
  }

  if (Notification.permission !== 'granted') {
    Notification.requestPermission().then((permission) => {
      if (permission !== 'granted') {
        null;
      }
    });
  }
}
//Mostrar notificaciones
export function showNotification() {
  if (!('Notification' in window)) {
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification('Hi!', {
      body: 'Congratulations, you completed 4 pomodoros',
    });
    new Audio(sound).play();
  }
}
export function showNotificationPomodoro() {
  if (!('Notification' in window)) {
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification('Hi!', {
      body: 'You completed a pomodoro',
    });
    new Audio(sound).play();
  }
}
export function showNotificationBreak() {
  if (!('Notification' in window)) {
    return;
  }

  if (Notification.permission === 'granted') {
    new Notification('Hi!', {
      body: 'You breaktime end, its time to work !',
    });
    new Audio(sound).play();
  }
}
export default { showNotification, requestNotificationPermission };
