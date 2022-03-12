const express = require('express')
const router = express.Router()
const calculatorController = require('../controllers/calculator')

router.get('/', calculatorController.getCalculator)
router.get('/results/:id', calculatorController.getResults)
router.post('/post', calculatorController.postCalculator)

module.exports = router
