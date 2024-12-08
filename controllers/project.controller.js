import {getProjectbyId, getAllProjectsByTeamId, deleteProjectById, createProject} from "../services/project.service.js";

export const getProjectByIdController = async (req, res) => {
	try{
		const project = await getProjectbyId(req.params.id);
		res.status(200).send(project);
	} catch (error) {
		res.status(500).json({mesage: error.message});
	}
}

export const getAllProjectsController = async (req, res) => {
	try{
		const projects = await getAllProjectsByTeamId(req.params.id);
		res.status(200).send(projects);
	} catch (error) {
		res.status(500).json({mesage: error.message});
	}
}

export const deleteProjectByIdController = async (req, res) => {
	try{
		const result = await deleteProjectById(req.params.id);
		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({mesage: error.message});
	}
}

export const createProjectController = async (req, res) => {
	try{
		const newProject = await createProject(req.body);
		res.status(201).json(newProject);
	} catch (error) {
		console.error(error);
		res.status(500).json({mesage: error.message});
	}
}