import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

interface AuthRequest extends Request {
  user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
 

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
  
    res.status(401).json({
      success: false,
      error: 'Token de autenticación no proporcionado'
    });
    return;
  }

  try {
   
    const decoded = jwt.verify(token, config.jwt.secret);
   
    req.user = decoded;
    next();
  } catch (error: any) {
    console.error('❌ Error al verificar token:', error);
    console.error('Detalles del error:', {
      name: error.name,
      message: error.message,
      stack: error.stack
    });
    res.status(403).json({
      success: false,
      error: 'Token inválido o expirado',
      details: error.message
    });
  }
};

export const validateApiClient = (req: Request, res: Response, next: NextFunction): void => {
  const clientId = req.headers['x-client-id'];
  const clientSecret = req.headers['x-client-secret'];



  if (!clientId || !clientSecret) {
   
    res.status(401).json({
      success: false,
      error: 'Credenciales de cliente no proporcionadas'
    });
    return;
  }

  if (clientId !== config.api.clientId || clientSecret !== config.api.clientSecret) {

    res.status(401).json({
      success: false,
      error: 'Credenciales de cliente inválidas'
    });
    return;
  }

 
  next();
}; 