"use client"

import { useTasks } from '@/hooks/useTasks';
import { AddTask } from './AddTask';
import { TaskCard } from './TaskCard';

export const TaskList = () => {
  const { tasks, createTask, updateTask, deleteTask } = useTasks();

  const handleAddTask = async (title: string, description: string) => {
    await createTask(title, description);
  };

  const handleUpdateTask = async (id: string, updates: any) => {
    await updateTask(id, updates);
  };

  const handleDeleteTask = async (id: string) => {
    await deleteTask(id);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-gray-900">Mis Tareas</h1>
        <AddTask onAdd={handleAddTask} />
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
            />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">
                No hay tareas pendientes. ¡Agrega una nueva tarea!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 