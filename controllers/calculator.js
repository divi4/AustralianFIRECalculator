const Fire = require("../models/fire")

module.exports = {
    getCalculator: async (req,res)=>{
        try{
          res.render('index.ejs')
        }catch(err){
            console.log(err)
        }
    },
    getResults: async (req,res)=>{
        try{
          let docObject = await Fire.findById(req.params.id).lean()
          res.render("results.ejs", {docObject: docObject})
        }catch(err){
            console.log(err)
        }
    },
    postCalculator: async (req,res)=>{
        try{
            // These values are being implicitly converted from a string to a number
            let currentAge = req.body["current-age"]
            let retirementAge = req.body["retirement-age"]
            let ageDifference = retirementAge - currentAge

            let annualSpend = req.body["annual-spend"]
            // Will add features that require these later
            let currentSuper = req.body["current-super"]
            let monthlyContribution = req.body["monthly-contribution"]

            let growthRate = req.body["growth-rate"]
            let interestRate = req.body["interest-rate"]
            let adjustedGrowthRate = roundOff((growthRate - interestRate), 1)

            let fireNumber = annualSpend * 25
            let coastNumber = roundOff(fireNumber * Math.pow((1 + ((growthRate - interestRate)/100)), (-1 * ageDifference)), 2)
            let actualCoastNumber = roundOff(coastNumber - currentSuper, 2)

            // let finalValue = currentSuper * Math.pow((1 + adjustedGrowthRate), ageDifference)

            // To return objectID, need to assign the newly created document
            // to a variable first, else we don't actually know which document
            // of the Fire Model to return
            let doc = await Fire.create({
                currentAge: currentAge,
                retirementAge: retirementAge,
                ageDifference: ageDifference,
                annualSpend: annualSpend,
                currentSuper: currentSuper,
                monthlyContribution: monthlyContribution,
                growthRate: growthRate,
                interestRate: interestRate,
                adjustedGrowthRate: adjustedGrowthRate,
                fireNumber: fireNumber,
                coastNumber: coastNumber,
                actualCoastNumber: actualCoastNumber
            });
            res.redirect(`/results/${doc._id}`)
        }catch(err){
            console.log(err)
        }
    }
  }

function roundOff(num, places) {
  const x = Math.pow(10, places)
  return Math.round(num * x) / x
}
