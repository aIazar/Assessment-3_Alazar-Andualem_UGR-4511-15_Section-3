document.addEventListener("DOMContentLoaded", function() {
    const screenElement = document.getElementById("display");
    const actionButtons = document.querySelectorAll(".btn");
    const resetButton = document.getElementById("clear");
    const calculateButton = document.getElementById("equals");

    let currentValue = "";
    let operatorValue = null;
    let previousValue = null;


    function refreshScreen(value) {
        screenElement.value = value;
    }

    function resetCalculator() {
        currentValue = "";
        previousValue = null;
        operatorValue = null;
        refreshScreen("");
    }


    function processButtonClick(event) {
        const inputValue = event.target.getAttribute("data-value");


        if (["+", "-", "*", "/"].includes(inputValue)) {
            if (previousValue !== null) {
                executeCalculation();
            }
            operatorValue = inputValue;
            previousValue = currentValue;
            currentValue = "";
        } else {
            currentValue += inputValue;
        }

        refreshScreen(currentValue);
    }

    function executeCalculation() {
        if (previousValue !== null && operatorValue !== null) {
            let calculationResult;

            const prevNumber = parseFloat(previousValue);
            const currentNumber = parseFloat(currentValue);

            switch (operatorValue) {
                case "+":
                    calculationResult = prevNumber + currentNumber;
                    break;
                case "-":
                    calculationResult = prevNumber - currentNumber;
                    break;
                case "*":
                    calculationResult = prevNumber * currentNumber;
                    break;
                case "/":
                    if (currentNumber === 0) {
                        calculationResult = "Error";
                    } else {
                        calculationResult = prevNumber / currentNumber;
                    }
                    break;
            }

            currentValue = calculationResult.toString();
            previousValue = null;
            operatorValue = null;
            refreshScreen(currentValue);
        }
    }

    
    actionButtons.forEach(button => {
        button.addEventListener("click", processButtonClick);
    });

    // event listener for equals 
    calculateButton.addEventListener("click", function() {
        executeCalculation();
    });

    // event listener for clear
    resetButton.addEventListener("click", resetCalculator);
});
