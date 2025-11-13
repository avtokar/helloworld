export function handleLikeButtonClick(event) {
  const likeButton = event.target.closest(".like-button");
  const likeCountElement =
    likeButton.parentNode.querySelector(".likes-counter");

  // Добавление класса для анимации
  likeButton.classList.add("-loading-like");

  // Задержка для имитации загрузки
  setTimeout(() => {
    const currentCount = parseInt(likeCountElement.textContent, 10);

    // Переключение состояния лайка
    if (likeButton.classList.contains("-active-like")) {
      likeButton.classList.remove("-active-like");
      likeCountElement.textContent = currentCount - 1;
    } else {
      likeButton.classList.add("-active-like");
      likeCountElement.textContent = currentCount + 1;
    }

    // Удаляем класс анимации после завершения
    likeButton.classList.remove("-loading-like");
  }, 1000); // Пауза в 1 секунду
}
