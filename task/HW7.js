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