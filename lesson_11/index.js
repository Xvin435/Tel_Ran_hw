function getRandomArr() {
    
    let arr = [];
    for (let i = 0; i < 5; i++) {

        let value;
        do {
            value = Math.floor(Math.random() * 35);
        } while (arr.includes(value));

        arr.push(value);
    }
    return arr;
}

function getAvarage(arr) {

    if (!Array.isArray(arr))
        return -1;

    let sum = 0;
    for (let i = 0; i < arr.length; i++)
        sum += arr[i];

    return sum / arr.length;
}

function getEvenOddCount(arr) {
    let evenCount = 0;
    let oddCount = 0;

    for (let value of arr) 
        if (value % 2 === 0)
            evenCount++;
        else
            oddCount++;
    return { evenCount, oddCount };
}

function spotValue(arr) {

    return {
        "Min value": Math.min(...arr),
        "Max value": Math.max(...arr),
        "Avarage": getAvarage(arr),
        "Even count": getEvenOddCount(arr).evenCount,
        "Odd count": getEvenOddCount(arr).oddCount,
    }
}

function main() {

    let result = "";

    let arr = getRandomArr().sort((a,b) => b - a);
    let spot = spotValue(arr);

    result += "Numbers: " + arr + '\n';
    result += "Min value: " + spot["Min value"] + '\n';
    result += "Max value: " + spot["Max value"] + '\n';
    result += "Avarage: " + spot["Avarage"] + '\n';
    result += "Even count: " + spot["Even count"] + '\n';
    result += "Odd count: " + spot["Odd count"] + '\n';

    alert(result);
}
main();