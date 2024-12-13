import { ProjectModel, TaskModel, TeamModel } from '../models/index.js'
import { calculateProjectCompletion } from '../utils/projectUtils.js'

//Get project by ID
export const getProjectbyId = async (id) => {
  console.log('Calling getProjectbyId: ', id)
  try {
    const project = await ProjectModel.findById(id).populate('team')

    if (!project) {
      throw new Error(`Project with id ${id} not found`)
    }

    return project
  } catch (error) {
    console.log(`Error retrieving project by ID: ${error.message}`)
    throw new Error(`Error retrieving project by ID: ${error.message}`)
  }
}

//Get all projects by Team ID
export const getAllProjectsByTeamId = async (teamId) => {
  console.log('Calling getAllProjectsByTeamId: ', teamId)
  try {
    const projects = await ProjectModel.find({ team: teamId })

    if (!projects || projects.length === 0) {
      return { message: 'No projects found for this team' }
    }
    console.log(projects)

    return projects
  } catch (error) {
    console.error(`Error retrieving project by team id: ${error.message}`)
    throw new Error(`Error retrieving project by ID: ${error.message}`)
  }
}

//Delete project by ID
export const deleteProjectById = async (id) => {
  console.log('Calling deleteProjectById: ', id)
  try {
    const project = await ProjectModel.findByIdAndDelete(id)
    if (!project) {
      throw new Error(`Project with id ${id} not found`)
    }

    console.log('Project with id ${id} deleted successfully')
    return { message: 'Project with id ${id} deleted successfully' }
  } catch (error) {
    console.error(`Error deleting project by ID: ${error.message}`)
    throw new Error(`Error deleting project by ID: ${error.message}`)
  }
}

//Create project
export const createProject = async (projectData) => {
  console.log('Calling createProject: ', projectData)
  try {
    const teamExists = await TeamModel.findById(projectData.team)
    if (!teamExists) {
      throw new Error(`Team with id ${projectData.team} not found`)
    }

    const newProject = new ProjectModel({
      name: projectData.name,
      description: projectData.description,
      team: projectData.team,
      startDate: projectData.startDate,
      endDate: projectData.endDate,
    })

    await newProject.save()

    console.log(`Project: id ${newProject._id} and name ${newProject.name} created successfully`)
    return newProject
  } catch (error) {
    console.error(`Error creating project: ${error.message}`)
    throw new Error(`Error creating project: ${error.message}`)
  }
}

export const updateProjectCompletion = async (projectId) => {
  console.log('Calling updateProjectCompletion service: ', projectId)
  try {
    const tasks = await TaskModel.find({ project: projectId })

    const projectCompletion = calculateProjectCompletion(tasks)

    const project = await ProjectModel.findById(projectId)
    if (!project) {
      throw new Error(`Project with id ${projectId} not found`)
    }

    project.completionPercentage = projectCompletion
    await project.save()

    return project
  } catch (error) {
    console.error(`Error updating project: ${error.message}`)
    throw new Error(`Error updating project: ${error.message}`)
  }
}
