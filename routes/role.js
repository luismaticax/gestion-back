import { Router } from 'express'
import { createRoleController, getRoleByIdController } from '../controllers/role.controller.js'

const router = Router()

router.get('/:id', getRoleByIdController)
router.post('/create', createRoleController)

export default router
