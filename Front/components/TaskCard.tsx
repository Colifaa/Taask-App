"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Check, Edit, Trash, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { CheckCircle, AlertCircle, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Task {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
}

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedTask: Partial<Task>) => void;
}

export const TaskCard = ({ task, onDelete, onUpdate }: TaskCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<'success' | 'error'>('success');
  const [alertMessage, setAlertMessage] = useState('');
  const { isAuthenticated } = useAuth();

  const handleUpdate = async () => {
    try {
      await onUpdate(task._id, {
        title: editedTitle,
        description: editedDescription,
      });
      setIsEditing(false);
      setAlertType('success');
      setAlertMessage('Tarea actualizada correctamente');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Error al actualizar la tarea');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleDelete = async () => {
    try {
      await onDelete(task._id);
      setAlertType('success');
      setAlertMessage('Tarea eliminada correctamente');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Error al eliminar la tarea');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await onUpdate(task._id, { completed: !task.completed });
      setAlertType('success');
      setAlertMessage(`¡Tarea ${!task.completed ? 'completada con éxito! 🎉' : 'marcada como pendiente'}`);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } catch (error) {
      setAlertType('error');
      setAlertMessage('Error al actualizar el estado de la tarea');
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="mb-4">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={`text-xl font-bold ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {isEditing ? (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="w-full p-2 border rounded"
              />
            ) : (
              task.title
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleToggleComplete}
              className={task.completed ? 'text-green-500' : 'text-gray-500'}
            >
              <Check className="h-4 w-4" />
            </Button>
            {isAuthenticated && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleDelete}
                  className="text-red-500"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full p-2 border rounded min-h-[100px]"
            />
          ) : (
            <p className={`text-gray-600 ${task.completed ? 'line-through' : ''}`}>
              {task.description}
            </p>
          )}
          {isEditing && (
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdate}>
                Guardar
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <AnimatePresence>
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
                ${task.completed ? 'bg-blue-50 border-blue-200' : ''}
              `}
            >
              {alertType === 'success' ? (
                task.completed ? (
                  <ThumbsUp className="h-4 w-4 text-blue-500" />
                ) : (
                  <ThumbsDown className="h-4 w-4 text-green-500" />
                )
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <AlertTitle className={`
                ${alertType === 'success' ? 'text-green-800' : 'text-red-800'}
                ${task.completed ? 'text-blue-800' : ''}
              `}>
                {alertType === 'success' ? '¡Éxito!' : 'Error'}
              </AlertTitle>
              <AlertDescription className={`
                ${alertType === 'success' ? 'text-green-700' : 'text-red-700'}
                ${task.completed ? 'text-blue-700' : ''}
              `}>
                {alertMessage}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}; 