let prevInput = null
let curInput = null
let curOperator = null
let needDisplayReset = false
let evaluated = false
let decimal = false // if decimal true (parseFloat : parseInt)
let prevAction = null // to track what button types were pressed in last action
let operated = false

// add click handler to all buttons
const buttons = document.querySelectorAll('button')
const operators = document.querySelectorAll('.operator')
const subDisplay = document.querySelector('.sub')
const mainDisplay = document.querySelector('.main') // should limit to 20 chars max
const clearEntryButton = document.querySelector('#ce')
const clearButton = document.querySelector('#c')
const negateButton = document.querySelector('#negate')
const decimalButton = document.querySelector('#decimal')

window.addEventListener('keydown', handleKeyboardInput)
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
  clearEntry()
})

clearButton.addEventListener('click', () => {
  clearScreen()
})

negateButton.addEventListener('click', () => {
  negate(parseFloat(mainDisplay.textContent))
})

decimalButton.addEventListener('click', () => {
  handleDecimal()
  console.log('decimal: ', decimal)
})

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) handleNumInput(e.key)
  if (e.key === '.') handleDecimal()
  if (e.key === '=' || e.key === 'Enter') handleEvalInput()
  if (e.key === 'Backspace') clearEntry()
  if (e.key === 'Escape') clearScreen()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    handleOperatorInput(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷'
  if (keyboardOperator === '*') return '×'
  if (keyboardOperator === '-') return '−'
  if (keyboardOperator === '+') return '+'
}

function clearEntry() {
  if (evaluated) {
    subDisplay.textContent = ''
    mainDisplay.textContent = '0'
    resetValues()
  } else {
    curInput = null
    subDisplay.textContent =
      curOperator !== null && prevInput !== null
        ? `${prevInput} ${curOperator}`
        : ''
    mainDisplay.textContent = '0'
  }
}

function clearScreen() {
  resetValues()
  subDisplay.textContent = ''
  mainDisplay.textContent = '0'
}

const resetMainDisplay = () => {
  mainDisplay.textContent = ''
  needDisplayReset = false
}

const resetValues = () => {
  prevInput = null
  curOperator = null
  curInput = null
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
  //  &&

  if (
    (mainDisplay.textContent === '0' || needDisplayReset || evaluated) &&
    !mainDisplay.textContent.includes('.')
  ) {
    resetMainDisplay()
  }
  mainDisplay.textContent += num
  curInput = parseFloat(mainDisplay.textContent)
  debugPrint()
}

// should set up prevInput
function handleOperatorInput(operator) {
  // handle when operator is clicked after evaluation has been completed
  if (evaluated) {
    prevInput = parseFloat(mainDisplay.textContent)
    curInput = null
    curOperator = operator
    subDisplay.textContent =
      prevInput !== null ? `${prevInput} ${curOperator}` : `0 ${curOperator}`
    evaluated = false
    needDisplayReset = true
  }
  // if another operator is click after num1 (op) num2 is already setup
  if (prevInput !== null && curOperator !== null && curInput !== null) {
    console.log('double op')
    const ans = operate(prevInput, curOperator, curInput)
    const numDecimals = dynamicFormat(ans)
    const formattedAns = Number(ans).toFixed(numDecimals)
    mainDisplay.textContent = `${formattedAns}`
    subDisplay.textContent = `${formattedAns} ${operator}`
    curOperator = operator
    prevInput = formattedAns
    curInput = null
    needDisplayReset = true
  }
  // if operator is clicked when first num is being inputed
  else if (prevInput === null && curOperator === null && curInput !== null) {
    curOperator = operator
    prevInput = parseFloat(mainDisplay.textContent)
    subDisplay.textContent = `${prevInput} ${curOperator}`
    curInput = null
    needDisplayReset = true
    debugPrint()
  } // if operator is clicked again after operator has been set
  else if (prevInput !== null && curOperator === null && curInput === null) {
    curOperator = operator
    subDisplay.textContent =
      prevInput !== null ? `${prevInput} ${curOperator}` : `0 ${curOperator}`
    needDisplayReset = true
  } else {
    curOperator = operator
    subDisplay.textContent =
      prevInput !== null ? `${prevInput} ${curOperator}` : `0 ${curOperator}`
    prevInput = 0
    needDisplayReset = true
  }
}

// need conditional to ensure there are 2 operands before handleEval
function handleEvalInput() {
  if (evaluated) {
    // infinite operations
    prevInput = parseFloat(mainDisplay.textContent)
    subDisplay.textContent = `${prevInput} ${curOperator} ${curInput} =`
    mainDisplay.textContent = operate(prevInput, curOperator, curInput)
    needDisplayReset = true
  } else {
    // check for 0 condition
    if (curOperator !== null && curInput == 0) {
      mainDisplay.textContent = 'Result is undefined'
      return
    }

    if (prevInput !== null && curOperator !== null && curInput !== null) {
      const ans = operate(prevInput, curOperator, curInput)
      const numDecimals = dynamicFormat(ans)
      const formattedAns = Number(ans).toFixed(numDecimals)
      subDisplay.textContent = `${prevInput} ${curOperator} ${curInput} =`
      mainDisplay.textContent = `${formattedAns}`
      needDisplayReset = true
      evaluated = true
    } else if (
      prevInput !== null &&
      curOperator !== null &&
      curInput === null
    ) {
      const ans = operate(prevInput, curOperator, prevInput)
      const numDecimals = dynamicFormat(ans)
      const formattedAns = Number(ans).toFixed(numDecimals)
      subDisplay.textContent = `${prevInput} ${curOperator} ${prevInput} =`
      mainDisplay.textContent = `${formattedAns}`
      needDisplayReset = true
      evaluated = true
    } else if (
      prevInput === null &&
      curOperator === null &&
      (curInput === null || curInput !== null)
    ) {
      curInput = parseFloat(mainDisplay.textContent)
      subDisplay.textContent = `${curInput} =`
      mainDisplay.textContent = `${curInput}`
      needDisplayReset = true
      debugPrint()
    }
  }
}

function dynamicFormat(number) {
  const decimals = number.toString().split('.')[1]
  return decimals ? decimals.length : 0
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
    prevInput = parseFloat(-num)
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

function handleDecimal() {
  // handle decimal
  if (!mainDisplay.textContent.includes('.') && curInput !== null) {
    mainDisplay.textContent += '.'
  } else if (curOperator !== null && curInput === null) {
    mainDisplay.textContent = '0.'
  } else {
    return
  }
}

function convertIntFloat(number) {
  return decimal === true ? parseFloat(number) : parseInt(number)
}

function debugPrint() {
  console.log('prevInput: ', prevInput)
  console.log('curOperator: ', curOperator)
  console.log('curInput: ', curInput)
}
