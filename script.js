document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://wedev-api.sky.pro/api/v1/igor-syrovatko/comments';
    const commentsData = [];
    const commentsContainer = document.querySelector('.comments');
    const commentForm = document.querySelector('#comment-form');
    const usernameInput = document.querySelector('#username-input');
    const commentInput = document.querySelector('#comment-input');

    let loadingMessage = null;
    let addingCommentMessage = null;
    let savedUsername = '';
    let savedComment = '';

    function createMessage(container, text) {
        const message = document.createElement('div');
        message.textContent = text;
        container.appendChild(message);
        return message;
    }

    function clearMessages() {
        if (loadingMessage) loadingMessage.remove();
        if (addingCommentMessage) addingCommentMessage.remove();
        loadingMessage = null;
        addingCommentMessage = null;
    }

    function clearComments() {
        commentsContainer.innerHTML = '';
    }

    function sanitizeText(text) {
        return text.replaceAll('<', '&lt;').replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;').replaceAll('\'', '&#39;');
    }

    function createCommentHTML(comment) {
        const sanitizedText = sanitizeText(comment.text);
        return `
            <li class="comment" data-author="${comment.author.name}" data-text="${sanitizedText}">
                <div class="comment-header">
                    <div>${comment.author.name}</div>
                    <div>${new Date(comment.date).toLocaleString('ru-RU')}</div>
                </div>
                <div class="comment-body">
                    <div class="comment-text">${sanitizedText}</div>
                </div>
                <div class="comment-footer">
                    <div class="likes">
                        <span class="likes-counter">${comment.likes}</span>
                        <button class="like-button"></button>
                    </div>
                </div>
            </li>
        `;
    }

    async function fetchComments() {
        clearMessages();
       loadingMessage = createMessage(commentsContainer, 'Загрузка комментариев...');
       commentsContainer.insertAdjacentElement('beforebegin', loadingMessage);
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                if (response.status === 500) {
                    alert('Ошибка сервера. Пожалуйста, попробуйте позже.');
                }
                throw new Error(`Ошибка: ${response.statusText}`);
            }

            const data = await response.json();
            clearComments();
            commentsData.length = 0;
            data.comments.forEach(comment => {
                commentsData.push(comment);
                commentsContainer.insertAdjacentHTML('beforeend', createCommentHTML(comment));
            });
        } catch (error) {
            alert("Не удалось загрузить комментарии: " + error.message);
        } finally {
            clearMessages();
        }
    }

    async function postComment(author, text) {
        addingCommentMessage = createMessage(commentForm.parentNode, 'Комментарий добавляется...');
        commentForm.style.display = 'none';
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify({ text, name: author })
            });

            if (!response.ok) {
                if (response.status === 400) {
                    alert('Ошибка в отправленных данных. Проверьте и попробуйте еще раз.');
                } else if (response.status === 500) {
                    alert('Ошибка сервера. Пожалуйста, попробуйте позже.');
                }
                throw new Error(`Ошибка: ${response.statusText}`);
            }

            const newComment = { author: { name: author }, date: new Date().toISOString(), text, likes: 0 };
            commentsData.push(newComment);
            commentsContainer.insertAdjacentHTML('beforeend', createCommentHTML(newComment));
        } catch (error) {
            if (!navigator.onLine) {
                alert('Проблемы с интернет-соединением. Попробуйте позже.');
            } else {
                alert(error.message); // Больше деталей о вводе
            }
        } finally {
            commentForm.style.display = 'block';
            clearMessages();
            usernameInput.value = savedUsername;
            commentInput.value = savedComment;
        }
    }

    fetchComments();

    commentForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const author = usernameInput.value.trim();
        const text = commentInput.value.trim();

        // Сохраняем введенные данные в переменные
        savedUsername = author;
        savedComment = text;

        if (!navigator.onLine) {
            alert('Вы потеряли подключение к интернету. Пожалуйста, восстановите его и попробуйте снова.');
            return;
        }

        if (author.length < 3 || text.length < 3) {
            alert('Имя и текст комментария должны содержать минимум 3 символа.');
            return;
        }

        postComment(author, text).then(() => {
            usernameInput.value = '';
            commentInput.value = '';
            savedUsername = '';
            savedComment = '';
        });
    });

    // Используем событие input для отслеживания изменений в полях ввода
    usernameInput.addEventListener('input', function () {
        savedUsername = usernameInput.value.trim();
    });

    commentInput.addEventListener('input', function () {
        savedComment = commentInput.value.trim();
    });

    // Обработчик клика на комментарии
    commentsContainer.addEventListener('click', function (event) {
    const target = event.target.closest('.comment');
    if (target) {
        const author = target.dataset.author;
        const text = target.dataset.text;
        commentInput.value = `<${text} (автор: ${author})>`; 
    }
});
    function delay(ms) {
          return new Promise(resolve => setTimeout(resolve, ms));
    }
    commentsContainer.addEventListener('click', async function (event) {
        const target = event.target.closest('.like-button'); // Используем closest для автономности кнопки лайка
        if (target) {
        const likeButton = target;
        const likeCountElement = likeButton.parentNode.querySelector('.likes-counter');
        const currentCount = parseInt(likeCountElement.textContent, 10);
        likeButton.classList.add('-loading-like');
        await delay(1000);
        likeButton.classList.remove('-loading-like');

            if (likeButton.classList.contains('-active-like')) {
            likeCountElement.textContent = currentCount - 1; // Убираем лайк
            likeButton.classList.remove('-active-like'); // Удаляем активное состояние
            } else {
            likeCountElement.textContent = currentCount + 1; // Добавляем лайк
            likeButton.classList.add('-active-like'); // Добавляем активное состояние
            }
        }
    });
});