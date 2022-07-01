// Fire will mean retiring before preservation age (60)
// Retire will mean 60 and beyond

// When communicating to user refer to FIRE as Pre-Super preservation instead for easier communication

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
          label: 'Super Number',
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
const SUPER_ANNUAL_SPEND_REQUIRED = 'Please enter a value greater than 0'
// CURRENT_ASSETS if no value, assume 0
// MONTHLY_CONTRIBUTION if no value, assume 0
// GROWTH_RATE if no value, assume 0
// INTEREST_RATE if no value, assume 0

form.addEventListener('submit', function(e) {
  event.preventDefault();

  let currentAgeValid = hasValue(form.elements['current-age'], CURRENT_AGE_REQUIRED);
  let superAnnualSpendValid = hasValue(form.elements['superAnnualSpend'], SUPER_ANNUAL_SPEND_REQUIRED);
  checkNumber(form.elements['current-super']);
  checkNumber(form.elements['growth-rate']);
  checkNumber(form.elements['interest-rate']);

  if (currentAgeValid && superAnnualSpendValid) {
    let superObject = getData()[0]
    let fireObject = getData()[1]

    updateText(superObject)
    let [ages, plots, firePlots] = createGraphData(superObject)
    updateGraphData(myChart, ages, plots, firePlots, superObject.superNumber)
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
  let growthRate = form.elements['growth-rate'].value
  let interestRate = form.elements['interest-rate'].value
  let adjustedGrowthRate = roundOff((growthRate - interestRate), 1)

  let yearlyContribution = Number(form.elements['yearly-contribution'].value)

  let superNumber = form.elements['superAnnualSpend'].value * 25
  let currentSuper = form.elements['current-super'].value

  return [createSuperObject(adjustedGrowthRate, yearlyContribution, superNumber, currentSuper), createFireObject(adjustedGrowthRate, yearlyContribution, currentSuper)]

}

function createFireObject(adjustedGrowthRate, yearlyContribution, currentSuper) {
  let fireObject = {
    // key: getFireData(adjustedGrowthRate, yearlyContribution, currentSuper)[0]
    superAmountPreSuper: getFireData(adjustedGrowthRate, yearlyContribution, currentSuper)
  }

  return fireObject
}


function createSuperObject(adjustedGrowthRate, yearlyContribution, superNumber, currentSuper) {
  let ageDifference = 60 - form.elements['current-age'].value
  let coastNumber = roundOff(superNumber * Math.pow((1 + ((adjustedGrowthRate)/100)), (-1 * ageDifference)), 2)

  let superObject = {
    currentAge: form.elements['current-age'].value,
    preservationAge: 60,
    ageDifference: ageDifference,
    superAnnualSpend: form.elements['superAnnualSpend'].value,
    currentSuper: currentSuper,
    adjustedGrowthRate: adjustedGrowthRate,
    yearlyContribution: yearlyContribution,
    superNumber: superNumber,
    coastNumber: coastNumber,
    actualCoastNumber: roundOff(coastNumber - form.elements['current-super'].value, 2),
  }

  return superObject
}


function createGraphData(superObject) {
  let ages = []
  let plots = [superObject.currentSuper, superObject.superNumber]
  let firePlots = [superObject.fireNumber]

  for (let i = 0; i < superObject.ageDifference + 1; i++) {
      ages[i] = i + Number(superObject.currentAge)
  }

  // Right now only creates plots for the pre-super Fire number
  for (let i = 0; i < superObject.ageDifference + 1; i++) {
    firePlots[i] = Number(superObject.fireNumber)
  }

  for (let i = 0; i < superObject.ageDifference + 1; i++) {
    // ------------- This if-else statement is not needed I think ------------------
      // Put in logic here to add currentSuper and add one year's worth of
      // monthlyContribution every year after the first
      // If currentSuper is 0, first year is 0, and year's worth of monthly
      // contribution will make 2nd year + real growth
      // Would add monthlyContribution*12 to the total AFTER this formula resolves
      if (i === 0) {
        plots[0] = (Number(superObject.currentSuper))
      } else {
        // Principal is correct
        let principal = ((Number(superObject.currentSuper)) * Math.pow((1 + superObject.adjustedGrowthRate/100), i))
        // Annuity is within 'margin of error'
        // Annuity is currently calculated as annuity due (made at the start of each contribution period)
        // let annuity = (superObject.monthlyContribution * 12) * (Math.pow((1 + superObject.adjustedGrowthRate/100), i) - 1) * (1 + (superObject.adjustedGrowthRate/100))
        let annuity = superObject.yearlyContribution * (Math.pow((1 + superObject.adjustedGrowthRate/100), i) - 1) * (1 + (superObject.adjustedGrowthRate/100))
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
function updateText(superObject) {
   document.querySelector('.a').innerHTML = `Your ${superObject.ageDifference} years
    from preservation`
   document.querySelector('.b').innerHTML = `At a real growth rate (growth - inflation)
    of ${superObject.adjustedGrowthRate}% and a planned annual spendings of
    ${superObject.superAnnualSpend} this makes your Super number:
    ${superObject.superNumber}`
   document.querySelector('.c').innerHTML = `The amount of money you need to put
    into your Super today to reach ${ superObject.superNumber} by age
    ${superObject.preservationAge}, is:`
   document.querySelector('.d').innerHTML = `${ superObject.coastNumber}`
   document.querySelector('.e').innerHTML = `With a Super that's currently at
    ${superObject.currentSuper}, you've got to put in
    ${superObject.actualCoastNumber} more today to reach your SUPER number by preservation`
    // document.querySelector('.').innerHTML = `Monthly contributions: ${monthlyContribution}`
    // document.querySelector('.f').innerHTML = `Yearly contributions: ${yearlyContribution}`

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


// getFireData(adjustedGrowthRate, yearlyContribution, superNumber, currentSuper)
function getFireData(adjustedGrowthRate, yearlyContribution, currentSuper) {
  // Will find out how big Super is by the time have reached FIRE
  // Should make adjustedGrowthRate a global variable or something
  if (yearlyContribution !== 0) {
    let superAmountPreSuper = findSuperAmountPreSuper(findYearsTillFire(findFireNumber(adjustedGrowthRate), adjustedGrowthRate, yearlyContribution), adjustedGrowthRate, currentSuper)
  
    return superAmountPreSuper
  } else {
    // Add logic
    let superAmountPreSuper = 21212
    
    return superAmountPreSuper
  }
}


function findSuperAmountPreSuper(yearsTillFire, adjustedGrowthRate, currentSuper) {
  //  adjustedGrowthRate
  let SUPER_GUARANTEE = 0.1 // Will increase by 0.5% till 1 July 2025
  let ordinaryTimeEarnings = 9270.48 // Default value (Minimum hours * Weeks in a Quarter) * Standard wage = (38 * 12) * 20.33
  // currentSuper

  // Super guarantee formula is different
  let superAmountPreSuper = currentSuper * Math.pow((1 * (adjustedGrowthRate/100)), yearsTillFire) + ((((ordinaryTimeEarnings * SUPER_GUARANTEE) * 4)/(adjustedGrowthRate/100)) * (Math.pow((1 + (adjustedGrowthRate/100)), yearsTillFire) - 1));
  // Answer is quite a bit off
  console.log('superAmountPreSuper: ' + superAmountPreSuper)
  return superAmountPreSuper
}


function findYearsTillFire(fireNumber, adjustedGrowthRate, yearlyContribution) {
  let currentNetworth = Number(form.elements['currentNetworth'].value)

  let yearsTillFire = (Math.log(1 + ((fireNumber * (adjustedGrowthRate/100))/yearlyContribution))/Math.log(1 + (adjustedGrowthRate/100))) - (currentNetworth/yearlyContribution)
  // For default values within about 0.57 of what believe to be the answer 
  console.log('yearsTillFire: ' + yearsTillFire)
  return yearsTillFire
}


function findFireNumber(adjustedGrowthRate) {
  // adjustedGrowthRate
  let fireAnnualSpend = Number(form.elements['fireAnnualSpend'].value)
  let yearsTillPreserve = (60 - form.elements['current-age'].value)
  // How find yearsTillFire for numPayPeriods if need numPayPeriods to find yearsTillFire?
  // let numPayPeriods = yearsTillPreserve - yearsTillFire  -Will find alternative method to using yearsTillFire
  // Use yearsTillPreserve for now, will be about +- 1 of numPayPeriods

  // Answer is right if asking about today when pass yearsTillPreserve as argument for number of pay periods
  // Need to take into account currentNetworth too, done by reducing numPayPeriods
  let fireNumber = (fireAnnualSpend/(adjustedGrowthRate/100)) * (1 - (1/Math.pow((1 + (adjustedGrowthRate/100)), 13)))

  return fireNumber
}