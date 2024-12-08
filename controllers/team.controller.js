import {getTeamById,
	createTeam,
	removeMemberFromTeam,
	addMemberToTeam} from "../services/team.service.js";

export const getTeamByIdController = async (req, res) => {
	try{
		const team = await getTeamById(req.params.id);
		res.status(200).send(team);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}

}

export const createTeamController = async (req, res) => {
	try {
		const newTeam = await createTeam(req.body);
		res.status(201).json(newTeam);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}

}

export const removeMemberFromTeamController = async (req, res) => {
	try{
		const {teamId, memberId} = req.body;
		const leaderId = req.body.leaderId; //Bypass auth, replace with req.user.id

		const result = await removeMemberFromTeam(teamId, memberId, leaderId);

		if (result.message){
			return res.status(400).json({message: result.message});
		}

		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
}

export const addMemberToTeamController = async (req, res) => {
	try{
		const {teamId, memberId} = req.body;
		const leaderId = req.body.leaderId; //Bypass auth, replace with req.user.id

		const result = await addMemberToTeam(teamId, memberId, leaderId);

		if (result.message){
			return res.status(400).json({message: result.message});
		}

		res.status(200).json(result);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
}