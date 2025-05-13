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

//задание 4
function greetByAge() {
    const age = prompt('Сколько вам лет?');

    if (isNaN(age) || age < 0) {
        alert('Вы ввели неправильное значение');
    }
    else if (age >= 0 && age <= 12) {
        alert('Привет, друг!');
    }
    else {
        alert('Добро пожаловать!');
    }
}

//задание 5 
function multiplyNumbers(num1, num2) {
    if (isNaN(parseFloat(num1)) || isNaN(parseFloat(num2))) {
        return 'Одно или оба значения не являются числом';
    }
    else {
        return num1 * num2;
    }
}

//задание 6 
function cubeNumber() {
  const input = prompt('Введите число');
  const number = parseFloat(input);

  if (isNaN(number)) {
    return 'Переданный параметр не является числом';
  } 
  else {
    const cube = number ** 3;
    return `Число ${number} в кубе равняется ${cube}`;
  }
}

//задание 7
const circle1 = {
  radius: 0,
  getArea: function() {
    return Math.PI * this.radius ** 2;
  },
  getPerimeter: function() {
    return 2 * Math.PI * this.radius;
  }
};

const circle2 = {
  radius: 0,
  getArea: function() {
    return Math.PI * this.radius ** 2;
  },
  getPerimeter: function() {
    return 2 * Math.PI * this.radius;
  }
};