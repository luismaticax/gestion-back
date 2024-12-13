import {
  getProjectbyId,
  getAllProjectsByTeamId,
  deleteProjectById,
  createProject,
  updateProjectCompletion,
} from '../services/project.service.js'

export const getProjectByIdController = async (req, res) => {
  try {
    const project = await getProjectbyId(req.params.id)
    res.status(200).send(project)
  } catch (error) {
    res.status(500).json({ mesage: error.message })
  }
}

export const getAllProjectsController = async (req, res) => {
  try {
    const projects = await getAllProjectsByTeamId(req.params.id)
    res.status(200).send(projects)
  } catch (error) {
    res.status(500).json({ mesage: error.message })
  }
}

export const deleteProjectByIdController = async (req, res) => {
  try {
    const result = await deleteProjectById(req.params.id)
    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mesage: error.message })
  }
}

export const createProjectController = async (req, res) => {
  try {
    const newProject = await createProject(req.body)
    res.status(201).json(newProject)
  } catch (error) {
    console.error(error)
    res.status(500).json({ mesage: error.message })
  }
}

export const updateProjectCompletionController = async (req, res) => {
  const { projectId } = req.params
  try {
    if (!projectId) {
      res.status(400).json({ message: 'projectId is required' })
    }

    const updatedProject = await updateProjectCompletion(projectId)

    return res.status(200).json({
      message: 'Project updated',
      data: updatedProject,
    })
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}
