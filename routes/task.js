import { Router } from 'express'
import {
  createTaskController,
  updateMainTaskCompletionController,
} from '../controllers/task.controller.js'

const router = Router()

router.post('/create', createTaskController)
router.put('/:mainTaskId/completion', updateMainTaskCompletionController)

export default router
