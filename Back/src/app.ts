import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/config';
import { apiLimiter } from './middlewares/rateLimit';
import { errorHandler, notFoundHandler } from './middlewares/errorHandler';
import authRoutes from './routes/auth';
import taskRoutes from './routes/routeTask';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('🚀 Iniciando configuración del servidor...');

const app = express();

// Middlewares de seguridad
console.log('⚙️ Configurando middlewares de seguridad...');
app.use(helmet());

// Configuración manual de CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Client-Id, X-Client-Secret');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Manejar preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log('✅ Middlewares de seguridad configurados');

// Rate limiting
console.log('⚙️ Configurando rate limiting...');
app.use(apiLimiter);
console.log('✅ Rate limiting configurado');

// Logging middleware
app.use((req, res, next) => {
  console.log('\n=================================');
  console.log(`📨 Nueva petición recibida`);
  console.log(`📍 ${req.method} ${req.path}`);
  console.log('📦 Headers:', req.headers);
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
app.use('/api/auth', authRoutes);
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

// Manejo de errores
console.log('⚙️ Configurando manejo de errores...');
app.use(notFoundHandler);
app.use(errorHandler);
console.log('✅ Manejo de errores configurado');

// Conexión a MongoDB
console.log('Intentando conectar a MongoDB con URI:', config.mongo.uri);
mongoose.connect(config.mongo.uri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('✅ Conectado exitosamente a MongoDB'))
  .catch(err => {
    console.error('❌ Error conectando a MongoDB:');
    console.error('Detalles del error:', err);
    process.exit(1);
  });

console.log('✨ Configuración del servidor completada');

// Iniciar servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

export default app;