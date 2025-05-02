// src/config/env.ts
import 'dotenv/config';

// Validar que las variables requeridas existan
const requiredEnvVars = ['MONGO_URI'];

for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Falta la variable de entorno: ${envVar}`);
  }
}

// Exportar variables con tipado
export const env = {
  MONGO_URI: process.env.MONGO_URI as string,
  // JWT_SECRET: process.env.JWT_SECRET as string,
  // CLIENT_SECRET: process.env.CLIENT_SECRET as string,
  PORT: process.env.PORT ? parseInt(process.env.PORT) : 3001,
};