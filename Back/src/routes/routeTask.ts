// src/routes/routeTask.ts
import { Router } from 'express';
import { createTask, getTasks } from '../controllers/tasks';

const router = Router();

console.log('🔧 Iniciando configuración del router de tareas...');

// Middleware de logging para este router
router.use((req, res, next) => {
  console.log('=================================');
  console.log('🎯 Petición en router de tareas:');
  console.log(`- Método: ${req.method}`);
  console.log(`- Ruta completa: /api/tasks${req.path}`);
  console.log(`- Body:`, req.body);
  console.log('=================================');
  next();
});

// Obtener todas las tareas
router.get('/', getTasks);

// Crear una nueva tarea
router.post('/', createTask);

console.log('✅ Router de tareas configurado correctamente');
console.log('📝 Rutas disponibles:');
console.log('- GET  /api/tasks     → Obtener todas las tareas');
console.log('- POST /api/tasks     → Crear una nueva tarea');

export default router;
