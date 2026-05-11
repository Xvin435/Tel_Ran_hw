function getRandomArr() {

    let arr = [];

    while (arr.length < 5) {

        let value = Math.floor(Math.random() * 35);

        if (!arr.includes(value))
            arr.push(value);
    }

    return arr;
}

function getAverage(arr) {

    if (!Array.isArray(arr))
        return -1;

    return arr.reduce((sum, value) => sum + value, 0) / arr.length;
}

function getEvenOddCount(arr) {

    return arr.reduce((count, value) => {

        if (value % 2 === 0)
            count.evenCount++;
        else
            count.oddCount++;

        return count;

    }, { evenCount: 0, oddCount: 0 });
}

function spotValue(arr) {

    let evenOdd = getEvenOddCount(arr);

    return {
        "Min value": Math.min(...arr),
        "Max value": Math.max(...arr),
        "Average": getAverage(arr),
        "Even count": evenOdd.evenCount,
        "Odd count": evenOdd.oddCount,
    }
}

function main() {

    let result = "";

    let arr = getRandomArr().sort((a, b) => b - a);
    let spot = spotValue(arr);

    result += "Numbers: " + arr + '\n';
    result += "Min value: " + spot["Min value"] + '\n';
    result += "Max value: " + spot["Max value"] + '\n';
    result += "Average: " + spot["Average"] + '\n';
    result += "Even count: " + spot["Even count"] + '\n';
    result += "Odd count: " + spot["Odd count"] + '\n';

    alert(result);
}

main();