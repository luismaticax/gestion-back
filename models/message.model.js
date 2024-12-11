import mongoose from 'mongoose'
import updateTimestamps from '../middlewares/updateTimestamps.db.js'

const { Schema } = mongoose
const { ObjectId } = Schema.Types

const messageSchema = new Schema({
  taskId: { type: ObjectId, ref: 'Task', required: true },
  guserId: { type: ObjectId, ref: 'Guser', required: true },
  text: { type: String, required: true },
  createdOn: { type: Date, default: Date.now },
  updatedOn: { type: Date },
})

messageSchema.plugin(updateTimestamps)

const MessageModel = mongoose.model('Message', messageSchema)

export default MessageModel
