import mongoose from 'mongoose'
import updateTimestamps from '../middlewares/updateTimestamps.db.js'

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in progress', 'completed'],
    default: 'pending',
  },
  completionPercentage: { type: Number, default: 0, min: 0, max: 100 },
  weight: { type: Number, min: 0, max: 100, default: 0 },
  project: { type: ObjectId, ref: 'Project', required: true }, // Ref to project collection
  assignedTo: { type: ObjectId, ref: 'GUser' }, //Ref to GUser collection
  startDate: { type: Date },
  dueDate: { type: Date },
  isOverdue: { type: Boolean, default: false },
  createdBy: { type: ObjectId, ref: 'GUser', required: true },
  createdOn: { type: Date, default: Date.now },
  parentTask: { type: ObjectId, ref: 'Task', default: null },
  updatedOn: { type: Date, default: Date.now },
  lastUpdatedBy: { type: ObjectId, ref: 'GUser' },
})

taskSchema.plugin(updateTimestamps)

const TaskModel = mongoose.model('Task', taskSchema)

export default TaskModel
