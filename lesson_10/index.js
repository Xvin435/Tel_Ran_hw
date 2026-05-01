let data = prompt("Write a number: ");

while (isNaN(data) || data === false || data === null) {
    data = prompt("Please enter a valid number: ");
}

if (data === null || data === false)
    alert("No valid number entered.");
else
    convertData();

function convertData() {
    
    data = parseInt(data);

    let result = ""; 

    result += "Decimal: " + data.toString(10) + '\n';
    result += "Hexadecimal: " + data.toString(16) + '\n';

    result += "Binary: " + (data >= 0 ? data.toString(2) : (data >>> 0).toString(2)) + '\n';
    if (data >= 0) 
        result += "Padded Binary: " + data.toString(2).padStart(32, '0') + '\n';

    let reverseTemp = data < 0 ? '-' : '';
    let reverseData = Math.abs(data).toString().split('').reverse().join('');
    result += "Reversed: " + reverseTemp + reverseData + '\n';

    let digitSumTemp = data.toString().split('');
    let digitSumResult = 0;
    for (let i = 0; i < digitSumTemp.length; i++)
        if (digitSumTemp[i] !== '-')
            digitSumResult += parseInt(digitSumTemp[i]);
    result += "Digit Sum: " + digitSumResult + '\n';

    alert(result);
}