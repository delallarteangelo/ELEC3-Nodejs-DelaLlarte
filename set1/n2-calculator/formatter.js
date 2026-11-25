/*
  Full Name: Angelo V. Dela Llarte
  Section: IV-BSIT-A
  Activity Code: N2-Calculator
  Date: November 23, 2026
*/
// formatter.js use niya is para sa pag input and display ng format 

// symbols for each operation, na gagamitin sa formatResult()
const symbols = {
  add: "+",
  subtract: "-",
  multiply: "*",
  divide: "/",
};

function formatResult(operation, numbers, result) {
  // Average has no single symbol, so it is shown as average(a, b, c) = result
  if (operation === "average") {
    return `average(${numbers.join(", ")}) = ${result}`;
  }
  // Join the numbers with the symbol, example na input [12, 8] into "12 + 8", then add the result
  return `${numbers.join(` ${symbols[operation]} `)} = ${result}`;
}

// Export so index.js para maimport and magamit ang formatResult() function sa index.js
module.exports = { formatResult };
