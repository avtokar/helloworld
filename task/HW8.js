//Задание № 1
const people = [
  { name: 'Глеб', age: 29 },
  { name: 'Анна', age: 17 },
  { name: 'Олег', age: 7 },
  { name: 'Оксана', age: 47 }
];

console.log(people.sort((a, b) => a.age - b.age));

//Задание № 2

//Задание № 3
function printCurrentDate() {
  const intervalId = setInterval(() => {
    console.log(new Date());
  }, 3000); 

  setTimeout(() => {
    clearInterval(intervalId);
    console.log('30 секунд прошло');
  }, 30000); 
}

printCurrentDate();

//Задание № 4
function delayForSecond(callback) {
  setTimeout(callback, 1000); 
}

delayForSecond(function () {
  console.log('Привет, Глеб!');
});