"use client";

import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { TodoForm } from "../components/ui/todo-form";
import { TodoList } from "../components/ui/todo-list";
import { Plus } from "lucide-react";
import { Toaster } from "../components/ui/sonner";
import { TaskList } from '../components/TaskList';
import { AddTask } from '../components/AddTask';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-8">Lista de Tareas</h1>
        <div className="space-y-6">
          <AddTask />
          <TaskList />
        </div>
      </div>
    </main>
  );
}