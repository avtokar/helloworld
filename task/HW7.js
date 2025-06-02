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
console.log(ceilNumber); // Выводит: 33

const roundNumber = Math.round(number);
console.log(roundNumber); 


//Задача № 4
const numbers = [52, 53, 49, 77, 21, 32];

const minValue = Math.min(...numbers);
console.log(minValue); 

const maxValue = Math.max(...numbers);
console.log(maxValue); 

