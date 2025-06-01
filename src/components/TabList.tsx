import type { SectionProps } from "../App";
import { IoSettingsOutline, IoTimeOutline } from "react-icons/io5";
// import { MdHistory } from "react-icons/md";
import Button from "./Button";

interface TabListProps {
  onSection: (newSection: SectionProps) => void;
  section: string;
}

const elementsTab = [
  {
    id: "timer",
    name: "Timer",
    icon: <IoTimeOutline size={16} />,
  },
  {
    id: "settings",
    name: "Settings",
    icon: <IoSettingsOutline size={16} />,
  },
  // {
  //   id: "history",
  //   name: "History",
  //   icon: <MdHistory size={16} />,
  // },
];

const TabList = ({ onSection, section }: TabListProps) => {
  return (
    <div className="flex flex-row justify-between items-center gap-4 mb-4 w-full border-gray-300 bg-white/80 backdrop-blur-sm">
      {elementsTab.map((element) => (
        <Button
          key={element.id}
          className={
            "flex items-center text-center px-2 transition-colors cursor-pointer w-full justify-center gap-2 rounded-sm text-xl" +
            (section === element.id
              ? " bg-pomodoro-red text-white"
              : " bg-transparent text-gray-700")
          }
          onClick={() => onSection(element.id as SectionProps)}
        >
          <span>{element.icon}</span>
          {element.name}
        </Button>
      ))}
    </div>
  );
};

export default TabList;
