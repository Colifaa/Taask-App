import { useState, useEffect } from 'react';
import { api, Task } from '../lib/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await api.tasks.getAll();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al cargar las tareas');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (title: string) => {
    try {
      const newTask = await api.tasks.create({ title, completed: false });
      setTasks(prev => [...prev, newTask]);
      return newTask;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear la tarea');
      throw err;
    }
  };

  const toggleTask = async (id: string, completed: boolean) => {
    try {
      const updatedTask = await api.tasks.update(id, { completed });
      setTasks(prev => prev.map(task => 
        task._id === id ? updatedTask : task
      ));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al actualizar la tarea');
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await api.tasks.delete(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al eliminar la tarea');
      throw err;
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    createTask,
    toggleTask,
    deleteTask,
    refreshTasks: fetchTasks
  };
}; 