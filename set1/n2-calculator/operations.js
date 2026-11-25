/*
  Full Name: Angelo V. Dela Llarte
  Section: IV-BSIT-A
  Activity Code: N2-Calculator
  Date: November 23, 2026
*/

// operations.js - contains the calculator logic, one function per operation

// Returns the sum of two numbers
function add(a, b) {
  return a + b;
}

// Returns the difference (a minus b)
function subtract(a, b) {
  return a - b;
}

// Returns the product of two numbers
function multiply(a, b) {
  return a * b;
}

// Returns a divided by b; throws an error if b is zero to prevent division by zero
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero.");
  }
  return a / b;
}

// Returns the average of an array of numbers using the average operation
function average(numbers) {
  // Add up every number in the array, starting from 0
  const total = numbers.reduce((sum, n) => sum + n, 0);
  return total / numbers.length;
}

// Export the functions so index.js can import and use them
module.exports = { add, subtract, multiply, divide, average };
