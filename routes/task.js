import { Router } from 'express'
import {
  createTaskController,
  updateMainTaskCompletionController,
  getAllTasksByProjectIdController,
  updateTaskByIdController,
  deleteTaskByIdController,
} from '../controllers/task.controller.js'

const router = Router()

router.post('/create', createTaskController)
router.put('/:mainTaskId/completion', updateMainTaskCompletionController)
router.get('/:projectId/project-tasks', getAllTasksByProjectIdController)
router.put('/:id', updateTaskByIdController)
router.delete('/:id', deleteTaskByIdController)

export default router
