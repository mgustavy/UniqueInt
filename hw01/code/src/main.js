const fs = require('fs');
const path = require('path');

function parseAndFilter(sourceFile, outputFile) {
    /**
     * This method extracts unique integers from source file and writes them to the output file.
     */
    let uniqueIntegers = [];
    const fileContent = fs.readFileSync(sourceFile, 'utf8');
    const lines = fileContent.split('\n');

    for (let line of lines) {
        // Remove leading/trailing whitespace
        line = line.trim();
        // Skip empty lines or lines with multiple integers
        if (!line || line.split(/\s+/).length > 1) {
            continue;
        }
        // Use regex to match valid integers (positive or negative)
        const match = line.match(/^[-+]?\d+$/);
        if (match) {
            const num = parseInt(line, 10);
            // Check if the number is already in uniqueIntegers
            if (!uniqueIntegers.includes(num)) {
                uniqueIntegers.push(num);
            }
        }
    }

    // Sort the unique integers
    uniqueIntegers.sort((a, b) => a - b);

    // Write the result to the output file
    const outputContent = uniqueIntegers.join('\n');
    fs.writeFileSync(outputFile, outputContent);
}

function processSampleFolder(sampleFolder, resultFolder) {
    /**
     * The method processes all .txt files in the sample folder and creates corresponding result files in the result folder.
     */
    
    // Create the result folder if it doesn't exist
    if (!fs.existsSync(resultFolder)) {
        fs.mkdirSync(resultFolder, { recursive: true });
    }

    // Process each file in the sample folder
    const files = fs.readdirSync(sampleFolder);
    for (let filename of files) {
        if (filename.endsWith('.txt')) {
            const inputPath = path.join(sampleFolder, filename);
            const outputPath = path.join(resultFolder, `${filename}_result`);
            
            const startTime = Date.now();
            parseAndFilter(inputPath, outputPath);
            const endTime = Date.now();
            
            const elapsedTime = (endTime - startTime) / 1000;
            console.log(`Processed ${filename} in ${elapsedTime.toFixed(4)} seconds`);
        }
    }
}

// Usage
const sampleFolder = '../../sample_inputs';
const resultFolder = '../../sample_results';
const globalStartTime = process.hrtime();
processSampleFolder(sampleFolder, resultFolder);
const globalEndTime = process.hrtime(globalStartTime);
const totalExecutionTime = globalEndTime[0] * 1000 + globalEndTime[1] / 1e6;
console.log(`\nTotal processing time: ${totalExecutionTime.toFixed(2)} milliseconds`);