import mongoose from 'mongoose'

const { Schema } = mongoose

const roleSchema = new Schema({
  name: { type: String, required: true, lowercase: true, trim: true, unique: true },
})

const RoleModel = mongoose.model('Role', roleSchema)

export default RoleModel
