import mongoose from 'mongoose'

const { Schema } = mongoose

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  team: { type: ObjectId, ref: 'Team', required: true }, // referencia al team
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  createdAt: { type: Date, default: Date.now },
})

const Project = mongoose.model('Project', projectSchema)

export default Project
