// To get stuff from this dict:
// {
//   'current-age': '23',
//   'retirement-age': '65',
//   'annual-spend': '30000',
//   'current-assets': '0',
//   'monthly-contribution': '500',
//   'growth-rate': '7.0',
//   'interest-rate': '3.0'
// }
// req.body["current-age"]

module.exports = {
    getCalculator: async (req,res)=>{
        try{
            res.render('index.ejs')
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
            let currentAssets = req.body["current-assets"]
            let monthlyContribution = req.body["monthly-contribution"]
            let adjustedGrowthRate = (req.body["growth-rate"] - req.body["interest-rate"])/100
            let interestRate = req.body["interest-rate"]/100
            let ageDifference = retirementAge - currentAge

            let fireNumber = annualSpend * 25
            let coastNumber = fireNumber * Math.pow((1 + adjustedGrowthRate), (-1 * ageDifference))
            let finalValue = currentAssets * Math.pow((1 + adjustedGrowthRate), ageDifference)

            console.log("Fire Number: " + fireNumber)
            console.log("Coast Number: " + coastNumber)
            console.log("Final Value: " + finalValue)

            console.log("Years to retirement: " + ageDifference)

            res.render('index.ejs')
        }catch(err){
            console.log(err)
        }
    },
  }
