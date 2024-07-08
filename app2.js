const primaryDisplay = document.querySelector(".primary-display");
const secondaryDisplay = document.querySelector(".secondary-display");
const buttons = document.querySelector(".buttons-container");
let operator = "";
let previousNumber = "";
let isPrevOperator = false;

// Function to perform the calculation based on the operator
function calculate() {
  switch (operator) {
    case "+":
      return Number(previousNumber) + Number(primaryDisplay.innerHTML);
    case "-":
      return Number(previousNumber) - Number(primaryDisplay.innerHTML);
    case "x":
      return Number(previousNumber) * Number(primaryDisplay.innerHTML);
    case "÷":
      return Number(previousNumber) / Number(primaryDisplay.innerHTML);
    case "%":
      return Number(previousNumber) % Number(primaryDisplay.innerHTML);
  }
}

// Adding event listener to the container holding the buttons, not the buttons themselves.
// See event propagation, event bubbling
buttons.addEventListener("click", (event) => {
  // If a click happens outside of the buttons, do nothing and end the function
  if (!event.target.classList.contains("button")) return;
  let primaryValue = primaryDisplay.innerHTML;
  let buttonValue = event.target.innerHTML;
  // classList, as the name suggests, stores all the classes of the clicked element as an array
  // Based on classList, I determine the action/function to perform

  // If the AC button is pressed, perform the reset action
  if (event.target.classList.contains("ac")) {
    operator = "";
    previousNumber = "";
    primaryDisplay.innerHTML = "0";
    secondaryDisplay.innerHTML = "";
  }

  // If any number button is pressed
  if (event.target.classList.contains("number")) {
    // Check the length of the current number on the screen. My screen allows a maximum of 7 digits. Otherwise, it overflows.
    // Therefore, I add this check to ignore any input beyond 7 digits.
    if (primaryValue.length < 7)
      if (primaryValue !== "0") {
        // If the screen only shows 0, a different action is needed; otherwise, a different action is needed
        // If the screen does not only show 0, append the clicked number to the screen
        primaryDisplay.innerHTML += buttonValue;
      } else if (buttonValue !== "0") {
        // If the screen only shows 0 and the clicked number is different from 0, display the clicked number on its own. Thus, 0 is removed.
        primaryDisplay.innerHTML = buttonValue;
      } // Otherwise, do nothing. If the screen shows 0 and the clicked number is 0, do nothing. It's a wasted click.
  }

  // If the +/- button is clicked
  if (event.target.classList.contains("pm")) {
    // Check the current number on the screen. Since I get it as innerHTML, even though it's a number, in my mind it's actually a string
    // Check the first character of that string for the - sign.
    // If there is a - sign, I need to remove it
    // Display the part after the - sign on the screen
    if (primaryValue[0] == "-")
      primaryDisplay.innerHTML = primaryValue.substring(1);
    // If there is no - sign on the screen
    // If the screen length is less than 7 and the current number is not just 0
    // Then I need to add the - sign
    // Add the - sign at the beginning and append the rest
    else if (primaryValue.length < 7 && primaryValue !== "0")
      primaryDisplay.innerHTML = "-" + primaryValue;
  }

  // If the . button is clicked
  if (event.target.classList.contains("decimal")) {
    // Check if there is already a . sign in the current number on the screen
    // If not, add the . sign at the end of the number
    if (!primaryValue.includes(".")) {
      primaryDisplay.innerHTML += ".";
    }
    // If there is, do nothing
  }

  // If one of the operator buttons (+, *, -, /) is clicked
  if (event.target.classList.contains("operator")) {
    // I need to check if the previously clicked button was an operator. Check if the operator button was clicked consecutively.
    // For this, I use the isPrevOperator variable, which I initially set to false at the beginning of the code
    // If the operator button was not clicked consecutively
    if (!isPrevOperator) {
      // I need to check if my top screen, i.e., the result screen, i.e., secondaryDisplay, is empty
      // I also need to check if there is an active operator
      // If my result screen is not empty and I have an active operator, I need to perform the calculation before setting the newly clicked operator as the active operator
      // For example, if my result screen shows "12 +" and the primary screen shows "6" and the "-" operator is clicked
      // Before performing the operations for the - operator, I need to perform the current operation, i.e., 12+6, and write the result to the result screen, appending the - operator
      // Thus, my result screen should now show "18 -"
      if (secondaryDisplay.innerHTML && operator) {
        // If my result screen is not empty and I have an active operator, I perform the calculation first and store the result in the previousNumber variable
        // I call the calculate function defined above to perform the calculation
        previousNumber = calculate();
        // If my result screen is empty or I do not have an active operator, I assign the current number on the primary screen to the previousNumber variable
      } else previousNumber = primaryValue;
      // In both cases, I reset the primary screen
      primaryDisplay.innerHTML = "0";
    }
    // I store the clicked operator in the global operator variable for use in subsequent operations
    operator = buttonValue;
    // I add the result number, i.e., the previousNumber variable, and the entered operator to my result screen
    secondaryDisplay.innerHTML = previousNumber + " " + operator;
    // To check if the operator button was clicked consecutively, I set the isPrevOperator variable to true if the last clicked button was an operator
    isPrevOperator = true;
  } else isPrevOperator = false; // If a button other than the operator button is clicked, set this to false
  
  // If the = button is clicked
  if (event.target.classList.contains("equal")) {
    // Call the calculate function defined above to perform the current calculation
    previousNumber = calculate();
    // Then reset the primary screen and operator variable, and display the result on the result screen
    operator = "";
    secondaryDisplay.innerHTML = previousNumber;
    primaryDisplay.innerHTML = "0";
    isPrevOperator = true;
  }
});


/* let x = false;
if(x){
    console.log("yes")
} else if(!x){
    console.log("no")
}
if(x === true){
    console.log("yes")
} else if(x === false){
    console.log("no")
}
 */








