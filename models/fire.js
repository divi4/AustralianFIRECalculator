const mongoose = require('mongoose')

const FireSchema = new mongoose.Schema({
  currentAge: {
    type: String,
    required: true,
  },
  retirementAge: {
    type: String,
    required: true,
  },
  annualSpend: {
    type: String,
    required: true,
  },
  currentAssets: {
    type: String,
    required: true,
  },
  monthlyContribution: {
    type: String,
    required: true,
  },
  adjustedGrowthRate: {
    type: String,
    required: true,
  },
  interestRate: {
    type: String,
    required: true,
  },
  ageDifference: {
    type: String,
    required: true,
  },
  fireNumber: {
    type: String,
    required: true,
  },
  coastNumber: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('fire', FireSchema)
