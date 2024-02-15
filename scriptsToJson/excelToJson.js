const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');
const dataDir = path.join(__dirname, '..', 'data');

// Specify the relative path to the Excel file
const excelFilePath = path.join(dataDir, 'students.xlsx');

// Specify the relative path to the output JSON file
const jsonFilePath = path.join(dataDir, 'students.json');

// Log the start of the script
console.log('Script started.');

// Check if the Excel file exists
if (fs.existsSync(excelFilePath)) {
  // Read Excel file
  const workbook = xlsx.readFile(excelFilePath);

  // Assume the data is in the first sheet (Sheet1)
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Convert to JSON
  const jsonData = xlsx.utils.sheet_to_json(sheet);

  // Write JSON to a file
  fs.writeFileSync(jsonFilePath, JSON.stringify(jsonData, null, 2));

  console.log('Conversion completed.');
} else {
  console.error(`Excel file not found: ${excelFilePath}`);
}

// Log the end of the script
console.log('Script completed.');
