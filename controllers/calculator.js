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
            let currentAge = req.body["current-age"]
            let retirementAge = req.body["retirement-age"]
            let annualSpend = req.body["annual-spend"]
            let currentAssets = req.body["current-assets"]
            let monthlyContribution = req.body["monthly-contribution"]
            let growthRate = req.body["growth-rate"]
            let interestRate = req.body["interest-rate"]

            let fireNumber = annualSpend * 25
            let ageDifference = retirementAge - currentAge

            let coastNumber = Math.pow(fireNumber * (1 + interestRate), (-1 * ageDifference))
            


            res.render('index.ejs')
        }catch(err){
            console.log(err)
        }
    },
  }
