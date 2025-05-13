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
  "Коля": '200',
  "Вася": '300',
  "Петя": '400'
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
for (let day = 1; day <= 31; day++) {

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