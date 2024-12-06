import {RoleModel} from '../models/index.js'

export const getRoleById = async (id) => {
	console.log('Calling getRoleById service: ', id)
	try {
		const role = await RoleModel.findById(id);
		if (!role) {
			throw new Error('Role not found');
		}
		return role;
	} catch (error) {
		throw new Error(`Error retrieving role by ID: ${error.message}`);
	}
}
