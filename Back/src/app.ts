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



const app = express();

// Middlewares de seguridad

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


// Rate limiting

app.use(apiLimiter);


// Logging middleware
app.use((req, res, next) => {

  if (Object.keys(req.body).length > 0) {
  
  }

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

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);


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

app.use(notFoundHandler);
app.use(errorHandler);


// Conexión a MongoDB

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



// Iniciar servidor
const PORT = config.port;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

export default app;