import { useRouter } from 'next/router';
import { Button } from './components/ui/button';

export default function App() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Bienvenido a Taask</h1>
        <p className="text-gray-600">Tu aplicación de gestión de tareas</p>
        <div className="space-x-4">
          <Button onClick={() => router.push('/login')}>
            Iniciar Sesión
          </Button>
        </div>
      </div>
    </div>
  );
} 