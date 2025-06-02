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


//Игра "Перерни текст"

function startReverseText() {
  alert("Добро пожаловать в игру 'Переверни текст'!");
  alert("Введите текст, и я переверну его.");

  function reverseTextGame() {
    const inputText = prompt("Введите ваш текст:");
    if (inputText) {
      const reversedText = inputText.split('').reverse().join('');
      alert(`Перевернутый текст: ${reversedText}`);
    } else {
      alert("Вы не ввели текст. Попробуйте еще раз.");
      reverseTextGame();
    }

    const playAgain = confirm("Хотите сыграть еще раз?");
    if (playAgain) {
      reverseTextGame();
    } else {
      alert("Спасибо за игру! До новых встреч.");
    }
  }

  reverseTextGame();
}

//Игра "Викторина"
const quiz = [
  {
    question: "Какой цвет небо?",
    options: ["1. Красный", "2. Синий", "3. Зеленый"],
    correctAnswer: 2 // номер правильного ответа
  },
  {
    question: "Сколько дней в неделе?",
    options: ["1. Шесть", "2. Семь", "3. Восемь"],
    correctAnswer: 2
  },
  {
    question: "Сколько у человека пальцев на одной руке?",
    options: ["1. Четыре", "2. Пять", "3. Шесть"],
    correctAnswer: 2
  }
];

function startQuizGame() {
  let score = 0;

  function askQuestion(questionIndex) {
    if (questionIndex < quiz.length) {
      const question = quiz[questionIndex];
      const userAnswer = prompt(`${question.question}\n${question.options.join("\n")}`);
      if (parseInt(userAnswer) === question.correctAnswer) {
        score++;
        alert("Правильно!");
      } else {
        alert("Неправильно.");
      }
      askQuestion(questionIndex + 1);
    } else {
      alert(`Викторина завершена! Вы набрали ${score} баллов из ${quiz.length}.`);
      const playAgain = confirm("Хотите сыграть ещё раз?");
      if (playAgain) {
        startQuizGame();
      } else {
        alert("Спасибо за игру! До новых встреч.");
      }
    }
  }

  askQuestion(0);
}