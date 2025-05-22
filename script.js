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