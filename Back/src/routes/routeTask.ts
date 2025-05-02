// src/routes/routeTask.ts
import { Router } from 'express';
import { createTask, getTasks, updateTask, deleteTask } from '../controllers/tasks';
import { authenticateToken, validateApiClient } from '../middlewares/auth';

const router = Router();


// Middleware de logging para este router
router.use((req, res, next) => {

  next();
});

// Todas las rutas requieren autenticación y validación de cliente
router.use(authenticateToken as any);
router.use(validateApiClient as any);

// Obtener todas las tareas
router.get('/', getTasks as any);

// Crear una nueva tarea
router.post('/', createTask as any);

// Actualizar una tarea
router.put('/:id', updateTask as any);

// Eliminar una tarea
router.delete('/:id', deleteTask as any);



export default router;
