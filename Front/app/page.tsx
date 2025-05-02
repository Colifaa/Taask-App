"use client";

import { Toaster } from '../components/ui/sonner';
import { TaskList } from '../components/TaskList';


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TaskList />
      <Toaster />
    </div>
  );
}