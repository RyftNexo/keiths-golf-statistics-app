const Club = require('../models/Club')

const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find({})
    res.status(200).json(clubs)
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})
  }
}

const getClub = async (req, res) => {
  try {
    const {_id} = req.params
    const club = await Club.findById(_id)
    res.status(200).json(club)
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})
  }
}

const createClub = async (req, res) => {
  try {
    const club = await Club.create(req.body)
    res.status(200).json(club)
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})
  }
}

const updateClub = async (req, res) => {
  const {id} = req.params
  const {clubName, clubBrand, shot, club, deleteShot, avgYards, shotId} = req.body

  try {
    if (clubName && clubBrand) {
      await Club.findByIdAndUpdate(id, {clubName, brand: clubBrand})
      res.status(200).send('Success')
    }

    if (shot) {
      const clubs = await Club.findOneAndUpdate(
        {_id: id},
        {shots: [...club.shots, shot], totalShots: club.totalShots + 1},
        {new: true}
      )
      res.status(200).json(clubs)
    }

    if (deleteShot) {
      const data = await Club.findOneAndUpdate(
        {_id: id},
        {shots: club.shots.filter(item => item.id !== shotId), avgYards, totalShots: club.totalShots - 1},
        {new: true}
      )
      res.status(200).json(data)
    }
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})
  }
}

const deleteClub = async (req, res) => {
  try {
    const {id} = req.params
    await Club.findByIdAndDelete(id)
    const clubs = await Club.find({})
    res.status(200).json(clubs)
  } catch (error) {
    console.error(error)
    res.status(400).json({error: error.message})
  }
}

module.exports = {createClub, getClub, getClubs, updateClub, deleteClub}
