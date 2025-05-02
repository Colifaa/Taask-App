"use client"

import { useAuth } from '@/hooks/useAuth';
import { Button } from './ui/button';
import { LogIn, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Taask App
            </Link>
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <Button
                onClick={logout}
                variant="outline"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Cerrar Sesión
              </Button>
            ) : (
              <Link href="/login">
                <Button variant="default" className="flex items-center gap-2">
                  <LogIn className="h-4 w-4" />
                  Iniciar Sesión
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}; 