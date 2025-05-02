import mongoose, { Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  completed: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'El título es requerido'],
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  completed: { 
    type: Boolean, 
    default: false 
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'El userId es requerido']
  }
}, {
  timestamps: true // Esto agregará automáticamente createdAt y updatedAt
});

export default mongoose.model<ITask>('Task', TaskSchema);