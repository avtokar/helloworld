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

