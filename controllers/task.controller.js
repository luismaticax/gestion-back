import { createTask, updateMainTaskCompletion } from '../services/task.service.js'

export const createTaskController = async (req, res) => {
  try {
    const task = await createTask(req.body)
    res.status(201).json(task)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

export const updateMainTaskCompletionController = async (req, res) => {
  const { mainTaskId } = req.params

  console.log('mainTaskId: ', mainTaskId)

  try {
    if (!mainTaskId) {
      res.status(400).json({ message: 'mainTaskId is required' })
    }

    const updatedTask = await updateMainTaskCompletion(mainTaskId)

    return res.status(200).json({
      message: 'Task updated',
      data: updatedTask,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
