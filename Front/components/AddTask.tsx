"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, X } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface AddTaskProps {
  onAdd: (title: string, description: string) => Promise<void>;
}

export const AddTask = ({ onAdd }: AddTaskProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      await onAdd(title, description);
      setTitle('');
      setDescription('');
      setAlertType('success');
      setAlertMessage('Tarea creada correctamente');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Error al crear la tarea');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  if (!isAdding) {
    return (
      <Button
        className="w-full flex items-center gap-2 mb-4"
        variant="outline"
        onClick={() => setIsAdding(true)}
      >
        <Plus className="h-5 w-5" />
        Agregar nueva tarea
      </Button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8"
    >
      <Card className="mb-4">
        <CardContent className="p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Nueva Tarea</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAdding(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <Input
              placeholder="Título de la tarea"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="font-semibold"
              autoFocus
            />
            <Textarea
              placeholder="Descripción de la tarea..."
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => setIsAdding(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                Agregar Tarea
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {showAlert && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 right-4"
        >
          <Alert 
            variant={alertType === 'success' ? 'default' : 'destructive'}
            className={`
              ${alertType === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}
            `}
          >
            {alertType === 'success' ? (
              <CheckCircle className="h-4 w-4 text-green-500" />
            ) : (
              <AlertCircle className="h-4 w-4 text-red-500" />
            )}
            <AlertTitle className={`
              ${alertType === 'success' ? 'text-green-800' : 'text-red-800'}
            `}>
              {alertType === 'success' ? '¡Tarea Creada! 🎉' : 'Error'}
            </AlertTitle>
            <AlertDescription className={`
              ${alertType === 'success' ? 'text-green-700' : 'text-red-700'}
            `}>
              {alertMessage}
            </AlertDescription>
          </Alert>
        </motion.div>
      )}
    </motion.div>
  );
}; 