document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    const clearButton = document.getElementById("clear");
    const equalsButton = document.getElementById("equals");

    let currentInput = "";
    let currentOperator = null;
    let previousInput = null;document.addEventListener("DOMContentLoaded", function() {
        const display = document.getElementById("display");
        const displayHistory = document.getElementById("display-history");
        const buttons = document.querySelectorAll(".btn");
        const clearButton = document.getElementById("clear");
        const equalsButton = document.getElementById("equals");
    
        let currentInput = "";
        let currentOperator = null;
        let previousInput = null;
        let history = "";
    
        // Function to update the display
        function updateDisplay(value) {
            display.value = value;
        }
    
        // Function to update the history
        function updateHistory(value) {
            displayHistory.value = value;
        }
    
        // Function to clear the display
        function clearDisplay() {
            currentInput = "";
            previousInput = null;
            currentOperator = null;
            history = "";
            updateDisplay("0");
            updateHistory("");
        }
    
        // Function to handle number and operator button clicks
        function handleButtonClick(event) {
            const value = event.target.getAttribute("data-value");
    
            if (["+", "-", "*", "/"].includes(value)) {
                if (previousInput !== null && currentInput !== "") {
                    performCalculation();
                }
                currentOperator = value;
                history += `${currentInput} ${value} `;
                previousInput = currentInput;
                currentInput = "";
            } else {
                currentInput += value;
            }
    
            updateDisplay(currentInput);
            updateHistory(history);
        }
    
        // Function to perform the calculation
        function performCalculation() {
            if (previousInput !== null && currentOperator !== null && currentInput !== "") {
                let result;
                const prev = parseFloat(previousInput);
                const current = parseFloat(currentInput);
    
                switch (currentOperator) {
                    case "+":
                        result = prev + current;
                        break;
                    case "-":
                        result = prev - current;
                        break;
                    case "*":
                        result = prev * current;
                        break;
                    case "/":
                        result = current === 0 ? "Error" : prev / current;
                        break;
                }
    
                history += `${currentInput} =`;
                currentInput = result.toString();
                previousInput = null;
                currentOperator = null;
                updateDisplay(currentInput);
                updateHistory(history);
                history = ""; // Reset the history for the next operation
            }
        }
    
        // Event listener for button clicks
        buttons.forEach(button => {
            button.addEventListener("click", handleButtonClick);
        });
    
        // Event listener for equals button
        equalsButton.addEventListener("click", function() {
            performCalculation();
        });
    
        // Event listener for clear button
        clearButton.addEventListener("click", clearDisplay);
    });

    // Function to update the display
    function updateDisplay(value) {
        display.value = value;
    }

    // Function to clear the display
    function clearDisplay() {
        currentInput = "";
        previousInput = null;
        currentOperator = null;
        updateDisplay("");
    }

    // Function to handle number and operator button clicks
    function handleButtonClick(event) {
        const value = event.target.getAttribute("data-value");

        // If the button clicked is an operator
        if (["+", "-", "*", "/"].includes(value)) {
            if (previousInput !== null) {
                performCalculation();
            }
            currentOperator = value;
            previousInput = currentInput;
            currentInput = "";
        } else {
            currentInput += value;
        }

        updateDisplay(currentInput);
    }

    // Function to perform the calculation
    function performCalculation() {
        if (previousInput !== null && currentOperator !== null) {
            let result;

            const prev = parseFloat(previousInput);
            const current = parseFloat(currentInput);

            switch (currentOperator) {
                case "+":
                    result = prev + current;
                    break;
                case "-":
                    result = prev - current;
                    break;
                case "*":
                    result = prev * current;
                    break;
                case "/":
                    if (current === 0) {
                        result = "Error";
                    } else {
                        result = prev / current;
                    }
                    break;
            }

            currentInput = result.toString();
            previousInput = null;
            currentOperator = null;
            updateDisplay(currentInput);
        }
    }

    // Event listener for button clicks
    buttons.forEach(button => {
        button.addEventListener("click", handleButtonClick);
    });

    // Event listener for equals button
    equalsButton.addEventListener("click", function() {
        performCalculation();
    });

    // Event listener for clear button
    clearButton.addEventListener("click", clearDisplay);
});
