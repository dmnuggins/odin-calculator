let prevInput = null
let curInput = null
let operator = ''

// state
let opPressed = false

// add click handler to all buttons
const buttons = document.querySelectorAll('button')
const subDisplay = document.querySelector('.sub')
const mainDisplay = document.querySelector('.main')
const clearEntryButton = document.querySelector('#ce')
const clearButton = document.querySelector('#c')

// add click listener to all number
buttons.forEach((button) => {
  if (button.className === 'num') {
    button.addEventListener('click', () => {
      const numInput = parseInt(button.textContent)
      // console.log(button.innerText, ' clicked')
      if (opPressed) {
        opPressed = false
        curInput = 0
      }
      curInput = curInput * 10 + numInput
      console.log('curInput: ', curInput)
      mainDisplay.textContent = formatNumberWithCommas(curInput)
    })
  }
  // QUEUES OPERATOR
  if (button.className === 'operator') {
    button.addEventListener('click', () => {
      // When operator is click
      handleModInput(button.innerText)
    })
  }
  // MODIFIES CUR INPUT
  if (button.className === 'mod') {
    button.addEventListener('click', () => {
      console.log(button.innerText, ' mod clicked')
      // handle modifier button input
    })
  }
  // EQUALS
  if (button.id === 'eval') {
    button.addEventListener('click', () => {
      // console.log(button.innerText, ' clicked')
      handleEval()
    })
  }
})

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

function handleModInput(btnText) {
  setOperator(btnText)
  opPressed = true
  if (prevInput && curInput) {
    subDisplay.textContent = `${prevInput} ${operator}`
    console.log('ready to eval')
  } else if (!prevInput) {
    prevInput = curInput
    curInput = null
    subDisplay.textContent = `${prevInput} ${operator}`
  }
}

function handleEval() {
  mainDisplay.textContent = operate(operator, prevInput, curInput)
  subDisplay.textContent = `${prevInput} ${operator} ${curInput} =`
}

function setOperator(btnText) {
  operator = btnText
}

// evalute the result given the operator and inputs
function operate(operator, prev, input) {
  let ans = 0
  switch (operator) {
    case '÷':
      // divide
      ans = div(prev, input)
      break
    case '×':
      // multiply
      ans = mult(prev, input)
      break
    case '-':
      // subtract
      ans = sub(prev, input)
      break
    case '+':
      // add
      ans = add(prev, input)
      break
    default:
      break
  }
  return ans
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
