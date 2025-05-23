function startGame() {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;

  alert("Добро пожаловать в игру 'Угадай число'!");
  alert("Я загадал число от 1 до 100. Попробуй угадать его.");

  function guessNumberGame() {
    const userGuess = parseInt(prompt("Введите ваше предположение: "), 10);
    attempts += 1;


    if (userGuess < randomNumber) {
      alert("Загаданное число больше. Попробуйте еще раз.");
      guessNumberGame();
    } else if (userGuess > randomNumber) {
      alert("Загаданное число меньше. Попробуйте еще раз.");
      guessNumberGame();
    } else {
      alert(`Поздравляем! Вы угадали число ${randomNumber} за ${attempts} попыток.`);
    }
  }

  guessNumberGame();
}

function startGameArithmetic() {
  alert("Добро пожаловать в арифметическую игру!");
  alert("Решите предложенные арифметические задачи.");

  const operators = ['+', '-', '*', '/'];
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const task = `${num1} ${operator} ${num2}`;

  alert(`Задача: ${task}`);

  const userAnswer = parseFloat(prompt("Введите ваш ответ: "));

  let correctAnswer;

  switch (operator) {
    case '+':
      correctAnswer = num1 + num2;
      break;
    case '-':
      correctAnswer = num1 - num2;
      break;
    case '*':
      correctAnswer = num1 * num2;
      break;
    case '/':
      correctAnswer = num1 / num2;
      break;
  }

  if (userAnswer === correctAnswer) {
    alert("Верно!");
  } else {
    alert(`Ошибка. Правильный ответ: ${correctAnswer}`);
  }

  const playAgain = confirm("Хотите сыграть еще раз?");
  if (playAgain) {
    startGameArithmetic();
  } else {
    alert("Спасибо за игру! До свидания.");
  }
}
//Задание № 1
const arr = [1, 5, 4, 10, 0, 3];

for (const element of arr) {
  console.log(element);
  if (element === 10) {
    break;
  }
}

//Задание № 2
const arr = [1, 5, 4, 10, 0, 3];
const index = arr.indexOf(4);
console.log(index);

//Задание № 3
const arr = [1, 3, 5, 10, 20];
const result = arr.join(' ');
console.log(result);

//Задание № 4
const array = [];

for (let i = 0; i < 3; i++) {
  const row = [];
  for (let j = 0; j < 3; j++) {
    row.push(1);
  }
  array.push(row);
}

console.log(array);

//Задание № 5
const arr = [1, 1, 1];
arr.push(2, 2, 2);
console.log(arr);

//Задание № 6
const arr = [9, 8, 7, 'a', 6, 5];
const filteredArr = arr.filter(item => item !== 'a');
console.log(filteredArr);

//Задание № 7
const arr = [9, 8, 7, 6, 5];
const userInput = prompt('Угадайте число из массива!');
if (arr.includes(Number(userInput))) {
  alert('Угадал');
} else {
  alert('Не угадал');
}

//Задание № 8
const str = 'abcdef';
const reversedStr = str.split('').reverse().join('');
console.log(reversedStr); // выводит 'fedcba'

//Задание № 9
const arr = [[1, 2, 3], [4, 5, 6]];
const flattenedArr = arr.flat();
console.log(flattenedArr); // выводит [1, 2, 3, 4, 5, 6]

//Задание № 10
const arr = [2, 5, 8, 3, 1, 7, 4, 9, 6, 10];
for (let i = 0; i < arr.length - 1; i++) {
  const sum = arr[i] + arr[i + 1];
  console.log(`Сумма элементов ${arr[i]} и ${arr[i + 1]} равна ${sum}`);
}

//Задание № 11
function squareArrayElements(numbers) {
  const squaredNumbers = [];
  for (let i = 0; i < numbers.length; i++) {
    squaredNumbers.push(numbers[i] ** 2);
  }
  return squaredNumbers;
}

//Задание № 12
function getWordLengths(words) {
  const lengths = [];
  for (let i = 0; i < words.length; i++) {
    lengths.push(words[i].length);
  }
  return lengths;
}

//Задание № 13
function getNegativeNumbers(numbers) {
  const negativeNumbers = [];
  for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] < 0) {
      negativeNumbers.push(numbers[i]);
    }
  }
  return negativeNumbers;
}

//Задание № 14
const array = [];
for (let i = 0; i < 10; i++) {
  array.push(Math.floor(Math.random() * 11));
}
const evenNumbers = [];
for (let i = 0; i < array.length; i++) {
  if (array[i] % 2 === 0) {
    evenNumbers.push(array[i]);
  }
}
console.log('Исходный массив:', array);
console.log('Массив с четными значениями:', evenNumbers);

//Задание № 15
const array = [];
for (let i = 0; i < 6; i++) {
  array.push(Math.floor(Math.random() * 10) + 1);
}
let sum = 0;
for (let i = 0; i < array.length; i++) {
  sum += array[i];
}
const average = sum / array.length;
console.log('Массив:', array);
console.log('Среднее арифметическое:', average);

// Задание № 1
let count = 0;
while (count < 2) {
  console.log("Привет");
  count++;
}

// Задание № 2
for (let i = 1; i <= 5; i++) {
  console.log(i);
}

// Задание № 3
for (let i = 7; i <= 22; i++) {
  console.log(i);
}

// Задание № 4
const obj = {
  Коля: '200',
  Вася: '300',
  Петя: '400'
};

for (let key in obj) {
  console.log(`${key} — зарплата ${obj[key]} долларов`);
}

// Задание № 5

let n = 1000;
let num = 0;

while (n >= 50) {
  n /= 2;
  num++;
}

console.log('Результат:', n);
console.log('Количество итераций:', num);

// Задание № 6

let firstFriday = 5;
for (let day = 1; day <= 31; day + 7) {

  if ((day - firstFriday) % 7 === 0) {

    console.log(`Сегодня пятница, ${day}-е число. Необходимо подготовить отчет.`);
  }
}

// Доп. задание № 1
let k = 100;
let iterations = 0;

while (k >= 0) {
  k -= 7;
  iterations++;
}

console.log('Количество итераций:', iterations);
console.log('Результат:', k);

// Доп. задание № 2
const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

for (let i = 0; i < months.length; i++) {
  console.log(`Месяц: ${months[i]}, его порядковый номер: ${i + 1}`);
}

// Доп. задание № 3
const book = {
  название: "Война и мир",
  автор: "Лев Толстой",
  год_издания: 1869,
  жанр: "Роман-эпопея"
};

console.log(book);

// Доп. задание № 4
 не понимаю как сделать