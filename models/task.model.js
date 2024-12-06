import mongoose from 'mongoose'

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high'], required: true },
  status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
  project: { type: ObjectId, ref: 'Project', required: true },
  assignedTo: { type: ObjectId, ref: 'User' }, //Ref al user
  dueDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
})

const TaskModel = mongoose.model('Task', taskSchema)

export default TaskModel
