import { createRole, getRoleById } from '../services/role.service.js'

export const getRoleByIdController = async (req, res) => {
  try {
    const { id } = req.params
    const role = await getRoleById(id) // Llama al servicio
    res.status(200).json(role)
  } catch (error) {
    console.error(error.message)
    res.status(500).json({ message: error.message })
  }
}

export const createRoleController = async (req, res) => {
  try {
    const role = await createRole(req.body)
    res.status(201).json(role)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message })
  }
}
