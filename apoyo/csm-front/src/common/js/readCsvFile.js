const fileReadingFinished = (event) => {
    var csv = event.target.result;
    const cleanedCsv = csv.replace(/(")/g, '');
    return processData(cleanedCsv);
}

const processData = (csv) => {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = allTextLines.map(data => data.split(','));
    return lines.filter((data, index) => {
        if(index !== 0 && data.length === 13) return true;
        return false;
    });
}

function readCsvFile(file) {
    var reader = new FileReader();     
    reader.readAsText(file);
    reader.onload = fileReadingFinished;    
}

export default readCsvFile;
