// Задача № 1
const str = 'js';
const upperCaseStr = str.toUpperCase();
console.log(upperCaseStr);

//Задача № 2
function filterByPrefix(arrayOfStrings, prefix) {
    const result = arrayOfStrings.filter(str => str.toLowerCase().startsWith(prefix.toLowerCase()));
    console.log(result);
    return result;
}

const strings = ["Apple", "banana", "Apricot", "cherry", "Avocado"];
const prefix = "a";
filterByPrefix(strings, prefix);

//Задача № 3
const number = 32.58884;

const floorNumber = Math.floor(number);
console.log(floorNumber);

const ceilNumber = Math.ceil(number);
console.log(ceilNumber);

const roundNumber = Math.round(number);
console.log(roundNumber);


//Задача № 4
const numbers = [52, 53, 49, 77, 21, 32];

const minValue = Math.min(...numbers);
console.log(minValue);

const maxValue = Math.max(...numbers);
console.log(maxValue);

//Задача № 5
function generateRandomNumber() {
    const randomNumber = Math.floor(Math.random() * 10) + 1;
    console.log(randomNumber);
}

//Задача № 6

function generateRandomArray(maxNumber) {
    const arrayLength = Math.floor(maxNumber / 2);
    const randomArray = [];

    for (let i = 0; i < arrayLength; i++) {
        const randomNumber = Math.floor(Math.random() * (maxNumber + 1));
        randomArray.push(randomNumber);
    }

    console.log(randomArray);
    return randomArray;
}

//Задача № 7
function getRandomNumberInRange(min, max) {
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(randomNumber);
    return randomNumber;
}

//Задача № 8
const actualDate = new Date();
console.log(currentDate);

//Задача № 9
const currentDate = new Date();
const futureDate = new Date(currentDate.getTime() + 73 * 24 * 60 * 60 * 1000);
console.log(futureDate);

//Задача № 10
function formatDate(date) {
    const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    const dayOfWeek = daysOfWeek[date.getDay()];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const formattedDate = `Дата: ${day} ${month} ${year} — это ${dayOfWeek}.\nВремя: ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}