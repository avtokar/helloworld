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
console.log(result); // Вывод: 1 3 5 10 20

//Задание № 4
const array = [];

for (let i = 0; i < 3; i++) {
  const row = [];
  for (let j = 0; j < 3; j++) {
    row.push(1);
  }
  array.push(row);
}

console.log(array); // Вывод: [[1, 1, 1], [1, 1, 1], [1, 1, 1]]