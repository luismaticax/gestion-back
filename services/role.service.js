import { RoleModel } from '../models/index.js'
import role from '../routes/role.js'

export const getRoleById = async (id) => {
  console.log('Calling getRoleById service: ', id)
  try {
    const role = await RoleModel.findById(id)
    if (!role) {
      throw new Error('Role not found')
    }
    return role
  } catch (error) {
    throw new Error(`Error retrieving role by ID: ${error.message}`)
  }
}

export const createRole = async (roleData) => {
  console.log('Calling createRole service: ', roleData)
  try {
    const existingRole = await RoleModel.findOne({ name: roleData.name })
    if (existingRole) {
      throw new Error('Role already exists')
    }

    const newRole = new RoleModel({
      name: roleData.name,
    })

    await newRole.save()

    return newRole
  } catch (error) {
    console.log('Error creating role: ', error.message)
    throw new error(`Error creating role: ${error.message}`)
  }
}
