import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { useAuth } from './useAuth';
import axios from 'axios';

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const { token, isAuthenticated } = useAuth();

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';
  const API_CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID || 'taask-app-f3d1c8a6b9e4';
  const API_CLIENT_SECRET = process.env.NEXT_PUBLIC_API_CLIENT_SECRET || 's3cr3t-k3y-7d9e2f5a8c4b';

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'x-client-id': API_CLIENT_ID,
    'x-client-secret': API_CLIENT_SECRET
  });

  // Log para depuración
  useEffect(() => {
    console.log('Token actual:', token);
    console.log('Estado de autenticación:', isAuthenticated);
    console.log('Credenciales del cliente:', {
      clientId: API_CLIENT_ID,
      clientSecret: API_CLIENT_SECRET
    });
  }, [token, isAuthenticated]);

  const fetchTasks = async () => {
    if (!token) {
      console.log('No hay token disponible');
      return;
    }

    try {
      console.log('Intentando obtener tareas con headers:', getHeaders());
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: getHeaders()
      });
      console.log('Respuesta de obtener tareas:', response.data);
      if (response.data.success) {
        setTasks(response.data.data);
      } else {
        toast({
          title: "Error",
          description: response.data.error || "No se pudieron cargar las tareas",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      toast({
        title: "Error",
        description: "Error al cargar las tareas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (title: string, description: string = '') => {
    if (!token) {
      console.log('No hay token disponible para crear tarea');
      toast({
        title: "Error",
        description: "No estás autenticado",
        variant: "destructive",
      });
      return;
    }

    try {
      const taskData = { title, description };
      console.log('Datos de la tarea a crear:', taskData);
      console.log('Intentando crear tarea con headers:', getHeaders());
      
      const response = await axios.post(`${API_URL}/tasks`, taskData, {
        headers: getHeaders()
      });
      
      console.log('Respuesta de crear tarea:', response.data);
      if (response.data.success) {
        setTasks([response.data.data, ...tasks]);
        toast({
          title: "Éxito",
          description: "Tarea creada correctamente",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Error al crear la tarea",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Error creating task:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('auth_token');
        toast({
          title: "Error de autenticación",
          description: "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Error al crear la tarea",
          variant: "destructive",
        });
      }
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    if (!token) {
      console.log('No hay token disponible para actualizar tarea');
      return;
    }

    try {
      console.log('Actualizando tarea:', id);
      console.log('Datos de actualización:', updates);
      
      const response = await axios.put(`${API_URL}/tasks/${id}`, 
        updates,
        {
          headers: getHeaders()
        }
      );
      
      console.log('Respuesta de actualizar tarea:', response.data);
      if (response.data.success) {
        setTasks(tasks.map(task => 
          task._id === id ? response.data.data : task
        ));
        toast({
          title: "Éxito",
          description: "Tarea actualizada correctamente",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Error al actualizar la tarea",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error updating task:', error);
      toast({
        title: "Error",
        description: "Error al actualizar la tarea",
        variant: "destructive",
      });
    }
  };

  const deleteTask = async (id: string) => {
    if (!token) {
      console.log('No hay token disponible para eliminar tarea');
      return;
    }

    try {
      const response = await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: getHeaders()
      });
      if (response.data.success) {
        setTasks(tasks.filter(task => task._id !== id));
        toast({
          title: "Éxito",
          description: "Tarea eliminada correctamente",
        });
      } else {
        toast({
          title: "Error",
          description: response.data.error || "Error al eliminar la tarea",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error",
        description: "Error al eliminar la tarea",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks
  };
}; 