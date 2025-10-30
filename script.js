document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://wedev-api.sky.pro/api/v1/igor-syrovatko/comments';
    const commentsData = [];
    const commentsContainer = document.querySelector('.comments');
    const commentForm = document.querySelector('#comment-form');
    const usernameInput = document.querySelector('#username-input');
    const commentInput = document.querySelector('#comment-input');

    // Функция для очистки предыдущих комментариев
    function clearComments() {
        commentsContainer.innerHTML = '';
    }

    function sanitizeText(text) {
        return text
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll('\'', '&#39;');
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
                    <div class="comment-text" data-author="${comment.author.name}">
                    ${sanitizedText}
                    </div>
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
// Получение комментариев из API
    function fetchComments() {
        return fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error`(Ошибка при получении комментариев: ${response.status} ${response.statusText});`
                }
                return response.json();
            })
            .then(data => {
                clearComments(); // Очищаем предыдущие комментарии
                commentsData.length = 0; // Очищаем текущий массив
                data.comments.forEach(comment => {
                    commentsData.push(comment); // Добавляем комментарии в массив
                    const commentHTML = createCommentHTML(comment);
                    commentsContainer.insertAdjacentHTML('beforeend', commentHTML);
                });
            })
        .catch (error => {
            console.error(error);
            alert("Не удалось загрузить комментарии: " + error.message); // Уведомление об ошибке
        });
    }
 // Добавление нового комментария в API
    function postComment(author, text) {
        return fetch(apiUrl, {
            method: 'POST',
            body: JSON.stringify({ text: text, name: author })
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.error);
                });
            }
            const newComment = {
                author: { name: author },
                date: new Date().toISOString(),
                text: text,
                likes: 0 // Начальное количество лайков
            };
            commentsData.push(newComment); // обновляем локальный массив комментариев
            return fetchComments(); // Обновление списка комментариев
        })
        .catch(error => {
            alert(error.message); // Уведомление об ошибке
        });
    }

    // Получаем комментарии при загрузке страницы
    fetchComments();

    commentForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const author = usernameInput.value.trim();
        const text = commentInput.value.trim();

        if (author.length < 3 || text.length < 3) {
            alert('Имя и текст комментария должны содержать минимум 3 символа.');
            return;
        }

        // Отправляем новый комментарий на сервер
       postComment(author, text).then(() => {
            // Очищаем поля ввода
            usernameInput.value = '';
            commentInput.value = '';
        });
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

    commentsContainer.addEventListener('click', function (event) {
        const target = event.target;
        if (target.classList.contains('like-button')) {
            const likeButton = target;
            const likeCountElement = likeButton.parentNode.querySelector('.likes-counter');
            const currentCount = parseInt(likeCountElement.textContent, 10);

            if (likeButton.classList.contains('-active-like')) {
                likeButton.classList.remove('-active-like');
                likeCountElement.textContent = currentCount - 1;
            } else {
                likeButton.classList.add('-active-like');
                likeCountElement.textContent = currentCount + 1;
            }
        }
    });
});