"use client";

import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { TodoForm } from "../components/ui/todo-form";
import { TodoList } from "../components/ui/todo-list";
import { Plus } from "lucide-react";
import { Toaster } from "../components/ui/sonner";
import { TaskList } from '../components/TaskList';
import { AddTask } from '../components/AddTask';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TaskList />
      <Toaster />
    </div>
  );
}