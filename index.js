let prevInput = null
let curInput = null
let curOperator = null
let needDisplayReset = false
let evaluated = false
let opEval = false

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

const resetScreen = () => {
  mainDisplay.textContent = ''
  needDisplayReset = false
}

function handleNumInput(num) {
  // after pair has been evalu
  if (evaluated) {
    prevInput = null
    curOperator = null
    curInput = null
    subDisplay.textContent = ''
    evaluated = false
  }

  if (mainDisplay.textContent === '0' || needDisplayReset) {
    resetScreen()
  }
  mainDisplay.textContent += num
  curInput = parseInt(mainDisplay.textContent)
  debugPrint()
}

// should set up prevInput
function handleOperatorInput(operator) {
  if (evaluated) {
    prevInput = mainDisplay.textContent
    curInput = null
    curOperator = operator
    subDisplay.textContent = `${prevInput} ${curOperator}`
    evaluated = false
    debugPrint()
  }

  if (prevInput !== null && curOperator !== null && curInput !== null) {
    console.log('double op')
    const ans = operate(prevInput, curOperator, curInput)
    mainDisplay.textContent = `${ans}`
    subDisplay.textContent = `${ans} ${operator}`
    curOperator = operator
    prevInput = ans
    curInput = null
    needDisplayReset = true
  } else if (curOperator !== null && curInput !== null) {
    curOperator = operator
    subDisplay.textContent = `${prevInput} ${curOperator}`
    needDisplayReset = true
  } else {
    curOperator = operator
    prevInput = parseInt(mainDisplay.textContent)
    subDisplay.textContent = `${prevInput} ${curOperator}`
    needDisplayReset = true
  }
}

// need conditional to ensure there are 2 operands before handleEval
function handleEvalInput() {
  if (evaluated) {
    // infinite operations
    prevInput = parseInt(mainDisplay.textContent)
    subDisplay.textContent = `${prevInput} ${curOperator} ${curInput}`
    mainDisplay.textContent = operate(prevInput, curOperator, curInput)
    needDisplayReset = true
  } else {
    if (prevInput !== null && curOperator !== null && curInput !== null) {
      const ans = operate(prevInput, curOperator, curInput)
      subDisplay.textContent = `${prevInput} ${curOperator} ${curInput} =`
      mainDisplay.textContent = `${ans}`
      needDisplayReset = true
      evaluated = true
      console.log('solve')
    } else if (
      prevInput !== null &&
      curOperator !== null &&
      curInput === null
    ) {
      console.log('half')
      const ans = operate(prevInput, curOperator, prevInput)
      subDisplay.textContent = `${prevInput} ${curOperator} ${prevInput} =`
      mainDisplay.textContent = `${ans}`
      needDisplayReset = true
      evaluated = true
    } else if (
      prevInput === null &&
      curOperator === null &&
      (curInput === null || curInput !== null)
    ) {
      curInput = mainDisplay.textContent
      subDisplay.textContent = `${curInput} =`
      needDisplayReset = true
    }
  }
}

// evalute the result given the operator and inputs
function operate(a, operator, b) {
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

function debugPrint() {
  console.log('prevInput: ', prevInput)
  console.log('curOperator: ', curOperator)
  console.log('curInput: ', curInput)
}
