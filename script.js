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