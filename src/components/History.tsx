import { useHistory } from "../context/historyContext";
import Button from "./Button";
import Card from "./ui/Card";
import CardContent from "./ui/CardContent";
import CardHeader from "./ui/CardHeader";
import { CiClock2, CiTrash, CiCircleCheck } from "react-icons/ci";
import { FiXCircle } from "react-icons/fi";

const History = () => {
  const { history, clearHistory, getTodayStats } = useHistory();

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "work":
        return "Work";
      case "shortBreak":
        return "Short Break";
      case "longBreak":
        return "Long Break";
      default:
        return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return "bg-red text-red";
      case "shortBreak":
        return "bg-green text-green";
      case "longBreak":
        return "bg-blue text-blue";
      default:
        return "bg-gray-100 text-gray";
    }
  };

  const todayStats = getTodayStats();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Task History</h2>
        <p className="text-gray-600">
          Track your productivity and completed sessions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-red mb-1">
              {todayStats.completedPomodoros}
            </div>
            <div className="text-sm text-gray-600">Pomodoros Today</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-green mb-1">
              {todayStats.totalWorkTime}m
            </div>
            <div className="text-sm text-gray-600">Work Time Today</div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-bold text-blue mb-1">
              {todayStats.totalBreakTime}m
            </div>
            <div className="text-sm text-gray-600">Break Time Today</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              Recent Sessions
            </h3>
            <p className="text-sm text-muted-foreground">
              Your latest Pomodoro sessions
            </p>
          </div>
          {history.length > 0 && (
            <Button onClick={clearHistory}>
              <CiTrash className="w-4 h-4 mr-2" />
              Clear History
            </Button>
          )}
        </CardHeader>
        <CardContent>
          {history.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <CiClock2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No sessions completed yet</p>
              <p className="text-sm">
                Start your first Pomodoro to see your history here
              </p>
            </div>
          ) : (
            <div className="relative overflow-hidden h-96">
              <div className="space-y-3">
                {history.map((entry) => (
                  <div
                    key={entry.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {entry.completed ? (
                        <CiCircleCheck className="w-5 h-5 text-green" />
                      ) : (
                        <FiXCircle className="w-5 h-5 text-red" />
                      )}
                      <div>
                        <div
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-green text-green ${getTypeColor(
                            entry.type
                          )}`}
                        >
                          {getTypeLabel(entry.type)}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatDate(entry.completedAt)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{entry.duration}m</div>
                      <div className="text-sm text-gray-600">
                        {entry.completed ? "Completed" : "Interrupted"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default History;
