"use client";

import { useAuth } from '@/hooks/useAuth';
import { TaskList } from '../components/TaskList';
import { LoginForm } from '../components/auth/LoginForm';

export default function Home() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <TaskList />
    </div>
  );
}