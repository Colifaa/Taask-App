// src/controllers/tasks.ts
import { Request, Response, NextFunction } from 'express';
import Task from '../models/Task';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

// Obtener todas las tareas
export const getTasks = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('👉 Obteniendo tareas del usuario:', req.user?.id);
    const tasks = await Task.find({ userId: req.user?.id }).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

// Crear una nueva tarea
export const createTask = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    console.log('👉 Creando nueva tarea');
    console.log('Body recibido:', req.body);
    console.log('Usuario:', req.user?.id);

    const { title, description, completed } = req.body;

    // Validación básica
    if (!title || typeof title !== 'string') {
      res.status(400).json({
        success: false,
        error: 'El título es requerido y debe ser una cadena de texto'
      });
      return;
    }

    // Validar descripción
    if (description && typeof description !== 'string') {
      res.status(400).json({
        success: false,
        error: 'La descripción debe ser una cadena de texto'
      });
      return;
    }

    // Crear la tarea
    const task = new Task({
      title,
      description: description || '',
      completed: completed || false,
      userId: req.user?.id
    });

    // Validar el documento antes de guardar
    const validationError = task.validateSync();
    if (validationError) {
      console.error('Error de validación:', validationError);
      res.status(400).json({
        success: false,
        error: 'Datos inválidos',
        details: validationError.errors
      });
      return;
    }

    // Guardar en la base de datos
    await task.save();

    console.log('✅ Tarea creada:', task);
    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// Actualizar una tarea
export const updateTask = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    console.log('👉 Actualizando tarea:', id);
    console.log('Datos a actualizar:', { title, description, completed });

    // Validar ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        error: 'ID de tarea inválido'
      });
      return;
    }

    // Validar datos
    if (title && typeof title !== 'string') {
      res.status(400).json({
        success: false,
        error: 'El título debe ser una cadena de texto'
      });
      return;
    }

    if (description && typeof description !== 'string') {
      res.status(400).json({
        success: false,
        error: 'La descripción debe ser una cadena de texto'
      });
      return;
    }

    // Buscar y actualizar la tarea, verificando que pertenezca al usuario
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user?.id },
      { title, description, completed },
      { new: true, runValidators: true }
    );

    if (!task) {
      res.status(404).json({
        success: false,
        error: 'Tarea no encontrada o no tienes permiso para modificarla'
      });
      return;
    }

    console.log('✅ Tarea actualizada:', task);
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};

// Eliminar una tarea
export const deleteTask = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;

    console.log('👉 Eliminando tarea:', id);

    // Validar ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        success: false,
        error: 'ID de tarea inválido'
      });
      return;
    }

    // Buscar y eliminar la tarea, verificando que pertenezca al usuario
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user?.id });

    if (!task) {
      res.status(404).json({
        success: false,
        error: 'Tarea no encontrada o no tienes permiso para eliminarla'
      });
      return;
    }

    console.log('✅ Tarea eliminada:', task);
    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    next(error);
  }
};
