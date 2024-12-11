import {
  getMessageByIdController,
  getMessagesByTaskIdController,
  createMessageController,
  updateMessageController,
  deleteMessageByIdController,
} from '../controllers/message.controller.js'
import { Router } from 'express'

const router = Router()

router.get('/:id', getMessageByIdController)
router.get('/all/:id', getMessagesByTaskIdController)
router.post('/create', createMessageController)
router.delete('/message/:id', deleteMessageByIdController)
router.patch('/message/:id', updateMessageController)

export default router
