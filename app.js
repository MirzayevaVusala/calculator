const calculationDisplay = document.querySelector('.calculation');
const inputDisplay = document.querySelector('.input');
const historyDisplay = document.querySelector('.history');

let currentInput = '';
let previousInput = '';
let operation = '';
let history = [];

function updateDisplay() {
    calculationDisplay.textContent = previousInput + (operation ? ` ${operation}` : '');
    inputDisplay.textContent = currentInput;
}


function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operation = '';
    updateDisplay();
    history = [];
    updateHistoryDisplay();
}

function appendNumber(number) {
    if (currentInput.length < 20) {
        currentInput += number;
        updateDisplay();
    }
}

function chooseOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '' && operation) {
        calculate();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}


function calculate() {
    let computation;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case 'x':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        case '%':
            computation = (prev * current) / 100;
            break;
        default:
            return;
    }

    currentInput = computation.toString();
    operation = '';
    previousInput = '';
    updateDisplay();

    addToHistory(prev, operation, current, computation);
}


function addToHistory(prev, op, current, result) {
    const entry = `${prev} ${op} ${current} = ${result}`;
    history.push(entry);
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyDisplay.innerHTML = history.join('<br>'); 
}


function togglePlusMinus() {
    if (currentInput !== '') {
        currentInput = (parseFloat(currentInput) * -1).toString();
        updateDisplay();
    }
}

function clearLastInput() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

document.querySelector('.clear').addEventListener('click', clearCalculator);
document.querySelector('.plus').addEventListener('click', () => chooseOperation('+'));
document.querySelector('.subtraction').addEventListener('click', () => chooseOperation('-'));
document.querySelector('.multiple').addEventListener('click', () => chooseOperation('x'));
document.querySelector('.division').addEventListener('click', () => chooseOperation('/'));
document.querySelector('.percent').addEventListener('click', () => chooseOperation('%'));
document.querySelector('.plus-minus').addEventListener('click', togglePlusMinus);
document.querySelector('.clear-back').addEventListener('click', clearLastInput);
document.querySelector('.equal').addEventListener('click', () => {
    if (currentInput !== '') {
        calculate();
        previousInput = '';
    }
});
const numberButtons = document.querySelectorAll('.button.gray');
numberButtons.forEach(button => {
    button.addEventListener('click', () => appendNumber(button.textContent));
});



