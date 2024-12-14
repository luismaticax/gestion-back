import { TaskModel, GuserModel, ProjectModel } from '../models/index.js'
import { calculateTaskCompletion, calculateProjectCompletion } from '../utils/projectUtils.js'
import { ObjectId } from 'mongodb'
import project from '../routes/project.js'

export const createTask = async (taskData) => {
  console.log('Calling createTask service: ', taskData)

  const {
    title,
    priority,
    project,
    assignedTo,
    createdBy,
    startDate,
    dueDate,
    parentTask,
    weight,
    completionPercentage,
  } = taskData

  try {
    //Validate if required fields are in the req
    if (!title || !priority || !project || !createdBy) {
      throw new Error('Missing required fields')
    }

    const projectExists = await ProjectModel.findById(project)
    if (!projectExists) {
      throw new Error(`Project with id ${project} not found`)
    }

    const userExists = await GuserModel.findById(assignedTo)
    if (!userExists) {
      throw new Error(`User with id ${assignedTo} not found for assignedTo`)
    }

    if (parentTask) {
      const parentTaskExists = await TaskModel.findById(parentTask)
      if (!parentTaskExists) {
        throw new Error(`Task with id ${parentTask} not found`)
      }

      const projectid = new ObjectId(project)

      console.log(parentTaskExists.project, projectid)
      if (!parentTaskExists.project.equals(projectid)) {
        throw new Error(`Task with id ${parentTask} does not belong to the project`)
      }
    }

    const newTask = new TaskModel({
      title,
      description: taskData.description || '',
      priority,
      project,
      assignedTo: assignedTo || null,
      startDate: startDate || null,
      dueDate: dueDate || null,
      createdBy,
      parentTask: parentTask || null,
      weight: weight || 0,
      completionPercentage: completionPercentage || 0,
    })
    await newTask.save()
    console.log(`Task: id ${newTask._id} and title ${newTask.title} created successfully`)

    return newTask
  } catch (error) {
    console.error(`Error creating task: ${error.message}`)
    throw new Error(`Error creating task: ${error.message}`)
  }
}

export const updateMainTaskCompletion = async (mainTaskId) => {
  console.log('Calling updateMainTaskCompletion service: ', mainTaskId)
  try {
    const mainTask = await TaskModel.findById(mainTaskId)
    if (!mainTask) {
      throw new Error(`Task with id ${mainTaskId} not found`)
    }

    const subtasks = await TaskModel.find({ parentTask: mainTaskId })

    mainTask.completionPercentage = calculateTaskCompletion(mainTask, subtasks)

    await mainTask.save()

    return mainTask
  } catch (error) {
    console.error(`Error updating task: ${error.message}`)
    throw new Error(`Error updating task: ${error.message}`)
  }
}

export const getAllTasksByProjectId = async (projectId) => {
  console.log('Calling getAllTasksByProject service: ', projectId)
  try {
    const tasks = await TaskModel.find({ project: projectId })

    if (!tasks) {
      throw new Error(`No tasks found for project with id ${projectId}`)
    }

    if (!tasks || tasks.length === 0) {
      return { message: `No tasks found for project with id ${projectId}` }
    }

    const mainTasks = tasks.filter((task) => !task.parentTask)
    const subtasks = tasks.filter((task) => task.parentTask)

    console.log(`Main tasks: ${mainTasks} and subtasks: ${subtasks}`)
    return { mainTasks, subtasks }
  } catch (error) {
    console.error(`Error getting tasks for project with id ${projectId}: ${error.message}`)
    throw new Error(`Error getting tasks for project with id ${projectId}: ${error.message}`)
  }
}

export const updateTaskById = async (taskId, updateData) => {
  console.log('Calling updateTaskById: ', taskId, updateData)
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(taskId, updateData, { new: true })

    if (!updatedTask) {
      return { message: `Task with id ${taskId} not found` }
    }

    if (updatedTask.parentTask) {
      await updateMainTaskCompletion(updatedTask.parentTask)
    }

    const projectId = updatedTask.project
    if (projectId) {
      const project = await ProjectModel.findById(projectId)
      if (!project) {
        throw new Error(`Project with id ${projectId} not found`)
      }

      const tasksInProject = await TaskModel.find({ project: projectId })
      const projectCompletion = calculateProjectCompletion(tasksInProject) // Assuming this function exists

      // Update the project's completionPercentage
      project.completionPercentage = projectCompletion
      await project.save()

      return updatedTask
    }
  } catch (error) {
    console.error(`Error updating task by ID: ${error.message}`)
    throw new Error(`Error updating task by ID: ${error.message}`)
  }
}

export const deleteTaskById = async (taskId) => {
  console.log('Calling deleteTaskById: ', taskId)
  try {
    const task = await TaskModel.findById(taskId)

    if (!task) {
      return { message: `Task with id ${taskId} not found` }
    }

    const subTasks = await TaskModel.find({ parentTask: taskId })
    if (subTasks.lenght > 0) throw new Error('Cannot delete task with subtasks')

    await TaskModel.findByIdAndDelete(taskId)

    if (task.parentTask) {
      await updateMainTaskCompletion(task.parentTask)
    }

    const tasksInProject = await TaskModel.find({ project: task.project })
    const projectCompletion = calculateProjectCompletion(tasksInProject)

    project.completionPercentage = projectCompletion
    await project.save()

    return { message: `Task with id ${taskId} deleted successfully` }
  } catch (error) {
    console.error(`Error deleting task by ID: ${error.message}`)
    throw new Error(`Error deleting task by ID: ${error.message}`)
  }
}
