"use client";

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface AuthAlertProps {
  show: boolean;
  type: 'success' | 'error';
  message: string;
}

export const AuthAlert = ({ show, type, message }: AuthAlertProps): JSX.Element | null => {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Alert 
        variant={type === 'success' ? 'default' : 'destructive'}
        className={`
          ${type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}
          shadow-lg
        `}
      >
        {type === 'success' ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <AlertCircle className="h-4 w-4 text-red-500" />
        )}
        <AlertTitle className={`
          ${type === 'success' ? 'text-green-800' : 'text-red-800'}
          font-bold
        `}>
          {type === 'success' ? '¡Éxito!' : 'Error'}
        </AlertTitle>
        <AlertDescription className={`
          ${type === 'success' ? 'text-green-700' : 'text-red-700'}
        `}>
          {message}
        </AlertDescription>
      </Alert>
    </div>
  );
}; 