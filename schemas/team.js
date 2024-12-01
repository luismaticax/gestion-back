import mongoose from 'mongoose'

const { Schema } = mongoose

const teamSchema = new Schema({
  name: { type: String, required: true },
  leader: { type: ObjectId, ref: 'User', required: true },
  members: [{ type: ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
})

const Team = mongoose.model('Team', teamSchema)

export default Team
