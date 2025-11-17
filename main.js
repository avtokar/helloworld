// main.js

import { fetchComments, postComment } from "./commentsApi.js";
import {
  createMessage,
  clearMessages,
  setLoadingMessage,
  setAddingMessage,
} from "./messages.js";
import { createCommentHTML, clearComments } from "./render.js";
import { handleLikeClick } from "./likes.js";

document.addEventListener("DOMContentLoaded", async function () {
  const commentsData = [];
  const commentsContainer = document.querySelector(".comments");
  const commentForm = document.querySelector("#comment-form");
  const usernameInput = document.querySelector("#username-input");
  const commentInput = document.querySelector("#comment-input");
  let savedUsername = "";
  let savedComment = "";

  async function loadComments() {
    clearMessages();
    let msg = createMessage(commentsContainer, "Загрузка комментариев...");
    setLoadingMessage(msg);
    commentsContainer.insertAdjacentElement("beforebegin", msg);

    try {
      const data = await fetchComments();
      clearComments(commentsContainer);
      commentsData.length = 0;
      data.comments.forEach((comment) => {
        commentsData.push(comment);
        commentsContainer.insertAdjacentHTML(
          "beforeend",
          createCommentHTML(comment)
        );
      });
    } catch (error) {
      alert("Не удалось загрузить комментарии");
    } finally {
      clearMessages();
    }
  }

  async function submitComment(author, text) {
    let msg = createMessage(
      commentForm.parentNode,
      "Комментарий добавляется..."
    );
    setAddingMessage(msg);
    commentForm.style.display = "none";
    try {
      await postComment(author, text);
      const newComment = {
        author: { name: author },
        date: new Date().toISOString(),
        text,
        likes: 0,
      };
      commentsData.push(newComment);
      commentsContainer.insertAdjacentHTML(
        "beforeend",
        createCommentHTML(newComment)
      );
    } catch (error) {
      alert("Ошибка отправки комментария");
    } finally {
      commentForm.style.display = "block";
      clearMessages();
      usernameInput.value = savedUsername;
      commentInput.value = savedComment;
    }
  }

  await loadComments();

  commentForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const author = usernameInput.value.trim();
    const text = commentInput.value.trim();
    savedUsername = author;
    savedComment = text;
    if (!navigator.onLine) {
      alert("Нет подключения к интернету");
      return;
    }
    if (author.length < 3 || text.length < 3) {
      alert("Имя и текст минимум 3 символа");
      return;
    }
    submitComment(author, text).then(() => {
      usernameInput.value = "";
      commentInput.value = "";
      savedUsername = "";
      savedComment = "";
    });
  });

  usernameInput.addEventListener("input", function () {
    savedUsername = usernameInput.value.trim();
  });
  commentInput.addEventListener("input", function () {
    savedComment = commentInput.value.trim();
  });

  commentsContainer.addEventListener("click", function (event) {
    if (event.target.closest(".like-button")) {
      return;
    }

    const target = event.target.closest(".comment");
    if (target) {
      const author = target.dataset.author;
      const text = target.dataset.text;
      commentInput.value = `<${text} (автор: ${author})>`;
    }
  });

  commentsContainer.addEventListener("click", handleLikeClick);
});
