// src/controllers/tasks.ts
import { Request, Response } from 'express';
import Task from '../models/Task';
import mongoose from 'mongoose';

// Obtener todas las tareas
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('👉 Obteniendo todas las tareas');
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('❌ Error al obtener tareas:', error);
    res.status(500).json({
      success: false,
      error: 'Error al obtener las tareas',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
};

// Crear una nueva tarea
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('👉 Creando nueva tarea');
    console.log('Body recibido:', req.body);

    const { title, completed } = req.body;

    // Validación básica
    if (!title || typeof title !== 'string') {
      res.status(400).json({
        success: false,
        error: 'El título es requerido y debe ser una cadena de texto'
      });
      return;
    }

    // Crear la tarea
    const task = new Task({
      title,
      completed: completed || false
    });

    // Validar el documento antes de guardar
    const validationError = task.validateSync();
    if (validationError) {
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
    console.error('❌ Error al crear tarea:', error);
    
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({
        success: false,
        error: 'Error de validación',
        details: error.errors
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Error al crear la tarea',
        message: error instanceof Error ? error.message : 'Error desconocido'
      });
    }
  }
};
