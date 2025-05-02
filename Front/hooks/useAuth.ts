"use client";

import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AuthAlert } from '@/components/auth/AuthAlert';

// Asegurarnos de que la URL de la API esté correctamente definida
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3002/api';

// Para debug
console.log('API_URL:', API_URL);

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
}

interface ApiError {
  message: string;
}

interface AuthHook {
  token: string | null;
  isAuthenticated: boolean;
  user: AuthState['user'];
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (username: string, email: string, password: string) => Promise<void>;
  showAlert: boolean;
  alertType: 'success' | 'error';
  alertMessage: string;
}

export const useAuth = (): AuthHook => {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    isAuthenticated: false,
    user: null
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const { toast } = useToast();
  const router = useRouter();

  // Al iniciar, intentamos recuperar el token del localStorage
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Verificar la validez del token
      try {
        // Decodificar el token para verificar si está expirado
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        const expirationTime = tokenData.exp * 1000; // Convertir a milisegundos
        
        if (Date.now() < expirationTime) {
          setAuthState(prev => ({
            ...prev,
            token,
            isAuthenticated: true
          }));
        } else {
          // Token expirado
          handleLogout();
        }
      } catch (error) {
        // Token inválido
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setAuthState({
      token: null,
      isAuthenticated: false,
      user: null
    });
  };

  const register = async (username: string, email: string, password: string) => {
    const url = `${API_URL}/auth/register`;
    console.log('Intentando registrar en:', url);
    console.log('Datos:', { username, email });
    
    try {
      const response = await axios.post(url, {
        username,
        email,
        password
      });

      console.log('Respuesta del servidor:', response.data);

      const { token, user } = response.data;
      
      localStorage.setItem('auth_token', token);
      setAuthState({
        token,
        isAuthenticated: true,
        user
      });

      setAlertType('success');
      setAlertMessage('¡Cuenta creada exitosamente! 🎉');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);

      window.location.href = '/';
    } catch (error) {
      console.error('Error completo:', error);
      const apiError = error as { response?: { data: ApiError } };
      const errorMessage = apiError.response?.data.message || "Error durante el registro";
      
      setAlertType('error');
      setAlertMessage(errorMessage);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      
      throw new Error(errorMessage);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password
      });

      const { token, user } = response.data;
      
      localStorage.setItem('auth_token', token);
      setAuthState({
        token,
        isAuthenticated: true,
        user
      });

      setAlertType('success');
      setAlertMessage('¡Bienvenido de nuevo! 👋');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);

      window.location.href = '/';
    } catch (error) {
      const apiError = error as { response?: { data: ApiError } };
      const errorMessage = apiError.response?.data.message || "Error al iniciar sesión";
      
      setAlertType('error');
      setAlertMessage(errorMessage);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      
      throw new Error(errorMessage);
    }
  };

  const logout = () => {
    handleLogout();
    setAlertType('success');
    setAlertMessage('¡Hasta pronto! 👋');
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
    window.location.href = '/login';
  };

  return {
    ...authState,
    login,
    logout,
    register,
    showAlert,
    alertType,
    alertMessage
  };
}; 