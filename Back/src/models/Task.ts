import mongoose, { Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'El título es requerido'],
    trim: true
  },
  completed: { 
    type: Boolean, 
    default: false 
  }
}, {
  timestamps: true // Esto agregará automáticamente createdAt y updatedAt
});

export default mongoose.model<ITask>('Task', TaskSchema);