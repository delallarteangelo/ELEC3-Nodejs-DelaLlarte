/*
  Full Name: Angelo V. Dela Llarte
  Section: IV-BSIT-A
  Activity Code: N3-File Manager
  Date: November 24, 2026
*/

//importing the required modules for file management 
//fs means file system, path is for handling and transforming file paths, and url is for working with URLs
import fs from "fs";
import path from "path"; //path module is used to handle and transform file paths
import { fileURLToPath } from "url"; //fileURLtoPath is used to convert a file URL to a path

// __filename and __dirname are used to get the current file's name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a "files" directory if it doesn't exist, to store the files managed by this program
const filesDir = path.join(__dirname, "files");
if (!fs.existsSync(filesDir)) fs.mkdirSync(filesDir);

// Get the command and file name from the command line arguments, and join the rest of the arguments as content
const [command, rawName, ...rest] = process.argv.slice(2);
const content = rest.join(" ");

// path.basename keeps every file inside the files folder
const filePath = rawName ? path.join(filesDir, path.basename(rawName)) : null;

function fail(message) { // Print an error message  if the command is invalid or if the file does not exist, then exit the program
  console.log(`Error: ${message}`);
  process.exit(1);
}

function needName() { //will check if the command needs a file name, and if not provided, 
                        //it will print an error message and exit the program
  if (!rawName) fail(`The "${command}" command needs a file name.`);
}

// Switch statement to handle the different commands: create, read, update, delete, and list
switch (command) {
  case "create": //create a new file with the specified name and content
    fs.writeFileSync(filePath, content);
    console.log(`Created ${path.basename(filePath)}`);
    break;

  case "read": //read the contents of the specified file and print it to the console, 
    needName();
    try {
      console.log(fs.readFileSync(filePath, "utf8"));
    } catch (err) {
      if (err.code === "ENOENT") fail(`${rawName} does not exist.`);
      fail(err.message);
    }
    break;

  case "update": //append the specified content to the end of the specified file,
    needName();
    if (!fs.existsSync(filePath)) fail(`${rawName} does not exist.`);
    fs.appendFileSync(filePath, content);
    console.log(`Updated ${path.basename(filePath)}`);
    break;

  case "delete": //delete the specified file from the files directory
    needName();
    try {
      fs.unlinkSync(filePath);
      console.log(`Deleted ${path.basename(filePath)}`);
    } catch (err) {
      if (err.code === "ENOENT") fail(`${rawName} does not exist.`);
      fail(err.message);
    }
    break;

  case "list": { //list all the files in the files directory, and print their full path, name, extension, and contents to the console
    const names = fs.readdirSync(filesDir);
    if (names.length === 0) {
      console.log("The files folder is empty.");
      break;
    }
    names.forEach((name) => { //it displays the full path, file name, extension, and contents of each file in the "files" directory
      const full = path.join(filesDir, name);
      console.log("Full path: ", full);
      console.log("File name: ", path.basename(full));
      console.log("Extension: ", path.extname(full));
      console.log("Contents:  ", fs.readFileSync(full, "utf8"));
      console.log("---");
    });
    break;
  }

  // default case to handle invalid commands, and print the usage instructions to the console
  default:
    console.log("Usage:");
    console.log('  node index.js create <file> "<text>"');
    console.log("  node index.js read <file>");
    console.log('  node index.js update <file> "<text to append>"');
    console.log("  node index.js delete <file>");
    console.log("  node index.js list");
}