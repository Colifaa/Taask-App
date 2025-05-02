import { useState } from 'react';
import { useTasks } from '../hooks/useTasks';
import { Button } from './ui/button';
import { Input } from './ui/input';

export const AddTask = () => {
  const [title, setTitle] = useState('');
  const { createTask } = useTasks();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await createTask(title.trim());
      setTitle('');
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Agregar nueva tarea..."
        className="flex-1"
      />
      <Button type="submit">Agregar</Button>
    </form>
  );
}; 