import { motion } from "motion/react";

import { useSettings } from "../context/settingsContext";
import Label from "./ui/Label";
import Input from "./ui/Input";
import Switch from "./ui/Switch";
import Card from "./ui/Card";
import Button from "./Button";

const Settings = () => {
  const { settings, updateSettings, resetSettings } = useSettings();

  const handleDurationChange = (key: keyof typeof settings, value: string) => {
    const numValue = Number.parseInt(value);
    if (!isNaN(numValue) && numValue > 0) {
      updateSettings({ [key]: numValue });
    }
  };

  const handleSwitchChange = (key: keyof typeof settings, checked: boolean) => {
    updateSettings({ [key]: checked });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      <Card className="space-y-6 h-full overflow-y-auto p-6">
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="work-duration" className=" text-primary">
                Work Duration
              </Label>
              <Input
                id="work-duration"
                type="number"
                // min="0"
                // max="60"
                value={settings.workDuration}
                onChange={(e) =>
                  handleDurationChange("workDuration", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="short-break" className="text-primary">
                Short Break
              </Label>
              <Input
                id="short-break"
                type="number"
                // min="0"
                // max="30"
                value={settings.shortBreakDuration}
                onChange={(e) =>
                  handleDurationChange("shortBreakDuration", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="long-break" className="text-primary">
                Long Break
              </Label>
              <Input
                id="long-break"
                type="number"
                // min="0"
                // max="60"
                value={settings.longBreakDuration}
                onChange={(e) =>
                  handleDurationChange("longBreakDuration", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="long-break-interval" className="text-primary">
                Long Break Interval
              </Label>
              <Input
                id="long-break-interval"
                type="number"
                min="2"
                max="10"
                value={settings.longBreakInterval}
                onChange={(e) =>
                  handleDurationChange("longBreakInterval", e.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-between">
          <div>
            <Label htmlFor="auto-start-breaks" className="text-primary">
              Auto-start breaks
            </Label>
            <p className="text-base text-gray-600">
              Automatically start break timers
            </p>
          </div>
          <Switch
            id="auto-start-breaks"
            checked={settings.autoStartBreaks}
            onCheckedChange={(checked) =>
              handleSwitchChange("autoStartBreaks", checked)
            }
          />
        </div>
        <div className=" flex items-center justify-between">
          <div>
            <Label htmlFor="auto-start-pomodoros" className="text-primary">
              Auto-start work sessions
            </Label>
            <p className="text-base text-gray-600">
              Automatically start work timers after breaks
            </p>
          </div>
          <Switch
            id="auto-start-pomodoros"
            checked={settings.autoStartPomodoros}
            onCheckedChange={(checked) =>
              handleSwitchChange("autoStartPomodoros", checked)
            }
          />
        </div>
        <div className="flex flex-row  justify-between">
          <div>
            <Label htmlFor="notifications" className="text-primary">
              Browser notifications
            </Label>
            <p className="text-base text-gray-600">
              Get notified when timers complete
            </p>
          </div>
          <Switch
            id="notifications"
            checked={settings.notifications}
            onCheckedChange={(checked) =>
              handleSwitchChange("notifications", checked)
            }
          />
        </div>
        <div className="flex justify-end">
          <Button onClick={resetSettings} className="px-2">
            Reset to Defaults
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default Settings;
