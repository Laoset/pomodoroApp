import { useSettings } from "../context/settingsContext";
import Label from "./ui/Label";
import Input from "./ui/Input";
import Switch from "./ui/Switch";
import Separator from "./ui/Separator";
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Settings</h2>
        <p className="text-gray-600">Customize your Pomodoro experience</p>
      </div>
      <div className="rounded-lg border text-card-foreground shadow-sm bg-white/80 backdrop-blur-sm border-pomodoro-blue">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight text-pomodoro-blue">
            Timer Durations
          </h3>
          <p className="text-sm text-muted-foreground">
            Set the duration for work sessions and breaks (in minutes)
          </p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="work-duration" className=" text-gray-700">
                Work Duration
              </Label>
              <Input
                id="work-duration"
                type="number"
                min="1"
                max="60"
                value={settings.workDuration}
                onChange={(e) =>
                  handleDurationChange("workDuration", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="short-break" className="text-gray-700">
                Short Break
              </Label>
              <Input
                id="short-break"
                type="number"
                min="1"
                max="30"
                value={settings.shortBreakDuration}
                onChange={(e) =>
                  handleDurationChange("shortBreakDuration", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="long-break" className="text-gray-700">
                Long Break
              </Label>
              <Input
                id="long-break"
                type="number"
                min="1"
                max="60"
                value={settings.longBreakDuration}
                onChange={(e) =>
                  handleDurationChange("longBreakDuration", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="long-break-interval" className="text-gray-700">
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
      </div>

      <div className="rounded-lg border text-card-foreground shadow-sm bg-white/80 backdrop-blur-sm border-pomodorod-green">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight text-pomodoro-green">
            Automation
          </h3>
          <p className="text-sm text-muted-foreground">
            Configure automatic timer behavior
          </p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-start-breaks" className="text-gray-700">
                Auto-start breaks
              </Label>
              <p className="text-sm text-gray-600">
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

          <Separator />

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="auto-start-pomodoros" className="text-gray-700">
                Auto-start work sessions
              </Label>
              <p className="text-sm text-gray-600">
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
        </div>
      </div>

      <div className="rounded-lg border text-card-foreground shadow-sm bg-white/80 backdrop-blur-sm border-pomodorod-green">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="text-2xl font-semibold leading-none tracking-tight text-orange-600">
            Notifications
          </h3>
          <p className="text-sm text-muted-foreground">
            Configure notification preferences
          </p>
        </div>
        <div className="p-6 pt-0 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="notifications" className="text-gray-700">
                Browser notifications
              </Label>
              <p className="text-sm text-gray-600">
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
        </div>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={resetSettings}
          className="border-gray-300 hover:bg-gray-50"
        >
          Reset to Defaults
        </Button>
      </div>
    </div>
  );
};

export default Settings;
