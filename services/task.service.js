import { TaskModel, GuserModel, ProjectModel } from '../models/index.js'
import { calculateTaskCompletion } from '../utils/projectUtils.js'
import { ObjectId } from 'mongodb'

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
