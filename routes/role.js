import { Router } from 'express';
import { getRoleByIdController } from '../controllers/role.controller.js';

const router = Router();

router.get('/:id', getRoleByIdController);

export default router;