const grd = document.querySelector("#calculator-grid");
const screenText = document.querySelector("#out-screen-text");
const screenHistory = document.querySelector("#out-screen-history");
const onButton = document.querySelector("#on-button");
const offButton = document.querySelector("#off-button");

let value = 0;
let screenValue = 0;
let currentOperator = '';
let isOn = false;
let calculated = false;

function createButton(target, text, type) {
    let buttonValue = text;
    const but = document.createElement("button");
    but.textContent = text;
    but.classList.add("button");
    if (type == 1 || type == 3 || type == 4) {
        but.classList.add("calculator-button");
        if (type == 3) {
            but.classList.add("button-equal");
        }
    }
    else {
        but.classList.add("operation-button");
    }

    but.addEventListener("click", () => {
        buttonClick(buttonValue, type);
    });
    window.addEventListener('keydown', function(event) {
        if (event.key == text) {
            buttonClick(buttonValue, type);
        }
    });

    target.appendChild(but);
}

function buttonClick(buttonValue, type) {
    if (isOn == false) {
        alert("Calculator is Off...");
        return;
    }
    if (type == 1) {
        if (true == calculated) {
            screenValue = 0;
            calculated = false;
        }
        screenValue *= 10;
        screenValue += buttonValue;
        screenText.textContent = screenValue;
    }
    else if (type == 2) {
        currentOperator = buttonValue;
        if (screenValue != '') {
            value = screenValue;
            screenHistory.textContent = screenValue + ' ' + buttonValue;
            screenText.textContent = '';
            screenValue = '';
        }
        else {
            screenHistory.textContent = value + ' ' + buttonValue;
        }
    }
    else if (type == 3) {
        operate();
        calculated = true;
    }
    else {
        reset();
    }
}

function operate() {
    if (screenText.textContent == '') {
        reset();
        screenText.textContent = 'Syntax Error';
        return;
    }
    screenValue = parseFloat(screenValue);
    value = parseFloat(value);
    switch (currentOperator) {
        case '+':
            value += screenValue;
            break;
        case '-':
            value -= screenValue;
            break;
        case '*':
            value *= screenValue;
            break;
        case '/':
            if (screenValue == 0) {
                screenText.textContent = 'Math Error';
                value = 0;
                screenValue = 0;
                screenHistory.innerHTML = '';
                return;
            }
            value /= screenValue;
            break;
        default:
            value = screenValue;
            break;
    }
    if (true == checkOverflow()) {
        reset();
        screenText.textContent = 'Overflow';
        return;
    }
    value = Math.round(value * 100) / 100;
    screenValue = value;
    screenText.textContent = value.toFixed(2);
    screenHistory.textContent = '';
    currentOperator = '';
}

function checkOverflow() {
    if (value >= 999999999)
        return true;
    return false;
}

function createButtons() {
    createButton(grd, 1, 1);
    createButton(grd, 2, 1);
    createButton(grd, 3, 1);
    createButton(grd, '+', 2);
    createButton(grd, 4, 1);
    createButton(grd, 5, 1);
    createButton(grd, 6, 1);
    createButton(grd, '-', 2);
    createButton(grd, 7, 1);
    createButton(grd, 8, 1);
    createButton(grd, 9, 1);
    createButton(grd, '*', 2);
    createButton(grd, 'C', 4);
    createButton(grd, 0, 1);
    createButton(grd, '=', 3);
    createButton(grd, '/', 2);
}

createButtons();

function reset() {
    screenValue = 0;
    value = 0;
    screenHistory.textContent = '';
    screenText.textContent = '';
}

onButton.addEventListener("click", () => {
    isOn = true;
    reset();
    screenText.textContent = "Welcome";
});

offButton.addEventListener("click", () => {
    isOn = false;
    reset();
});