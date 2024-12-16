import { Router } from 'express'
import {
  createProjectController,
  deleteProjectByIdController,
  getAllProjectsByTeamIdController,
  getAllProjectsController,
  getProjectByIdController,
  updateProjectCompletionController,
  getDashboardController,
} from '../controllers/project.controller.js'

const router = Router()

router.get('/', getAllProjectsController)
router.get('/:id', getProjectByIdController)
router.get('/all/:id', getAllProjectsByTeamIdController)
router.delete('/:id', deleteProjectByIdController)
router.post('/create', createProjectController)
router.put('/:projectId/completion', updateProjectCompletionController)
router.get('/dashboard/:id', getDashboardController)

export default router
