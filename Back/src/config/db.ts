import mongoose from 'mongoose';
import { env } from './env';

const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {
      serverSelectionTimeoutMS: 10000, // Aumentado a 10 segundos
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000, // Agregado timeout de conexión
      maxPoolSize: 10 // Limitar el número de conexiones
    });
    console.log('✅ MongoDB conectado en:', mongoose.connection.host);
  } catch (error) {
    console.error('❌ Error de conexión a MongoDB:');
    console.error('- Código de error:', (error as any).code);
    console.error('- Mensaje:', (error as any).message);
    console.error('- URI usada:', env.MONGO_URI.split('@')[0] + '@' + '*****'); // Oculta parte de la URI
    process.exit(1);
  }
};

export default connectDB;