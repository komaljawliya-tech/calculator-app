/* ==========================================
            DOM ELEMENTS
========================================== */

const display = document.getElementById("display");
const history = document.getElementById("history");

const themeBtn = document.getElementById("themeBtn");
const copyBtn = document.getElementById("copyBtn");
const toast = document.getElementById("toast");

const buttons = document.querySelectorAll("[data-value]");


/* ==========================================
            STATE
========================================== */

let currentInput = "";


/* ==========================================
            DISPLAY
========================================== */

function updateDisplay() {
    display.value = currentInput;
}

function updateHistory(text) {
    history.textContent = text;
}


/* ==========================================
            INPUT
========================================== */

function appendValue(value) {
    currentInput += value;
    updateDisplay();
}


/* ==========================================
            CLEAR
========================================== */

function clearCalculator() {
    currentInput = "";
    updateDisplay();
    updateHistory("");
}


/* ==========================================
            DELETE
========================================== */

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}


/* ==========================================
            CALCULATE
========================================== */

function calculate() {

    if (currentInput.trim() === "") return;

    try {

        const expression = currentInput;

        const result = Function(
            `"use strict"; return (${expression})`
        )();

        updateHistory(expression);

        currentInput = result.toString();

        updateDisplay();

    } catch {

        currentInput = "";

        display.value = "Error";

    }

}


/* ==========================================
            THEME
========================================== */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light");

    themeBtn.innerHTML =
        '<i class="ri-sun-line"></i>';

} else {

    themeBtn.innerHTML =
        '<i class="ri-moon-line"></i>';

}

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light");

    const light =
        document.body.classList.contains("light");

    themeBtn.innerHTML = light
        ? '<i class="ri-sun-line"></i>'
        : '<i class="ri-moon-line"></i>';

    localStorage.setItem(
        "theme",
        light ? "light" : "dark"
    );

});


/* ==========================================
            TOAST
========================================== */

function showToast(message) {

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2000);

}


/* ==========================================
            COPY
========================================== */

copyBtn.addEventListener("click", () => {

    if (display.value === "") return;

    navigator.clipboard.writeText(display.value);

    showToast("Copied!");

});
/* ==========================================
            BUTTON EVENTS
========================================== */

buttons.forEach((button) => {

    button.addEventListener("click", () => {

        const value = button.dataset.value;

        switch (value) {

            case "AC":
                clearCalculator();
                break;

            case "DEL":
                deleteLast();
                break;

            case "=":
                calculate();
                break;

            default:
                appendValue(value);

        }

    });

});


/* ==========================================
            KEYBOARD SUPPORT
========================================== */

document.addEventListener("keydown", (event) => {

    const key = event.key;

    // Numbers
    if (!isNaN(key)) {
        appendValue(key);
        return;
    }

    switch (key) {

        case "+":
        case "-":
        case "*":
        case "/":
        case ".":
        case "%":
            appendValue(key);
            break;

        case "Enter":
        case "=":
            event.preventDefault();
            calculate();
            break;

        case "Backspace":
            deleteLast();
            break;

        case "Delete":
        case "Escape":
            clearCalculator();
            break;
    }

});


/* ==========================================
            LOAD ANIMATION
========================================== */

window.addEventListener("load", () => {

    const calculator = document.querySelector(".calculator");

    calculator.style.opacity = "1";

    calculator.style.transform = "translateY(0)";

});


/* ==========================================
            INITIALIZE
========================================== */

updateDisplay();

updateHistory("");

display.placeholder = "0";


/* ==========================================
            CONSOLE MESSAGE
========================================== */

console.log(
    "%cAurora Calculator",
    "color:#7C3AED;font-size:18px;font-weight:bold;"
);

console.log(
    "%cBuilt by Komal Jawliya",
    "color:#22C55E;font-size:14px;"
);