const express = require('express')
const router = express.Router()
const clubController = require('../controllers/clubController')

// Enable authentication middleware if required
// const requireAuth = require('../middleware/requireAuth')
// router.use(requireAuth)

// Routes
router.get('/', clubController.getClubs)
router.get('/:id', clubController.getClubById)
router.post('/', clubController.createClub)
router.patch('/:id', clubController.updateClubById)
router.delete('/:id', clubController.deleteClubById)

module.exports = router
