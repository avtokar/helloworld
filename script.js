//задание 1
function min(a, b) {

    if (a < b) {
        return a;
    }
    else {
        return b;
    }
}

//задание 2
function checkParity(number) {
    if (number % 2 === 0) {
        return 'Число четное';
    }
    else {
        return 'Число нечетное';
    }
}

//задание 3
function printSquare(number) {
    console.log(number ** 2);
}

function getSquare(number) {
    return number ** 2;
}