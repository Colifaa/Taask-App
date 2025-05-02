import app from './app';
import mongoose from 'mongoose';
import { config } from './config/config';

const MAX_RETRIES = 5;
const BASE_PORT = 3001;

const startServer = async (retryCount = 0) => {
  const PORT = BASE_PORT + retryCount;

  try {
  
    
    // Conectar a MongoDB
   
    await mongoose.connect(config.mongo.uri);
   

    // Iniciar el servidor HTTP
 
    
    const server = app.listen(PORT, () => {
    
    });

    // Manejar errores del servidor
    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE' && retryCount < MAX_RETRIES) {
    
        server.close();
        startServer(retryCount + 1);
      } else if (retryCount >= MAX_RETRIES) {
        console.error('❌ Se alcanzó el límite máximo de reintentos');
        process.exit(1);
      } else {
        console.error('❌ Error en el servidor:', error);
        process.exit(1);
      }
    });

  } catch (error) {
    console.error('\n❌ Error fatal al iniciar el servidor:', error);
    process.exit(1);
  }
};

// Manejar cierre gracioso del servidor
process.on('SIGTERM', () => {

  process.exit(0);
});

process.on('SIGINT', () => {
 
  process.exit(0);
});

// Manejar errores no capturados
process.on('uncaughtException', (error) => {
  console.error('\n❌ Error no capturado:', error);
  process.exit(1);
});

process.on('unhandledRejection', (error) => {
  console.error('\n❌ Promesa rechazada no manejada:', error);
  process.exit(1);
});

// Iniciar el servidor

startServer(); 