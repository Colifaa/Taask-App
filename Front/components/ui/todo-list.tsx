import { Task } from '@/types/task';
import { Card, CardContent } from './card';
import { Checkbox } from './checkbox';
import { Button } from './button';
import { Trash2, Edit } from 'lucide-react';

interface TodoListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onEdit: (id: string) => void;
}

export const TodoList = ({ tasks, onToggleComplete, onDelete, onEdit }: TodoListProps) => {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task._id}>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <Checkbox
                checked={task.completed}
                onCheckedChange={() => onToggleComplete(task._id)}
                className="mt-1"
              />
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-500' : ''}`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className={`text-sm text-gray-600 ${task.completed ? 'line-through' : ''}`}>
                    {task.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(task._id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(task._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}; 