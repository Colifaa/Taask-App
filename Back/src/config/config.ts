import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Config {
  env: string;
  port: number;
  mongo: {
    uri: string;
  };
  jwt: {
    secret: string;
  };
  api: {
    clientId: string;
    clientSecret: string;
  };
  cors: {
    origin: string[];
    methods: string[];
    allowedHeaders: string[];
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

export const config: Config = {
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3002', 10),
  mongo: {
    uri: process.env.MONGO_URI!
  },
  jwt: {
    secret: process.env.JWT_SECRET!
  },
  api: {
    clientId: process.env.API_CLIENT_ID!,
    clientSecret: process.env.API_CLIENT_SECRET!
  },
  cors: {
    origin: [process.env.FRONTEND_URL || 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-client-id', 'x-client-secret']
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100 // límite de peticiones por IP
  }
}; 