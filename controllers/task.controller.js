import {
  createTask,
  updateMainTaskCompletion,
  getAllTasksByProjectId,
  updateTaskById,
  deleteTaskById,
} from '../services/task.service.js'

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

export const getAllTasksByProjectIdController = async (req, res) => {
  const { projectId } = req.params

  try {
    if (!projectId) {
      res.status(400).json({ message: 'projectId is required' })
    }

    const tasks = await getAllTasksByProjectId(projectId)

    return res.status(200).json({ message: 'Tasks found', data: tasks })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const updateTaskByIdController = async (req, res) => {
  const { id } = req.params
  const updateData = req.body
  try {
    const updatedTask = await updateTaskById(id, updateData)
    return res.status(200).json({
      message: 'Task updated',
      data: updatedTask,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

export const deleteTaskByIdController = async (req, res) => {
  const { id } = req.params
  try {
    const deletedTask = await deleteTaskById(id)
    return res.status(200).json({
      message: 'Task deleted',
      data: deletedTask,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
