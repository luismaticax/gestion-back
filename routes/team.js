import { Router } from 'express'
import {
  getTeamByIdController,
  createTeamController,
  removeMemberFromTeamController,
  addMemberToTeamController,
} from '../controllers/team.controller.js'

const router = Router();

router.get('/:id', getTeamByIdController);
router.post('/create', createTeamController);
router.delete('/members', removeMemberFromTeamController);
router.patch('/members', addMemberToTeamController);

export default router;
