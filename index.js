let prevInput = null
let curInput = ''
let curOperator = null
let needDisplayReset = false

// add click handler to all buttons
const buttons = document.querySelectorAll('button')
const operators = document.querySelectorAll('.operator')
// console.log(operators)
const subDisplay = document.querySelector('.sub')
const mainDisplay = document.querySelector('.main') // should limit to 20 chars max
const clearEntryButton = document.querySelector('#ce')
const clearButton = document.querySelector('#c')

// add click listener to all number
buttons.forEach((button) => {
  if (button.className === 'num') {
    button.addEventListener('click', () => {
      handleNumInput(button.textContent)
    })
  }
  // QUEUES OPERATOR
  if (button.className === 'operator') {
    button.addEventListener('click', () => {
      handleOperatorInput(button.textContent)
    })
  }
  // MODIFIES CUR INPUT
  if (button.className === 'mod') {
    button.addEventListener('click', () => {
      console.log(button.textContent, ' mod clicked')
      // handle modifier button input
    })
  }
  // EQUALS
  if (button.id === 'eval') {
    button.addEventListener('click', () => {
      handleEvalInput()
    })
  }
})

// clearEntryButton.addEventListener('click', () => {
//   curInput = null
//   initialState = true
//   mainDisplay.textContent = curInput.toString()
// })

// clearButton.addEventListener('click', () => {
//   prevInput = null
//   curInput = null
//   mainDisplay.textContent = 0
//   subDisplay.textContent = ''
//   initialState = true
//   curOperator = null
//   newInput = true
//   lockFirstOperand = false
//   evaluated = false
// })

const resetScreen = () => {
  mainDisplay.textContent = ''
  needDisplayReset = false
}

function handleNumInput(num) {
  // clear display value to prep for updated num input
  // when: first input of calc, after eval & after operator
  if (mainDisplay.textContent === '0' || needDisplayReset) {
    resetScreen()
  }
  // append display number
  mainDisplay.textContent += num
  // set current input to main display num
}
// should set up prevInput
function handleOperatorInput(operator) {
  if (curOperator !== null) handleEvalInput()

  prevInput = mainDisplay.textContent
  curOperator = operator
  subDisplay.textContent = `${prevInput} ${curOperator}`
  console.log('prevInput: ', prevInput)
  console.log('curOperator: ', curOperator)
  needDisplayReset = true
}

// need conditional to ensure there are 2 operands before handleEval
function handleEvalInput() {
  if (curOperator === null || needDisplayReset) return

  if (curOperator === '÷' && mainDisplay.textContent === '0') {
    mainDisplay.textContent = 'Result is undefined'
    return
  }
  console.log('curInput: ', curInput)
  curInput = mainDisplay.textContent
  mainDisplay.textContent = operate(
    curOperator,
    parseFloat(prevInput),
    parseFloat(curInput)
  )
  subDisplay.textContent = `${prevInput} ${curOperator} ${curInput} =`
  curOperator = null
}

// evalute the result given the operator and inputs
function operate(operator, a, b) {
  switch (operator) {
    case '÷':
      // divide
      if (b === 0) return null
      else return div(a, b)

      break
    case '×':
      // multiply
      return mult(a, b)
      break
    case '-':
      // subtract
      return sub(a, b)
      break
    case '+':
      // add
      return add(a, b)
      break
    default:
      break
  }
}

function add(a, b) {
  return a + b
}

function sub(a, b) {
  return a - b
}

function div(a, b) {
  return a / b
}

function mult(a, b) {
  return a * b
}
// modify the current input
function modify(input) {}

// format numeric value with commas
function formatNumberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
