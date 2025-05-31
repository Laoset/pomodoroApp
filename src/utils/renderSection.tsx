import History from '../components/History';
import Settings from '../components/Settings';
import { Timer } from '../components/Timer';

export function renderSection(section: 'timer' | 'settings' | 'history') {
  switch (section) {
    case 'timer':
      return <Timer />;
    case 'settings':
      return <Settings />;
    case 'history':
      return <History />;
    default:
      return <div>Invalid Section</div>;
  }
}
