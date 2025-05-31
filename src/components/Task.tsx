import { useAllContext } from '../context/context';

const Task = () => {
  // Este componente creara la tarea del usuario y permitiria que el pomodoro se ejecute en base a esa tarea.
  const { setTask, task } = useAllContext();
  console.log('Task component rendered with task:', task);

  const handleTaskChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTask = event.target.value;
    setTask(newTask);
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter your task here..."
        className="w-full p-2 border border-gray-300 rounded mt-4"
        value={task}
        onChange={handleTaskChange}
        autoFocus
      />
    </div>
  );
};

export default Task;
