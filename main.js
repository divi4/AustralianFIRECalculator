// Fire will mean retiring before preservation age (60)
// Retire will mean 60 and beyond

// When communicating to user refer to FIRE as Pre-Super retirement instead for easier communication

// Default graph that shows upon loading page
const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['30','31','32','33','34','35','36','37','38','39','40','41',
                '42','43','44','45','46','47','48','49','50','51','52','53',
                '54','55','56','57','58','59','60','61','62','63','64','65'],
        datasets: [{
          label: 'Net worth',
          data: [40000,42800,45796,49001.72,52431.8404,56102.06922800001,
                60029.21407396,64231.259059137206,68727.4471932768,
                73538.3684968062,78686.05429158262,84194.07809199342,
                90087.66355843293,96393.80000752326,103141.36600804988,
                110361.26162861339,118086.5499426163,126352.60843859945,
                135197.2910293014,144661.10140135253,154787.3784994472,
                165622.49499440848,177216.0696440171,189621.1945190983,
                202894.67813543518,217097.30560491566,232294.11699725973,
                248554.70518706794,265953.5345501627,284570.28196867404,
                304490.2017064812,325804.515825935,348610.83193375036,
                373013.5901691129,399124.5414809508,427063.2593846174],
          pointStyle: 'rectRounded',
          pointHitRadius: 3,
          backgroundColor: 'rgba(17, 140, 79, 0.2)',
          fill: 'origin',
          borderWidth: 1
        },
        {
          label: 'Fire Number',
          data: [750000,750000,750000,750000,750000,750000,750000,750000,750000,
                750000,750000,750000,750000,750000,750000,750000,750000,750000,
                750000,750000,750000,750000,750000,750000,750000,750000,750000,
                750000,750000,750000,750000,750000,750000,750000,750000,750000],
          backgroundColor: 'rgba(252, 9, 5, 0.6)',
          pointStyle: 'dash',
          pointHitRadius: 5,
          pointRadius: 0,
          borderWidth: 3,
          borderColor: 'rgba(252, 9, 5, 0.6)'
        },
        {
          label: 'Pre-Super Fire Number',
          data: [],
          backgroundColor: 'rgba(152, 9, 5, 0.6)',
          pointStyle: 'dash',
          pointHitRadius: 5,
          pointRadius: 0,
          borderWidth: 3,
          borderColor: 'rgba(152, 9, 5, 0.6)'
        }]
    },
    options: {
        scales: {
          x: {
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
          }
        },
        interaction: {
          mode: 'point'
        },
        plugins: {
          tooltip: {
              callbacks: {
                title: function(title) {
                  if (title[0].dataset.label === 'Fire Number') {
                    return null
                  } else if (title[0].dataset.label === 'Pre-Super Fire Number') {
                      return null
                  } else {
                    return 'Age ' + title[0].label
                  }
                  },
                  label: function(context) {
                      let label = context.dataset.label || '';

                      if (label) {
                          label += ': ';
                      }
                      if (context.parsed.y !== null) {
                          label += new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(context.parsed.y);
                      }
                      return label;
                  }
              }
          }
      }
      }
    });


// *************** MAIN ******************
const form = document.querySelector('.calculator')
const CURRENT_AGE_REQUIRED = 'Please enter your current age'
const RETIREMENT_AGE_REQUIRED = 'Please enter your retirement age'
const SUPER_ANNUAL_SPEND_REQUIRED = 'Please enter a value greater than 0'
// CURRENT_ASSETS if no value, assume 0
// MONTHLY_CONTRIBUTION if no value, assume 0
// GROWTH_RATE if no value, assume 0
// INTEREST_RATE if no value, assume 0

form.addEventListener('submit', function(e) {
  event.preventDefault();

  let currentAgeValid = hasValue(form.elements['current-age'], CURRENT_AGE_REQUIRED);
  let retirementAgeValid = hasValue(form.elements['retirement-age'], RETIREMENT_AGE_REQUIRED);
  let superAnnualSpendValid = hasValue(form.elements['superAnnualSpend'], SUPER_ANNUAL_SPEND_REQUIRED);
  checkNumber(form.elements['current-super']);
  checkNumber(form.elements['monthly-contribution']);
  checkNumber(form.elements['growth-rate']);
  checkNumber(form.elements['interest-rate']);

  if (currentAgeValid && retirementAgeValid && superAnnualSpendValid) {
    let docObject = getData()
    updateText(docObject)
    let [ages, plots, firePlots] = createGraphData(docObject)
    updateGraphData(myChart, ages, plots, firePlots, docObject.superNumber)
  }
})


// ********** Form validation functions *************
function checkNumber(input) {
  if (input.value.trim() === '') {
    return input.value = input.defaultValue;
  }
  return
}


function hasValue(input, message) {
  if (input.value.trim() === '') {
    return showError(input, message);
  }
  return showSuccess(input);
}


function showError(input, message) {
  return showMessage(input, message, false);
}


function showSuccess(input) {
  return showMessage(input, '', true);
}


function showMessage(input, message, type) {
  const msg = input.parentNode.querySelector('small');
  msg.innerHTML = message;
  input.classname = type ? 'success' : 'error'
  return type
}


// ********** Graph and data calculations functions *************
function getData() {
  let ageDifference = form.elements['retirement-age'].value - form.elements['current-age'].value
  let growthRate = form.elements['growth-rate'].value
  let interestRate = form.elements['interest-rate'].value
  let superNumber = form.elements['superAnnualSpend'].value * 25
  let coastNumber = roundOff(superNumber * Math.pow((1 + ((growthRate - interestRate)/100)), (-1 * ageDifference)), 2)

  getFireData()

  let docObject = {
      currentAge: form.elements['current-age'].value,
      retirementAge: form.elements['retirement-age'].value,
      ageDifference: ageDifference,
      annualSpend: form.elements['superAnnualSpend'].value,
      currentSuper: form.elements['current-super'].value,
      monthlyContribution: form.elements['monthly-contribution'].value,
      growthRate: form.elements['growth-rate'].value,
      interestRate: form.elements['interest-rate'].value,
      adjustedGrowthRate: roundOff((growthRate - interestRate), 1),
      superNumber: superNumber,
      coastNumber: coastNumber,
      actualCoastNumber: roundOff(coastNumber - form.elements['current-super'].value, 2),
    }

    return docObject
}


function createGraphData(docObject) {
  let ages = []
  let plots = [docObject.currentSuper, docObject.superNumber]
  let firePlots = [docObject.fireNumber]

  for (let i = 0; i < docObject.ageDifference + 1; i++) {
      ages[i] = i + Number(docObject.currentAge)
  }

  // Right now only creates plots for the pre-super Fire number
  for (let i = 0; i < docObject.ageDifference + 1; i++) {
    firePlots[i] = Number(docObject.fireNumber)
  }

  for (let i = 0; i < docObject.ageDifference + 1; i++) {
    // ------------- This if-else statement is not needed I think ------------------
      // Put in logic here to add currentSuper and add one year's worth of
      // monthlyContribution every year after the first
      // If currentSuper is 0, first year is 0, and year's worth of monthly
      // contribution will make 2nd year + real growth
      // Would add monthlyContribution*12 to the total AFTER this formula resolves
      if (i === 0) {
        plots[0] = (Number(docObject.currentSuper))
      } else {
        // Principal is correct
        let principal = ((Number(docObject.currentSuper)) * Math.pow((1 + docObject.adjustedGrowthRate/100), i))
        // Annuity is within 'margin of error'
        // Annuity is currently calculated as annuity due (made at the start of each contribution period)
        let annuity = (docObject.monthlyContribution * 12) * (Math.pow((1 + docObject.adjustedGrowthRate/100), i) - 1) * (1 + (docObject.adjustedGrowthRate/100))
        plots[i] = principal + annuity
      }
  }
  return [ages, plots, firePlots]
}


function updateGraphData(myChart, ages, plots, firePlots, superNumber) {
  removeGraphData(myChart)
  addGraphData(myChart, ages, plots, firePlots, superNumber)
}


function addGraphData(chart, ages, plots, firePlots, superNumber) {
    ages.forEach((age) => {
      chart.data.labels.push(age)
    });
    plots.forEach((plot) => {
        chart.data.datasets[0].data.push(plot)
        chart.data.datasets[1].data.push(superNumber)
        chart.data.datasets[2].data.push(firePlots)
    });

    chart.update();
}


function removeGraphData(chart) {
    chart.data.labels = []
    chart.data.datasets[0].data = []
    chart.data.datasets[1].data = []
    chart.data.datasets[2].data = []
    chart.update();
}


//*************** Primitives parsers ***********
function updateText(docObject) {
   document.querySelector('.a').innerHTML = `Your ${docObject.ageDifference} years
    from retirement`
   document.querySelector('.b').innerHTML = `At a real growth rate (growth - inflation)
    of ${docObject.adjustedGrowthRate}% and a planned annual spendings of
    ${docObject.annualSpend} this makes your Super number:
    ${docObject.superNumber}`
   document.querySelector('.c').innerHTML = `The amount of money you need to put
    into your Super today to reach ${ docObject.superNumber} by age
    ${docObject.retirementAge}, is:`
   document.querySelector('.d').innerHTML = `${ docObject.coastNumber}`
   document.querySelector('.e').innerHTML = `With a Super that's currently at
    ${docObject.currentSuper}, you've got to put in
    ${docObject.actualCoastNumber} more today to reach your SUPER number by retirement`
    document.querySelector('.f').innerHTML = `Monthly contributions: ${docObject.monthlyContribution}`
    //Pre-Super
    document.querySelector('.g').innerHTML = `With a planned yearly budget of ${33 * 33}, your
     FIRE number is ${1 + 23}`

}


function roundOff(num, places) {
  const x = Math.pow(10, places)
  return Math.round(num * x) / x
}


// Pre-Super stuff
// Vars
// Amount in Super after hit PreSuper
//  adjustedGrowthRate
// Current networth excluding Super and equity in home
//  fireNumber
// Number of pay periods towards Super
let pv
let fv
let pmt
let r
let n


function getFireData() {
  // Will find out how big Super is by the time have reached FIRE
  findSuperAmountPreSuper(findYearsTillFire(findFireNumber()))

}


function findSuperAmountPreSuper(yearsTillFire) {
  let superAmountPreSuper = pv * Math.pow((1 * r), n) + (pmt/r) * (Math.pow((1 + r), n) - 1);
  //  adjustedGrowthRate
  let SUPER_GUARANTEE = 0.1 // Will increase by 0.5% till 1 July 2025
  let ordinaryTimeEarnings = 9270.48 // Default value (Minimum hours * Weeks in a Quarter) * Standard wage = (38 * 12) * 20.33
  // currentSuper
  yearsTillFire
}


function findYearsTillFire(fireNumber) {
  let yearsTillFire = (Math.log(1 + ((fv * r)/pmt))/Math.log(1 + r)) - (pv/pmt)
  // adjustedGrowthRate
  let yearlyDeposit   // Post-tax yearly savings
  let currentNetworth
  fireNumber
}


function findFireNumber() {
  let fireNumber = (pmt/r) * (1 - (1/Math.pow((1 + r), n)))
  // adjustedGrowthRate
  let fireAnnualSpend = form.elements['fireAnnualSpend'].value
  let yearsTillPreserve
  // How find yearsTillFire for numPayPeriods if need numPayPeriods to find yearsTillFire?
  let numPayPeriods = yearsTillPreserve - 20 // Will find alternative method to using yearsTillFire
}