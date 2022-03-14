const form = document.querySelector(".calculator")
const CURRENT_AGE_REQUIRED = "Please enter your current age"
const RETIREMENT_AGE_REQUIRED = "Please enter your retirement age"
const ANNUAL_SPEND_REQUIRED = "Please enter a value greater than 0"
// CURRENT_ASSETS if no value, assume 0
// MONTHLY_CONTRIBUTION if no value, assume 0
// GROWTH_RATE if no value, assume 0
// INTEREST_RATE if no value, assume 0

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
    form.submit()
  }
})

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
  msg.innerText = message;
  input.classname = type ? "success" : "error"
  return type
}


const ctx = document.getElementById('myChart');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['23','30', '40', '50', '55', '65'],
        datasets: [{
            label: 'Superfund value',
            data: [40000, 120000, 250000, 400000, 550000, 750000],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
