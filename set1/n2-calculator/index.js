/*
  Full Name: Angelo V. Dela Llarte
  Section: IV-BSIT-A
  Activity Code: N2-Calculator
  Date: November 23, 2026
*/



// Built-in module: path, used here to get the script's file name
const path = require("path");

// Custom modules na ginawa natin sa operations.js and formatter.js
const operations = require("./operations");
const { formatResult } = require("./formatter");

// process.argv purpose ay para sa pagkuha ng command line arguments na ipinasok ng user
const scriptName = path.basename(process.argv[1]);
// First user argument ay operation muna then followed by numbers
const [operation, ...args] = process.argv.slice(2);

// message dialog sa user kung paano gamitin ang calculator
function showUsage() {
  console.log(`Usage: node ${scriptName} <operation> <number> <number> [...]`);
  console.log("Operations: add, subtract, multiply, divide, average");
  console.log(`Example: node ${scriptName} add 12 8`);
}

// mag pprint ng error message dahil sa invalid input or operation, then mag eend yung program via exit
function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

// if walang operation na ipinasok ng user, ipapakita yung usage message then mag eexit yung program
if (!operation) {
  showUsage();
  process.exit(1);
}

// kapag invalid yung operation na ipinasok ng user, mag eexit yung program with error message
if (typeof operations[operation] !== "function") {
  fail(`Unknown operation "${operation}". Use add, subtract, multiply, divide, or average.`);
}

// kinoconvert yung user input na string numbers into actual numbers using map(Number)
const numbers = args.map(Number);

// stop kapag hindi valid yung numbers na ipinasok ng user, example na input [12, "abc"] or 
// walang input at mag eexit yung program with error message
if (numbers.length === 0 || numbers.some(Number.isNaN)) {
  fail("Please provide valid numbers, e.g. node index.js add 12 8");
}

// checks kung average operation, it can take any number of inputs, pero kung hindi siya average operation, nirerequire siya ng exactly two numbers
if (operation !== "average" && numbers.length !== 2) {
  fail(`"${operation}" needs exactly two numbers.`);
}

try {
  // checks if the operation is average, if yes, it calls the average function from operations.js with the numbers array,
  //  otherwise it calls the corresponding operation function with the first two numbers
  const result =
    operation === "average"
      ? operations.average(numbers)
      : operations[operation](numbers[0], numbers[1]);
  console.log(formatResult(operation, numbers, result));
} catch (err) {
  // Catches the divide-by-zero error thrown in operations.js
  fail(err.message);
}
