import mongoose from 'mongoose'

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const teamSchema = new Schema({
  name: { type: String, required: true },
  leader: { type: ObjectId, ref: 'User', required: true },
  members: [{ type: ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
})

const TeamModel = mongoose.model('Team', teamSchema)

export default TeamModel
