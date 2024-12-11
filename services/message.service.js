import { MessageModel } from '../models/index.js'

//Get message by ID
export const getMessageById = async (id) => {
  console.log('Calling getMessageById service ', id)
  try {
    const message = await MessageModel.findById(id).populate('taskId').populate('guserId')
    if (!message) {
      throw new Error(`Message with id: ${id} not found`)
    }

    return message
  } catch (error) {
    console.error(`Error retrieving message by ID: ${error.message}`)
    throw new Error(`Error retrieving message by ID: ${error.message}`)
  }
}

//Create message
export const createMessage = async (messageData) => {
  console.log('Calling createMessage service: ', messageData)
  try {
    const { taskId, guserId, text } = messageData

    if (!taskId || !guserId || !text) {
      throw new Error(`Missing any required fields: taskId, guserId, text`)
    }

    const newMessage = new MessageModel({
      taskId,
      guserId,
      text,
      createdOn: new Date(),
    })

    await newMessage.save()
    return newMessage
  } catch (error) {
    console.error(`Error creating createMessage: ${error.message}`)
    throw new error(`Error creating createMessage: ${error.message}`)
  }
}

//Upd message
export const updateMessageById = async (id, updateData) => {
  console.log('Calling updateMessageByIdService: ', id)
  try {
    const updatedMessage = await MessageModel.findByIdAndUpdate(id, updateData, { new: true })
    if (!updatedMessage) {
      throw new Error(`Message with id: ${id} not found`)
    }

    return updatedMessage
  } catch (error) {
    console.error(`Error updating updateMessageById: ${error.message}`)
    throw new error(`Error updating updateMessageById: ${error.message}`)
  }
}

//delete message
export const deleteMessageById = async (id) => {
  console.log('Calling deleteMessageById Service: ', id)

  try {
    const deletedMessage = MessageModel.findByIdAndDelete(id)
    if (!deletedMessage) {
      throw new Error(`Message with id: ${id} not found`)
    }

    return deletedMessage
  } catch (error) {
    console.log(`Error deleting message by ID: ${error.message}`)
    throw new error(`Error deleting message by ID: ${error.message}`)
  }
}

//get messages by task
export const getMessagesByTaskId = async (taskId) => {
  console.log('Calling getMessagesByTaskId Service: ', taskId)
  try {
    const messages = MessageModel.find({ taskId })
      .populate('guserId', 'firstName lastName')
      .select('text createdOn updatedOn')
      .lean()

    if (!messages || messages.length === 0) {
      return { message: `No messages found for task with id ${taskId}` }
    }

    messages.forEach((message) => {
      message.createdOn = new Date(message.createdOn.toLocaleString())
    })

    return messages
  } catch (error) {
    console.error(`Error retrieving messages by taskId: ${error.message}`)
    throw new error(`Error deleting message by ID: ${error.message}`)
  }
}
