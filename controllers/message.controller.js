import {
  getMessagesByTaskId,
  createMessage,
  updateMessageById,
  deleteMessageById,
  getMessageById,
} from '../services/message.service.js'

export const getMessagesByTaskIdController = async (req, res) => {
  try {
    const messages = await getMessagesByTaskId(req.params.taskId)
    res.status(200).send(messages)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const createMessageController = async (req, res) => {
  try {
    const result = await createMessage(req.body)
    res.status(201).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const updateMessageController = async (req, res) => {
  try {
    const updatedMessage = await updateMessageById(req.params.id, req.body)
    res.status(200).send(updatedMessage)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const deleteMessageByIdController = async (req, res) => {
  try {
    const result = await deleteMessageById(req.params.id)
    res.status(200).send(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const getMessageByIdController = async (req, res) => {
  try {
    const message = await getMessageById(req.params.id)
    res.status(200).send(message)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
