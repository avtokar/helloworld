import { fetchComments, postComment } from "./api.js";
import { createMessage, clearMessages, sanitizeText } from "./utils.js";
import { handleLikeButtonClick } from "./likes.js";

export function initComments(
  commentsContainer,
  commentForm,
  usernameInput,
  commentInput
) {
  fetchComments()
    .then((comments) => {
      comments.forEach((comment) => {
        commentsContainer.insertAdjacentHTML(
          "beforeend",
          createCommentHTML(comment)
        ); // Здесь добавляем комментарии
      });
    })
    .catch((error) =>
      alert("Не удалось загрузить комментарии: " + error.message)
    );

  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const author = usernameInput.value.trim();
    const text = commentInput.value.trim();

    if (author.length < 3 || text.length < 3) {
      alert("Имя и текст комментария должны содержать минимум 3 символа.");
      return;
    }

    addingComment(
      author,
      text,
      commentsContainer,
      commentForm,
      usernameInput,
      commentInput
    );
  });

  commentsContainer.addEventListener("click", function (event) {
    const target = event.target.closest(".comment");
    if (target) {
      handleCommentClick(target, commentInput);
    }

    if (event.target.closest(".like-button")) {
      handleLikeButtonClick(event);
    }
  });
}

async function addingComment(
  author,
  text,
  commentsContainer,
  commentForm,
  usernameInput,
  commentInput
) {
  const addingCommentMessage = createMessage(
    commentForm.parentNode,
    "Комментарий добавляется..."
  );
  commentForm.style.display = "none";

  try {
    const newComment = await postComment(author, text);
    commentsContainer.insertAdjacentHTML(
      "beforeend",
      createCommentHTML(newComment)
    ); // Добавление нового комментария
  } catch (error) {
    alert(error.message);
  } finally {
    commentForm.style.display = "block";
    clearMessages();
    usernameInput.value = "";
    commentInput.value = "";
  }
}

function createCommentHTML(comment) {
  const sanitizedText = sanitizeText(comment.text);
  return `
        <li class="comment" data-author="${comment.author.name}" data-text="${sanitizedText}">
            <div class="comment-header">
                <div>${comment.author.name}</div>
                <div>${new Date(comment.date).toLocaleString("ru-RU")}</div>
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

function handleCommentClick(target, commentInput) {
  const author = target.dataset.author;
  const text = target.dataset.text;
  commentInput.value = `<${text} (автор: ${author})>`;
}
