import {deleteTaskById, getTaskById, createTask} from '../services/task.service.js'

export const getTaskByIdController = async (req, res) => {
	try{
		const task = await getTaskById(req.params.id);
		res.status(200).send(task);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
}

export const deleteTaskByIdController = async (req, res) => {
	try{
		const result = await deleteTaskById(req.params.id);
		res.status(200).send(result);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
}

export const createTaskController = async (req, res) => {
	try{
		const createdTask = await createTask(req.body);
		res.status(201).send(createdTask);
	} catch (error) {
		res.status(500).json({message: error.message});
	}
}