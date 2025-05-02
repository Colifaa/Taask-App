import { useTasks } from '../hooks/useTasks';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

export const TaskList = () => {
  const { tasks, loading, error, toggleTask, deleteTask } = useTasks();

  if (loading) {
    return <div className="text-center py-4">Cargando tareas...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center py-4">No hay tareas. ¡Agrega una nueva!</div>;
  }

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <div
          key={task._id}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
        >
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={task.completed}
              onCheckedChange={(checked) => toggleTask(task._id, checked as boolean)}
            />
            <span className={task.completed ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => deleteTask(task._id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      ))}
    </div>
  );
}; 