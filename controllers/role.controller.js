import { getRoleById } from '../services/role.service.js';

export const getRoleByIdController = async (req, res) => {
	try {
		const { id } = req.params;
		const role = await getRoleById(id); // Llama al servicio
		res.status(200).json(role);
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ message: error.message });
	}
};