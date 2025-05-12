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