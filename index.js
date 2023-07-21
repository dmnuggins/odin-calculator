let prevInput = 0
let curInput = 0
let operator = ''

// add click handler to all buttons
const numButtons = document.querySelectorAll('button')
const subDisplay = document.querySelector('.sub')
const mainDisplay = document.querySelector('.main')

// add click listener to all number
numButtons.forEach((button) => {
  if (button.className === 'num') {
    button.addEventListener('click', () => {
      const numInput = parseInt(button.textContent)
      console.log(button.id, ' clicked')
      curInput = curInput * 10 + numInput
      mainDisplay.textContent = formatNumberWithCommas(curInput)
    })
  }
})

const clearEntryButton = document.querySelector('#ce')
const clearButton = document.querySelector('#c')

clearEntryButton.addEventListener('click', () => {
  curInput = 0
  mainDisplay.textContent = curInput.toString()
})

clearButton.addEventListener('click', () => {
  prevInput = 0
  curInput = 0
  mainDisplay.textContent = curInput.toString()
  subDisplay.textContent = ''
})

// evalute the result given the operator and inputs
function operate(operator, prev, input) {
  switch (operator) {
    case '/':
      // divide
      break
    case 'x':
      // multiply
      break
    case '-':
      // subtract
      break
    case '+':
      // add
      break
    default:
      break
  }
}

// modify the current input
function modify(input) {}

// format numeric value with commas
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
