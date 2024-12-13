// Calcular el progreso ponderado de una tarea principal basada en sus subtareas
export const calculateTaskCompletion = (task, subtasks) => {
  if (!subtasks || subtasks.length === 0) {
    return task.completionPercentage || 0 // Si no tiene subtareas, usamos el porcentaje de la tarea.
  }

  const totalWeight = subtasks.reduce((sum, subtask) => sum + (subtask.weight || 0), 0)

  if (totalWeight === 0) {
    return 0 // Evitar dividir entre cero.
  }

  const weightedCompletion = subtasks.reduce(
    (sum, subtask) => sum + ((subtask.weight || 0) * (subtask.completionPercentage || 0)) / 100,
    0,
  )

  return Math.round(weightedCompletion) // Retornar el porcentaje ponderado.
}

// Calcular el progreso total del proyecto basado únicamente en las tareas principales
export const calculateProjectCompletion = (tasks) => {
  if (!tasks || tasks.length === 0) {
    return 0 // Si no hay tareas, el progreso es 0.
  }

  const mainTasks = tasks.filter((task) => !task.parentTask)

  if (mainTasks.length === 0) {
    return 0 // Si no hay tareas principales, el progreso es 0.
  }

  const totalWeight = mainTasks.reduce((sum, task) => sum + (task.weight || 0), 0)

  if (totalWeight === 0) {
    return 0 // Evitar dividir entre cero.
  }

  const weightedCompletion = mainTasks.reduce(
    (sum, task) => sum + ((task.weight || 0) * (task.completionPercentage || 0)) / 100,
    0,
  )

  return Math.round((weightedCompletion / totalWeight) * 100) // Normalizar a porcentaje.
}
