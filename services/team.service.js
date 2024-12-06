import {TeamModel, GuserModel} from '../models/index.js'
import teamModel from "../models/team.model.js";

// Get team by ID
export const getTeamById = async (id) => {
	try {
		const team = await TeamModel.findById(id).populate('leader').populate('members');
		if (!team) {
			throw new Error('Team not found');
		}
		return team;
	} catch (error) {
		throw new Error(`Error retrieving team by ID: ${error.message}`);
	}
};

//Create team with leader assigned
export const createTeam = async (teamData) => {
	try{
		const leader = await GuserModel.findById(teamData.leader);
		if (!leader) {
			throw new Error('Leader not found');
		}

		const newTeam = new TeamModel({
			name: teamData.name,
			leader: teamData.leader,
			members: teamData.members || [],
			created_at: new Date(),
		})

		await newTeam.save()

		await GuserModel.findByIdAndUpdate(leader._id,{$push: {team:newTeam._id}})
		//Checks if any user doesn't exist
		if (teamData.members && teamData.members.length > 0) {
			const members = await GuserModel.find({'_id': {$in: teamData.members}});
			if (members.lenght !== teamData.members.length) {
				throw new Error('Some members do not exist')
			}
		}
		//Updates user collection for new members adding new team
		await GuserModel.updateMany({_id:{$in: teamData.members}},
			{$push: {team:newTeam._id}},)

		return newTeam;
	}
	catch (error) {
		throw new Error(`Error creating team: ${error.message}`);
	}
}

//Remove a member from a team
export const removeMemberFromTeam = async (teamId, memberId, leaderId) => {
  try{
    const team = await TeamModel.findById(teamId)

    if (!team) {
      return { message: 'Team not found' }
    }

    if (team.leader.toString() !== leaderId) {
      return { message: 'Only leader can remove members' }
    }

    const updatedTeam = await TeamModel.findByIdAndUpdate(
      teamId,
      { $pull: { members: memberId } },
      { new: true },
    )

    return updatedTeam
  }catch (error) {
	  console.error('Error removing member from team:', error)
	  throw new Error('Error removing member from team')
  }
}

export const addMemberToTeam = async (teamId, memberId, leaderId) => {
	try{

		const team = await TeamModel.findById(teamId)

		if (!team) {
			throw new Error('Team not found')
		}

		if (team.leader.toString() !== leaderId) {
			return { message: 'Only leader can add members' }
		}

		//Check if member is already a member
		if (team.members.includes(memberId)) {
			return { message: 'Member is already in the team' }
		}

		const updatedTeam = await teamModel.findByIdAndUpdate(
			teamId,
			{ $push: { members: memberId } },
			{new:true}
		)

		return updatedTeam
	} catch (error) {
		console.error('Error adding member from team:', error)
		throw new Error('Error adding member to team')
	}
}