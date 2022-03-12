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
            let annualSpend = req.body["annual-spend"]

            // Will add features that require these later
            let currentAssets = req.body["current-assets"]
            let monthlyContribution = req.body["monthly-contribution"]

            let adjustedGrowthRate = (req.body["growth-rate"] - req.body["interest-rate"])/100
            let interestRate = req.body["interest-rate"]/100
            let ageDifference = retirementAge - currentAge

            let fireNumber = annualSpend * 25
            let coastNumber = fireNumber * Math.pow((1 + adjustedGrowthRate), (-1 * ageDifference))
            // let finalValue = currentAssets * Math.pow((1 + adjustedGrowthRate), ageDifference)

            // To return objectID, need to assign the newly created document
            // to a variable first, else we don't actually know which document
            // of the Fire Model to return
            let doc = await Fire.create({
                currentAge: currentAge,
                retirementAge: retirementAge,
                annualSpend: annualSpend,
                currentAssets: currentAssets,
                monthlyContribution: monthlyContribution,
                adjustedGrowthRate: adjustedGrowthRate,
                interestRate: interestRate,
                ageDifference: ageDifference,
                fireNumber: fireNumber,
                coastNumber: coastNumber
            });
            res.redirect(`/results/${doc._id}`)
        }catch(err){
            console.log(err)
        }
    }
  }
