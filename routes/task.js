import {Router} from 'express';
import {
	getTaskByIdController,
	deleteTaskByIdController,
	createTaskController,
} from "../controllers/task.controller.js";

const router = Router();

router.get('/:id', getTaskByIdController);
router.delete('/:id', deleteTaskByIdController);
router.post('/create', createTaskController);

export default router;