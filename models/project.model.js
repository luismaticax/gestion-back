import mongoose from 'mongoose'

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  completionPercentage: { type: Number },
  team: { type: ObjectId, ref: 'Team', required: true }, // Reference to the team collection
  startDate: { type: Date },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
})

const ProjectModel = mongoose.model('Project', projectSchema)

export default ProjectModel
