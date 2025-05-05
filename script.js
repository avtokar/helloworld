//Задание № 1
let password = 'Пароль!';
let userInput = prompt('Введите пароль');

if (userInput === password) {
  alert('Пароль введен верно');
} else {
  alert('Пароль введен неправильно');
}

//Задание № 2
let c = 2;

if (c > 0 && c < 10) {
  console.log('Верно');
} else {
  console.log('Неверно');
}

//Задание № 3
let d = 150;
let e = 50;

if (d > 100 || e > 100) {
  console.log('Верно');
} else {
  console.log('Неверно');
}

//Задание № 4
let a = '2';
let b = '3';

alert(+a + +b);

//Задание № 5
let monthNumber = 12;

switch (monthNumber) {
  case 1:
  case 2:
  case 12:
    console.log('Зима');
    break;
  case 3:
  case 4:
  case 5:
    console.log('Весна');
    break;
  case 6:
  case 7:
  case 8:
    console.log('Лето');
    break;
  case 9:
  case 10:
  case 11:
    console.log('Осень');
    break;
  default:
    if (monthNumber > 13) {
      console.log('Ошибка');
    }
}

//Доп задание 1
let input = Namber(prompt('Пожалуйста, введите любое число'));

if (isNaN(number)) {
  alert('Введённое значение не является числом');
} else {
  if (number % 2 === 0) {
    alert('Число чётное');
  } else {
    alert('Число нечётное');
  }
}

//доп задание 2
let clientOS = 0; 

if (clientOS === 0) {
  console.log('Установите версию приложения для iOS по ссылке');
} else if (clientOS === 1) {
  console.log('Установите версию приложения для Android по ссылке');
}

//Доп задание 3
let clientOS = 0; 
let DeviceYear = 2015; 

if (clientOS === 0) {
  if (DeviceYear < 2015) {
    console.log('Установите облегчённую версию приложения для iOS по ссылке');
  } else {
    console.log('Установите версию приложения для iOS по ссылке');
  }
} else if (clientOS === 1) {
  if (DeviceYear < 2015) {
    console.log('Установите облегчённую версию приложения для Android по ссылке');
  } else {
    console.log('Установите версию приложения для Android по ссылке');
  }
}