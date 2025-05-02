// src/routes/routeTask.ts
import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/tasks';
import { authenticateToken, validateApiClient } from '../middlewares/auth';

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

// Todas las rutas requieren autenticación y validación de cliente
router.use(authenticateToken);
router.use(validateApiClient);

// Obtener todas las tareas
router.get('/', getTasks);

// Crear una nueva tarea
router.post('/', createTask);

// Actualizar una tarea
router.put('/:id', updateTask);

// Eliminar una tarea
router.delete('/:id', deleteTask);

console.log('✅ Router de tareas configurado correctamente');
console.log('📝 Rutas disponibles:');
console.log('- GET    /api/tasks          → Obtener todas las tareas');
console.log('- POST   /api/tasks          → Crear una nueva tarea');
console.log('- PUT    /api/tasks/:id      → Actualizar una tarea');
console.log('- DELETE /api/tasks/:id      → Eliminar una tarea');

export default router;
