import { Request, Response, NextFunction } from 'express';
import { config } from '../config/config';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Error:', {
    message: err.message,
    stack: config.env === 'development' ? err.stack : undefined,
    path: req.path,
    method: req.method,
    body: req.body,
    query: req.query,
    params: req.params,
    timestamp: new Date().toISOString()
  });

  res.status(500).json({
    success: false,
    error: config.env === 'development' ? err.message : 'Error interno del servidor'
  });
};

export const notFoundHandler = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Ruta no encontrada'
  });
}; 