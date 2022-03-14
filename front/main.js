const form = document.querySelector(".calculator")
const CURRENT_AGE_REQUIRED = "Please enter your current age"
const RETIREMENT_AGE_REQUIRED = "Please enter your retirement age"
const ANNUAL_SPEND_REQUIRED = "Please enter a value greater than 0"
// CURRENT_ASSETS if no value, assume 0
// MONTHLY_CONTRIBUTION if no value, assume 0
// GROWTH_RATE if no value, assume 0
// INTEREST_RATE if no value, assume 0


const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        datasets: [{
            label: '$ value',
            backgroundColor: 'rgba(17, 140, 79, 0.2)',
            fill: 'origin',
            borderWidth: 1
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
      }
    });


form.addEventListener("submit", function(e) {
  event.preventDefault();

  let currentAgeValid = hasValue(form.elements["current-age"], CURRENT_AGE_REQUIRED);
  let retirementAgeValid = hasValue(form.elements["retirement-age"], RETIREMENT_AGE_REQUIRED);
  let annualSpendValid = hasValue(form.elements["annual-spend"], ANNUAL_SPEND_REQUIRED);
  checkNumber(form.elements["current-super"]);
  checkNumber(form.elements["monthly-contribution"]);
  checkNumber(form.elements["growth-rate"]);
  checkNumber(form.elements["interest-rate"]);

  if (currentAgeValid && retirementAgeValid && annualSpendValid) {
    let docObject = getData()
    updateData(docObject)
    let [labels, plots] = createGraphData(docObject)
    console.log(labels)
    console.log(plots)
    updateGraphData(myChart, labels, plots)
  }
})

function updateData(docObject) {
   document.querySelector(".a").innerHTML = `Your ${docObject.ageDifference} years
    from retirement`
   document.querySelector(".b").innerHTML = `At a real growth rate (growth - inflation)
    of ${docObject.adjustedGrowthRate}% and a planned annual spendings of
    ${docObject.annualSpend} this makes your FIRE number:
    ${docObject.fireNumber}`
   document.querySelector(".c").innerHTML = `The amount of money you need to put
    into your Super today to reach ${ docObject.fireNumber} by age
    ${docObject.retirementAge}, is:`
   document.querySelector(".d").innerHTML = `${ docObject.coastNumber}`
   document.querySelector(".e").innerHTML = `With a Super that's currently at
    ${docObject.currentSuper}, you've got to put in
    ${docObject.actualCoastNumber} more to reach your FIRE number by retirement`
    document.querySelector(".e").innerHTML = `Monthly contributions: ${docObject.monthlyContribution}`
}

function getData() {
  let ageDifference = form.elements["retirement-age"].value - form.elements["current-age"].value
  let growthRate = form.elements["growth-rate"].value
  let interestRate = form.elements["interest-rate"].value
  let fireNumber = form.elements["annual-spend"].value * 25
  let coastNumber = roundOff(fireNumber * Math.pow((1 + ((growthRate - interestRate)/100)), (-1 * ageDifference)), 2)

  let docObject = {
      currentAge: form.elements["current-age"].value,
      retirementAge: form.elements["retirement-age"].value,
      ageDifference: ageDifference,
      annualSpend: form.elements["annual-spend"].value,
      currentSuper: form.elements["current-super"].value,
      monthlyContribution: form.elements["monthly-contribution"].value,
      growthRate: form.elements["growth-rate"].value,
      interestRate: form.elements["interest-rate"].value,
      adjustedGrowthRate: roundOff((growthRate - interestRate), 1),
      fireNumber: fireNumber,
      coastNumber: coastNumber,
      actualCoastNumber: roundOff(coastNumber - form.elements["current-super"].value, 2)
    }

    return docObject
}


function createGraphData(docObject) {
  // Need to create an array of ages and plot points
  let labels = []
  let plots = [docObject.currentSuper, docObject.fireNumber]

  for (let i = 0; i < docObject.ageDifference + 1; i++) {
      labels[i] = i + Number(docObject.currentAge)
  }

  for (let i = 0; i < docObject.ageDifference + 1; i++) {
    if (i === 0) {
      // Put in logic here to add currentSuper and add one year's worth of
      // monthlyContribution every year after the first
      // If currentSuper is 0, first year is 0, and year's worth of monthly
      // contribution will make 2nd year + real growth
      plots[0] = Number(docObject.currentSuper)
    } else {
      console.log(plots[i - 1])
      plots[i] = Number(docObject.currentSuper) * Math.pow((1 + docObject.adjustedGrowthRate/100), i)
   }
  }
  return [labels, plots]
}


function updateGraphData(myChart, labels, plots) {
  removeGraphData(myChart)
  addGraphData(myChart, labels, plots)
}


function addGraphData(chart, labes, plots) {
    labes.forEach((label) => {
      chart.data.labels.push(label);
    });
    plots.forEach((plot) => {
        chart.data.datasets[0].data.push(plot);
    });
    chart.update();
}


function removeGraphData(chart) {
    chart.data.labels.forEach((label) => {
      chart.data.labels.pop(label);
    });
    chart.data.datasets[0].data.forEach((plot) => {
        chart.data.datasets[0].data.pop(plot);
    });
    chart.update();
}


function checkNumber(input) {
  if (input.value.trim() === "") {
    return input.value = input.defaultValue;
  }
  return
}


function hasValue(input, message) {
  if (input.value.trim() === "") {
    return showError(input, message);
  }
  return showSuccess(input);
}


function showError(input, message) {
  return showMessage(input, message, false);
}


function showSuccess(input) {
  return showMessage(input, "", true);
}


function showMessage(input, message, type) {
  const msg = input.parentNode.querySelector("small");
  msg.innerHTML = message;
  input.classname = type ? "success" : "error"
  return type
}


function roundOff(num, places) {
  const x = Math.pow(10, places)
  return Math.round(num * x) / x
}
