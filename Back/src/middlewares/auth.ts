import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  console.log('🔍 Verificando autenticación...');
  console.log('Headers recibidos:', req.headers);
  console.log('Token recibido:', authHeader);
  console.log('JWT Secret configurado:', config.jwt.secret);

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    console.log('❌ No se proporcionó token');
    return res.status(401).json({
      success: false,
      error: 'Token de autenticación no proporcionado'
    });
  }

  try {
    console.log('🔑 Intentando verificar token...');
    const decoded = jwt.verify(token, config.jwt.secret);
    console.log('✅ Token decodificado:', decoded);
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error('❌ Error al verificar token:', error);
    console.error('Detalles del error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    return res.status(403).json({
      success: false,
      error: 'Token inválido o expirado',
      details: error.message
    });
  }
};

export const validateApiClient = (req: Request, res: Response, next: NextFunction) => {
  const clientId = req.headers['x-client-id'];
  const clientSecret = req.headers['x-client-secret'];

  console.log('Client ID recibido:', clientId);
  console.log('Client Secret recibido:', clientSecret);
  console.log('Client ID esperado:', config.api.clientId);
  console.log('Client Secret esperado:', config.api.clientSecret);

  if (!clientId || !clientSecret) {
    console.log('Faltan credenciales de cliente');
    return res.status(401).json({
      success: false,
      error: 'Credenciales de cliente no proporcionadas'
    });
  }

  if (clientId !== config.api.clientId || clientSecret !== config.api.clientSecret) {
    console.log('Credenciales de cliente inválidas');
    return res.status(401).json({
      success: false,
      error: 'Credenciales de cliente inválidas'
    });
  }

  console.log('Validación de cliente exitosa');
  next();
}; 