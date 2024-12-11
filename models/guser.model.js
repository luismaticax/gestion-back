import mongoose from 'mongoose'
import validate from 'mongoose-validator'
import bcrypt from "bcrypt";

const Schema = mongoose.Schema
const { ObjectId } = Schema.Types
const emailValidator = validate ({validator: 'isEmail'})


const guserSchema = new Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
		trim: true,
		validate: emailValidator,
	},
	password: { type: String, required: true, select: false },
	role: { type: ObjectId, ref: 'Role', required: true },
	firstName: { type: String, required: true, lowercase: true, trim: true },
	lastName: { type: String, required: true, lowercase: true, trim: true },
	isActive: { type: Boolean, default: true }
		})

guserSchema.method('checkPassword', async function checkPassword(potentialPassword) {
	if (!potentialPassword) {
		return Promise.reject(new Error('Password is required'))
	}

	const isMatch = await bcrypt.compare(potentialPassword, this.password)

	return { isOk: isMatch, isLocked: !this.isActive }
})

const GuserModel = mongoose.model('GUser', guserSchema)

export default GuserModel