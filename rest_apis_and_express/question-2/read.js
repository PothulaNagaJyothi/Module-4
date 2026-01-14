const fs = require('fs');
const path = require('path');


function getFileContent() {
    try {
        const filePath = path.join(__dirname, 'Data.txt');
        const data = fs.readFileSync(filePath, 'utf8');
        return data;
    } catch (error) {
        return "Error: Could not read Data.txt. Ensure the file exists.";
    }
}

module.exports = getFileContent;