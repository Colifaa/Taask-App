import app from './app';
import { env } from './config/env';
import connectDB from './config/db';

const MAX_RETRIES = 5;
const BASE_PORT = 3001;

const startServer = async (retryCount = 0) => {
  const PORT = BASE_PORT + retryCount;

  try {
    console.log('\n🔄 Iniciando servidor...');
    
    // Conectar a MongoDB
    console.log('📡 Conectando a MongoDB...');
    await connectDB();
    console.log('✅ Conexión a MongoDB establecida');

    // Iniciar el servidor HTTP
    console.log(`🚀 Intentando iniciar servidor en puerto ${PORT}...`);
    
    const server = app.listen(PORT, () => {
      console.log('\n=================================');
      console.log(`✨ Servidor iniciado correctamente`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`📚 Documentación: http://localhost:${PORT}/status`);
      console.log('=================================\n');
    });

    // Manejar errores del servidor
    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE' && retryCount < MAX_RETRIES) {
        console.log(`⚠️ Puerto ${PORT} en uso, intentando con puerto ${PORT + 1}...`);
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
  console.log('\n👋 Cerrando servidor de forma segura...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('\n👋 Cerrando servidor de forma segura...');
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
console.log('\n🚀 Iniciando aplicación...');
startServer(); 