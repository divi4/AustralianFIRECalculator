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
      // nothing in req.params
      // Once I can get the object id I can pass data to the ejs
        try{
          let x = await Fire.findById(req.params.id).lean()
          console.log(x)
          // res.render("index.ejs", {currentAge: currentAge})
        }catch(err){
            console.log(err)
        }
    },
    postCalculator: async (req,res, id)=>{
        try{
            console.log(id)

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
            res.redirect(`/results/${req.params.id}`)
        }catch(err){
            console.log(err)
        }
    }
  }
