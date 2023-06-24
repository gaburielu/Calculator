const content = document.querySelector(".content");
const history = document.querySelector(".history");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
let numberContainDecimal = false;
let operator = "";
let histText = "";
let stagingArea = "";

numbers.forEach((number) => {
  number.addEventListener("click", handleNumber);
});
operators.forEach((operator) => {
  operator.addEventListener("click", handleOperator);
});
function operate(pre, post, operand) {
  let preNumI = Number(pre);
  let postNumI = Number(post);
  switch (operand) {
    case "plus":
      return preNumI + postNumI;
      break;
    case "minus":
      return preNumI - postNumI;
      break;
    case "multiply":
      if (postNumI === 0) {
        alert("Can't multiply by 0");
        return preNumI;
        break;
      }
      return preNumI * postNumI;
      break;
    case "divide":
      if (postNumI === 0) {
        alert("Can't divide by 0");
        return preNumI;
        break;
      }
      return preNumI / postNumI;
      break;
    default:
      return preNumI;
  }
}

function decimalClicked(clicked) {
  if (numberContainDecimal == false && clicked == "decimal") {
    stagingArea += ".";
  }
  numberContainDecimal = true;
}
function updateText() {
  let bar = roundToFourDecimals(Number(histText));
  if (isAnOperand(operator)) {
    content.textContent = stagingArea;
    history.textContent = bar + " " + whatOperand(operator);
  } else {
    content.textContent = stagingArea;
    history.textContent = bar;
  }
}

function handleNumber(event) {
  const clicked = event.target.id;
  if (!numberContainDecimal && clicked === "decimal") {
    stagingArea += ".";
    numberContainDecimal = true;
  } else if (clicked != "decimal") {
    stagingArea += clicked;
  }
  updateText();
}

function handleOperator(event) {
  const clicked = event.target.id;

  switch (clicked) {
    case "clear":
      clearAll();
      updateText();
      break;
    case "backspace":
      stagingArea = stagingArea.slice(0, -1);
      updateText();
      break;
    case "equal":
      if (!histText) {
        histText = stagingArea;
        stagingArea = "";
        operator = clicked;
        numberContainDecimal = false;
        break;
      } else {
        let equalA = operate(histText, stagingArea, operator);
        operator = clicked;
        stagingArea = equalA.toString();
        histText = "";
        updateText();
        histText = equalA.toString();
        stagingArea = "";
        numberContainDecimal = false;
        break;
      }
    case "plus":
    case "minus":
    case "multiply":
    case "divide":
      if (!histText) {
        histText = stagingArea;
      } else {
        const answer = operate(histText, stagingArea, operator);
        stagingArea = answer.toString();
        histText = answer.toString();
      }
      operator = clicked;
      updateText();
      stagingArea = "";
      numberContainDecimal = false;
      break;
  }
}

function roundToFourDecimals(number) {
  return Number(parseFloat(number).toFixed(4));
}

function clearAll() {
  histText = "";
  numberContainDecimal = false;
  stagingArea = "";
  operator = "";
  updateText();
}
function isAnOperand(x) {
  return x === "plus" || x === "minus" || x === "multiply" || x === "divide";
}
function whatOperand(x) {
  switch (x) {
    case "plus":
      return "+";
    case "minus":
      return "-";
    case "multiply":
      return "x";
    case "divide":
      return "/";
  }
}
