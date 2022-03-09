const Fire = require("../models/fire")

module.exports = {
    getCalculator: async (req,res)=>{
        try{
            let x = Fire.findOne()
            res.render('index.ejs', {fire:x})
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

            await Fire.create({
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

            res.redirect("/")
        }catch(err){
            console.log(err)
        }
    },
  }
