// JavaScript code for form validation
// Retrieve the input field value
let getInput = document.getElementById("inputField")
let myForm = document.getElementById("myForm")
let validInput = document.getElementById("validMessage")
myForm.addEventListener("submit", function(event) { 
  let inputVal = getInput.value
  checkInput(inputVal, event)
  event.preventDefault()
})

function checkInput (inputVal, event) {

   // Regular expression pattern for alphanumeric input
  let submitRegex = /^[a-zA-Z0-9]+$/

  // Check if the input value matches the pattern
  if (submitRegex.test(inputVal)) {

    // Valid input: display confirmation and submit the form
    validInput.innerHTML = "Input Confirmed!"
    myForm.submit()

    // Invalid input: display error message
  } else {
    getInput.value = ""
    getInput.placeholder = "INVALID INPUT! Only Numbers/Letters accepted."
    getInput.style.backgroundColor = "red"

    // Prevent form from submitting
    event.preventDefault()
  } 
}
