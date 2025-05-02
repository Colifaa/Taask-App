import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/routeTask';

console.log('🚀 Iniciando configuración del servidor...');

const app = express();

// Middlewares básicos
console.log('⚙️ Configurando middlewares básicos...');
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());
console.log('✅ Middlewares básicos configurados');

// Logging middleware
app.use((req, res, next) => {
  console.log('\n=================================');
  console.log(`📨 Nueva petición recibida`);
  console.log(`📍 ${req.method} ${req.path}`);
  if (Object.keys(req.body).length > 0) {
    console.log('📦 Body:', req.body);
  }
  console.log('=================================\n');
  next();
});

// Ruta de estado
app.get('/status', (req, res) => {
  res.json({ 
    status: 'online',
    message: 'API de Tareas funcionando correctamente',
    timestamp: new Date()
  });
});

// Rutas de la API
console.log('🛣️ Configurando rutas de la API...');
app.use('/api/tasks', taskRoutes);
console.log('✅ Rutas configuradas correctamente');

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ 
    message: 'Bienvenido a la API de Tareas',
    docs: {
      status: '/status',
      tasks: '/api/tasks'
    }
  });
});

// Middleware para rutas no encontradas
app.use((req, res) => {
  console.log(`❌ Ruta no encontrada: ${req.method} ${req.path}`);
  res.status(404).json({ 
    success: false,
    error: 'Ruta no encontrada',
    path: req.path,
    method: req.method,
    availableRoutes: {
      status: '/status',
      tasks: '/api/tasks'
    }
  });
});

console.log('✨ Configuración del servidor completada');

export default app;