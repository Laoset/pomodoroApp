import { BsGithub, BsLinkedin } from "react-icons/bs";
import { PomodoroProvider } from "./context/context";
import TabList from "./components/TabList";
import { useState } from "react";
import { renderSection } from "./utils/renderSection";
import { SettingsProvider } from "./context/settingsContext";
import { HistoryProvider } from "./context/historyContext";
import Card from "./components/ui/Card";

export type SectionProps = "timer" | "settings" | "history";

function App() {
  const [section, setSection] = useState<SectionProps>("timer");

  const handleSectionChange = (newSection: SectionProps) => {
    setSection(newSection);
  };

  return (
    <SettingsProvider>
      <HistoryProvider>
        <PomodoroProvider>
          <div className="min-h-screen px-4 py-10 bg-bg">
            <div className="max-w-3xl mx-auto">
              <header className="text-center mb-12">
                <Card className="p-4">
                  <h1 className="text-4xl font-black text-primary mb-6">
                    Pomocats
                  </h1>
                  <TabList onSection={handleSectionChange} section={section} />
                </Card>
              </header>
              <section className="w-full h-full">
                {renderSection(section)}
              </section>
            </div>
            {/* <footer className="flex flex-col items-center gap-1 mt-10">
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
            </footer> */}
          </div>
        </PomodoroProvider>
      </HistoryProvider>
    </SettingsProvider>
  );
}

export default App;
