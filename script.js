const firstOperand = document.getElementById("first-operand");
const newOperand = document.getElementById("operand");
const operators = document.querySelectorAll("button.operator");
const digits = document.querySelectorAll("button.digit");
const functionsElements = document.querySelectorAll("button.function");
const screen = document.getElementById("screen");

console.log(digits);
const operations = {
  "+": () => sum(firstOperand.textContent, newOperand.textContent),
  x: () => multiply(firstOperand.textContent, newOperand.textContent),
  "/": () => divide(firstOperand.textContent, newOperand.textContent),
  "-": () => subtract(firstOperand.textContent, newOperand.textContent),
  "%": () => modulus(firstOperand.textContent, newOperand.textContent),
};
const functions = {
  clear: () => clearAll(screen),
  delete: popDigit(),
  "decimal-point": () => addDecimalPoint(newOperand),
  "sign-toggler": () => toggleSign(newOperand),
  equal: () =>
    operate(document.getElementById("operator").textContent, newOperand),
};

function popDigit() {
  return () => {
    if (newOperand.textContent.length > 0)
      newOperand.textContent = newOperand.textContent.slice(
        0,
        newOperand.textContent.length - 1
      );
  };
}

function operate(operator, operand) {
  if (!document.getElementById("new-operand").textContent) {
    document.getElementById("new-operand").textContent = operand.textContent;
    operand.textContent = String(operations[operator]());
  }
}

function setOperand(digit, operand) {
  if (operand.textContent.length == 0 && digit == 0) operand.textContent = "0.";
  if (operand.textContent.length < 10)
    operand.textContent = operand.textContent + digit;
}
function setOperation(op, firstOperand) {
  document.getElementById("operator").textContent = op;
  if (
    newOperand.textContent.length > 0 &&
    firstOperand.textContent.length == 0
  ) {
    firstOperand.textContent = newOperand.textContent;
    newOperand.textContent = "";
  } else if (firstOperand.textContent.length > 0) {
    firstOperand.textContent = newOperand.textContent;
    newOperand.textContent = "";
    document.getElementById("new-operand").textContent = "";
  }
}

digits.forEach((e) => {
  e.addEventListener("click", () => {
    setOperand(e.id, newOperand);
  });
});
operators.forEach((e) => {
  e.addEventListener("click", () => {
    setOperation(e.id, firstOperand);
  });
});
functionsElements.forEach((e) => {
  e.addEventListener("click", () => {
    functions[e.id]();
  });
});

window.addEventListener("keypress", (ev) => {
  if (+ev.key >= 0 && +ev.key <= 9) setOperand(Number(ev.key), newOperand);
});

function sum(n1, n2) {
  return +n1 + +n2;
}
function subtract(n1, n2) {
  return +n1 - +n2;
}
function multiply(n1, n2) {
  return +n1 * +n2;
}
function divide(n1, n2) {
  if (n2) return +n1 / +n2;
}
function modulus(n1, n2) {
  return +n1 % +n2;
}
function toggleSign(operand) {
  operand.textContent = String(-Number(operand.textContent));
}
function addDecimalPoint(operand) {
  if (!operand.textContent.includes(".") && operand.textContent.length)
    operand.textContent = operand.textContent + ".";
}

function clearAll(screen) {
  for (const child of screen.firstElementChild.children) {
    child.textContent = "";
  }
  screen.lastElementChild.textContent = "";
}
