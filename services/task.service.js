import {TaskModel, GuserModel, ProjectModel} from '../models/index.js'

export const getTaskById = async (id) => {
	console.log('Calling getTaskById:', id)
	try{
		const task = await TaskModel.findById(id)
			.populate('project', "name")
			.populate('assignedTo', 'firstname lastname email')

		if (!task) {
			throw new Error(`Task with id ${id} not found`);
		}

		return task;
	}   catch(error){
		console.error(`Error retrieving task by ID: ${error.message}`);
		throw new Error(`Error retrieving task by ID: ${error.message}`);
	}
}

export const deleteTaskById = async (id) => {
	console.log('Calling deleteTaskById: ', id)
	try{
		const task = await TaskModel.findById(id)

		if (!task) {
			throw new Error(`Task with id ${id} not found`);
		}

		await TaskModel.findByIdAndDelete(id)

		if (task.assignedTo){

			await GuserModel.findByIdAndUpdate(
				task.assignedTo,
				{$pull: {tasksAssigned: id}},
				{new: true}
			)
		}
	} catch (error) {
		console.error(`Error removing task by ID: ${error.message}`);
		throw new Error(`Error removing task by ID: ${error.message}`);
	}
}

export const createTask = async (taskData) => {

	try{

		if (taskData.assignedTo){
			const guser = await GuserModel.findById(taskData.assignedTo)
			if (!guser) {
				throw new Error(`User with ID ${taskData.assignedTo} not found`);
			}
		}

		if (taskData.project){
			const project = await ProjectModel.findById(taskData.project)
			if (!project) {
				throw new Error(`User with ID ${taskData.project} not found`);
			}
		}

		const newTask = new TaskModel({
			title: taskData.title,
			description: taskData.description,
			priority: taskData.priority,
			status: taskData.status || 'pending',
			project: taskData.project,
			assignedTo: taskData.assignedTo || null,
			dueDate: taskData.dueDate || null,
		});

		const savedTask = await newTask.save()

		if (taskData.assignedTo) {
			await GuserModel.findByIdAndUpdate(
				taskData.assignedTo,
				{$push: {tasksAssigned: savedTask._id}},
				{new: true}
			)
		}

		return savedTask
	}catch (error) {
		console.error(`Error creating task: ${error.message}`);
		throw new Error(`Error creating task: ${error.message}`);
	}

}