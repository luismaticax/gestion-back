import { TeamModel, GuserModel } from '../models/index.js'

// Get team by ID
export const getTeamById = async (id) => {
  console.log('Calling getTeamById service: ', id)
  try {
    const team = await TeamModel.findById(id).populate('leader').populate('members')
    if (!team) {
      throw new Error(`Team with id ${id} not found`)
    }
    return team
  } catch (error) {
    throw new Error(`Error retrieving team by ID: ${error.message}`)
  }
}

//Create team with leader assigned
export const createTeam = async (teamData) => {
  console.log('Calling createTeam service: ', teamData)
  try {
    const existingTeam = await TeamModel.findOne({ name: teamData.name })
    if (existingTeam) {
      throw new Error('Team already exists')
    }

    const leader = await GuserModel.findById(teamData.leader)
    if (!leader) {
      throw new Error('Leader not found')
    }

    const newTeam = new TeamModel({
      name: teamData.name,
      leader: teamData.leader,
      members: teamData.members || [],
      created_at: new Date(),
    })

    await newTeam.save()

    return newTeam
  } catch (error) {
    throw new Error(`Error creating team: ${error.message}`)
  }
}

//Remove a member from a team
export const removeMemberFromTeam = async (teamId, memberId, leaderId) => {
  try {
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

    if (!updatedTeam) {
      throw new Error('Failed to update team')
    }

    return { updatedTeam }
  } catch (error) {
    console.error('Error removing member from team:', error)
    throw new Error(`Error removing member from team: ${error.message}`)
  }
}

//Add a member to a team
export const addMemberToTeam = async (teamId, memberId, leaderId) => {
  try {
    //check if team exists
    const team = await TeamModel.findById(teamId)
    if (!team) {
      throw new Error('Team not found')
    }

    //check if req is made by leader
    if (team.leader.toString() !== leaderId) {
      return { message: 'Only leader can add members' }
    }

    //check if user exists
    const user = await GuserModel.findById(memberId)
    if (!user) {
      throw new Error('User does not exist')
    }

    //Check if member is already a member
    if (team.members.includes(memberId)) {
      return { message: 'Member is already in the team' }
    }

    const updatedTeam = await TeamModel.findByIdAndUpdate(
      teamId,
      { $push: { members: memberId } },
      { new: true },
    )

    if (!updatedTeam) {
      return { message: 'Failed to update team' }
    }

    return { updatedTeam }
  } catch (error) {
    console.error('Error adding member from team:', error)
    throw new Error(`Error adding member to team: ${error.message}`)
  }
}
