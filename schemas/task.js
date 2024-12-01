import mongoose, { mongo } from 'mongoose'

const { Schema } = mongoose

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['low', 'medium0', 'high'], required: true },
  status: { type: String, enu: ['pending', 'in progress', 'completed'], default: 'pending' },
  project: { type: ObjectId, ref: 'Project', required: true },
  assignedTo: { type: ObjectId, ref: 'User' },
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
})

const Task = mongoose.model('Task', taskSchema)

export default Task
