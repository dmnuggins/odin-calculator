let prevInput = null
let curInput = null
let curOperator = null
let needDisplayReset = false
let evaluated = false

// add click handler to all buttons
const buttons = document.querySelectorAll('button')
const operators = document.querySelectorAll('.operator')
const subDisplay = document.querySelector('.sub')
const mainDisplay = document.querySelector('.main') // should limit to 20 chars max
const clearEntryButton = document.querySelector('#ce')
const clearButton = document.querySelector('#c')
const negateButton = document.querySelector('#negate')

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

clearEntryButton.addEventListener('click', () => {
  if (evaluated) {
    subDisplay.textContent = `${prevInput} ${curOperator}`
    resetValues()
  } else {
    curInput = null
    subDisplay.textContent = `${prevInput} ${curOperator}`
    mainDisplay.textContent = '0'
  }
})

clearButton.addEventListener('click', () => {
  resetValues()
  subDisplay.textContent = ''
  mainDisplay.textContent = '0'
})

negateButton.addEventListener('click', () => {
  negate(parseInt(mainDisplay.textContent))
})

const resetMainDisplay = () => {
  mainDisplay.textContent = ''
  needDisplayReset = false
}

const resetValues = () => {
  prevInput = null
  curInput = null
  curOperator = null
  needDisplayReset = false
  evaluated = false
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
    resetMainDisplay()
  }
  mainDisplay.textContent += num
  curInput = parseInt(mainDisplay.textContent)
  debugPrint()
}

// should set up prevInput
function handleOperatorInput(operator) {
  // handle when operator is clicked after evaluation has been completed
  if (evaluated) {
    prevInput = parseInt(mainDisplay.textContent)
    curInput = null
    curOperator = operator
    subDisplay.textContent = `${prevInput} ${curOperator}`
    evaluated = false
    needDisplayReset = true
  }
  // if another operator is click after num1 (op) num2 is already setup
  if (prevInput !== null && curOperator !== null && curInput !== null) {
    console.log('double op')
    const ans = operate(prevInput, curOperator, curInput)
    mainDisplay.textContent = `${ans}`
    subDisplay.textContent = `${ans} ${operator}`
    curOperator = operator
    prevInput = ans
    curInput = null
    needDisplayReset = true
  }
  // if operator is clicked when first num is being inputed
  else if (prevInput === null && curOperator === null && curInput !== null) {
    curOperator = operator
    prevInput = parseInt(mainDisplay.textContent)
    subDisplay.textContent = `${prevInput} ${curOperator}`
    curInput = null
    needDisplayReset = true
    debugPrint()
  } // if operator is clicked again after operator has been set
  else {
    curOperator = operator
    subDisplay.textContent = `${prevInput} ${curOperator}`
    needDisplayReset = true
  }
}

// need conditional to ensure there are 2 operands before handleEval
function handleEvalInput() {
  if (evaluated) {
    // infinite operations
    prevInput = parseInt(mainDisplay.textContent)
    subDisplay.textContent = `${prevInput} ${curOperator} ${curInput} =`
    mainDisplay.textContent = operate(prevInput, curOperator, curInput)
    needDisplayReset = true
  } else {
    // check for 0 condition
    if (curOperator !== null && curInput == 0) {
      mainDisplay.textContent = 'Result is undefined'
      // prompt user to reset the calculator
      // disable mods & operators
      return
    }

    if (prevInput !== null && curOperator !== null && curInput !== null) {
      const ans = operate(prevInput, curOperator, curInput)
      subDisplay.textContent = `${prevInput} ${curOperator} ${curInput} =`
      mainDisplay.textContent = `${ans}`
      needDisplayReset = true
      evaluated = true
    } else if (
      prevInput !== null &&
      curOperator !== null &&
      curInput === null
    ) {
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
      curInput = parseInt(mainDisplay.textContent)
      subDisplay.textContent = `${curInput} =`
      needDisplayReset = true
      debugPrint()
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

// MOD
function negate(num) {
  if (num === 0) return
  if (evaluated) {
    prevInput = parseInt(-num)
    subDisplay.textContent = `negate(${num})`
    mainDisplay.textContent = prevInput
  } else {
    if (curInput === null) {
      subDisplay.textContent = `${prevInput} ${curOperator} negate(${prevInput})`
      mainDisplay.textContent = `${-prevInput}`
      curInput = -prevInput
    } else {
      curInput = -curInput
      mainDisplay.textContent = `${curInput}`
    }
  }
  debugPrint()
}

function debugPrint() {
  console.log('prevInput: ', prevInput)
  console.log('curOperator: ', curOperator)
  console.log('curInput: ', curInput)
}
