import mongoose from 'mongoose'
import updateTimestamps from '../middlewares/updateTimestamps.db.js'

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, enum: ['low', 'medium', 'high', 'critical'], required: true },
  status: { type: String, enum: ['pending', 'in progress', 'completed'], default: 'pending' },
  completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
  weight: { type: Number, default: 0, min: 0, max: 100 },
  project: { type: ObjectId, ref: 'Project', required: true }, // Ref to project collection
  assignedTo: { type: ObjectId, ref: 'GUser' }, //Ref to GUser collection
  startDate: { type: Date },
  dueDate: { type: Date },
  createdBy: { type: ObjectId, ref: 'GUser', required: true },
  createdOn: { type: Date, default: Date.now },
  subTasks: [{ type: ObjectId, ref: 'Task' }],
  updatedOn: { type: Date, default: Date.now },
})

taskSchema.plugin(updateTimestamps)

const TaskModel = mongoose.model('Task', taskSchema)

export default TaskModel
