import mongoose from 'mongoose'

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const teamSchema = new Schema({
  name: { type: String, required: true },
  leader: { type: ObjectId, ref: 'GUser', required: true },
  members: [{ type: ObjectId, ref: 'GUser' }],
  createdAt: { type: Date, default: Date.now },
})

const TeamModel = mongoose.model('Team', teamSchema)

export default TeamModel
