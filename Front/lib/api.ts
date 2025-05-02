// Front/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export const api = {
  tasks: {
    getAll: async (): Promise<Task[]> => {
      const response = await fetch(`${API_URL}/tasks`);
      if (!response.ok) {
        throw new Error('Error al obtener las tareas');
      }
      const data = await response.json();
      return data.data;
    },

    create: async (task: { title: string; completed: boolean }): Promise<Task> => {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Error al crear la tarea');
      }
      const data = await response.json();
      return data.data;
    },

    update: async (id: string, task: Partial<Task>): Promise<Task> => {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
      }
      const data = await response.json();
      return data.data;
    },

    delete: async (id: string): Promise<void> => {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la tarea');
      }
    },
  },
}; 