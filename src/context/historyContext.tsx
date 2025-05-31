'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface HistoryEntry {
  id: string;
  type: 'work' | 'shortBreak' | 'longBreak';
  duration: number;
  completedAt: Date;
  completed: boolean;
}

interface HistoryContextType {
  history: HistoryEntry[];
  addHistoryEntry: (entry: Omit<HistoryEntry, 'id' | 'completedAt'>) => void;
  clearHistory: () => void;
  getTodayStats: () => {
    completedPomodoros: number;
    totalWorkTime: number;
    totalBreakTime: number;
  };
}

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('pomodoro-history');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory).map((entry: any) => ({
          ...entry,
          completedAt: new Date(entry.completedAt),
        }));
        setHistory(parsedHistory);
      } catch (error) {
        console.error('Error loading history:', error);
      }
    }
  }, []);

  const addHistoryEntry = (entry: Omit<HistoryEntry, 'id' | 'completedAt'>) => {
    const newEntry: HistoryEntry = {
      ...entry,
      id: Date.now().toString(),
      completedAt: new Date(),
    };
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem('pomodoro-history', JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('pomodoro-history');
  };

  const getTodayStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayEntries = history.filter((entry) => {
      const entryDate = new Date(entry.completedAt);
      entryDate.setHours(0, 0, 0, 0);
      return entryDate.getTime() === today.getTime() && entry.completed;
    });

    const completedPomodoros = todayEntries.filter(
      (entry) => entry.type === 'work'
    ).length;
    const totalWorkTime = todayEntries
      .filter((entry) => entry.type === 'work')
      .reduce((sum, entry) => sum + entry.duration, 0);
    const totalBreakTime = todayEntries
      .filter((entry) => entry.type !== 'work')
      .reduce((sum, entry) => sum + entry.duration, 0);

    return { completedPomodoros, totalWorkTime, totalBreakTime };
  };

  return (
    <HistoryContext.Provider
      value={{ history, addHistoryEntry, clearHistory, getTodayStats }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory() {
  const context = useContext(HistoryContext);
  if (context === undefined) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
}
