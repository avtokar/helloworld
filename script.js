document.addEventListener('DOMContentLoaded', function () {
    const commentsData = [
        {
            author: 'Глеб Фокин',
            date: '12.02.22 12:18',
            text: 'Это будет первый комментарий на этой странице',
            likes: 3
        },
        {
            author: 'Варвара Н.',
            date: '13.02.22 19:22',
            text: 'Мне нравится как оформлена эта страница! ❤',
            likes: 75
        }
    ];
    function sanitizeText(text) {
        // Замена опасных символов
        return text
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll('\'', '&#39;');
    }

    function createCommentHTML(comment) {
        const sanitizedText = sanitizeText(comment.text);
        return `
                    <li class="comment" data-author="${comment.author}" data-text="${sanitizedText}">
                        <div class="comment-header">
                            <div>${comment.author}</div>
                            <div>${comment.date}</div>
                        </div>
                        <div class="comment-body">
                            <div class="comment-text" data-author="${comment.author}">
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

    const commentsContainer = document.querySelector('.comments');
    const commentForm = document.querySelector('#comment-form');
    const usernameInput = document.querySelector('#username-input');
    const commentInput = document.querySelector('#comment-input');
    commentsData.forEach(comment => {
        const commentHTML = createCommentHTML(comment);
        commentsContainer.insertAdjacentHTML('beforeend', commentHTML);
    });
    commentForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Предотвращаем стандартную отправку формы

        // Получаем значения из полей ввода
        const author = usernameInput.value.trim();
        const text = commentInput.value.trim();
        const date = new Date().toLocaleDateString('ru-RU', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Создаём новый объект комментария
        const newComment = {
            author: author,
            date: date,
            text: text,
            likes: 0
        };
       
        // Добавляем новый комментарий в массив
        commentsData.push(newComment);

        // Генерируем HTML для нового комментария и добавляем его в контейнер
        const newCommentHTML = createCommentHTML(newComment);
        commentsContainer.insertAdjacentHTML('beforeend', newCommentHTML);

        // Очищаем поля ввода
        document.querySelector('#username-input').value = '';
        document.querySelector('#comment-input').value = '';
    });


    // Добавляем обработчик клика на комментарии
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
                // Убираем лайк
                likeButton.classList.remove('-active-like');
                likeCountElement.textContent = currentCount - 1;
            } else {
                // Ставим лайк
                likeButton.classList.add('-active-like');
                likeCountElement.textContent = currentCount + 1;
            }
        }
    });

});