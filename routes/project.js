import {Router} from "express";
import {
	createProjectController,
	deleteProjectByIdController,
	getAllProjectsController,
	getProjectByIdController
} from "../controllers/project.controller.js";

const router = Router();

router.get('/:id', getProjectByIdController);
router.get('/all/:id', getAllProjectsController)
router.delete('/:id', deleteProjectByIdController);
router.post('/create', createProjectController);

export default router;

