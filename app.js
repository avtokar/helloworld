// app.js
import { fetchComments, postComment } from "./commentsApi.js";
import {
  createMessage,
  clearMessages,
  setLoadingMessage,
  setAddingMessage,
} from "./messages.js";
import { createCommentHTML, clearComments, renderComments } from "./render.js";
import { handleLikeClick } from "./likes.js";
import { setupFormHandlers, setupQuoteHandler } from "./form.js";

export class CommentsApp {
  constructor() {
    this.commentsData = [];
    this.commentsContainer = document.querySelector(".comments");
    this.commentForm = document.querySelector("#comment-form");
    this.usernameInput = document.querySelector("#username-input");
    this.commentInput = document.querySelector("#comment-input");
    this.savedUsername = "";
    this.savedComment = "";
  }

  async init() {
    await this.loadComments();
    this.setupEventListeners();
  }

  async loadComments() {
    clearMessages();
    let msg = createMessage(this.commentsContainer, "Загрузка комментариев...");
    setLoadingMessage(msg);
    this.commentsContainer.insertAdjacentElement("beforebegin", msg);

    try {
      const data = await fetchComments();
      clearComments(this.commentsContainer);
      this.commentsData.length = 0;
      this.commentsData.push(...data.comments);
      renderComments(this.commentsData, this.commentsContainer);
    } catch (error) {
      alert("Не удалось загрузить комментарии");
    } finally {
      clearMessages();
    }
  }
  async submitComment(author, text) {
    // Сохраняем ссылки на элементы формы
    const submitButton = this.commentForm.querySelector(
      'button[type="submit"]'
    );
    const inputs = this.commentForm.querySelectorAll("input, textarea");

    // Сохраняем исходные состояния
    const originalButtonText = submitButton.textContent;
    const originalOpacity = this.commentForm.style.opacity;

    // Визуально показываем загрузку НЕ меняя структуру
    submitButton.textContent = "Комментарий добавляется...";
    submitButton.disabled = true;
    this.commentForm.style.opacity = "0.7";

    // Добавляем спиннер или индикатор в кнопку
    submitButton.classList.add("loading");

    // Блокируем все поля ввода
    inputs.forEach((input) => {
      input.disabled = true;
    });

    try {
      await postComment(author, text);
      const newComment = {
        author: { name: author },
        date: new Date().toISOString(),
        text,
        likes: 0,
      };
      this.commentsData.push(newComment);
      this.commentsContainer.insertAdjacentHTML(
        "beforeend",
        createCommentHTML(newComment)
      );

      // Очищаем форму после успешной отправки
      this.usernameInput.value = "";
      this.commentInput.value = "";
      this.savedUsername = "";
      this.savedComment = "";
    } catch (error) {
      alert("Ошибка отправки комментария: " + error.message);
    } finally {
      // Восстанавливаем форму в исходное состояние
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
      submitButton.classList.remove("loading");
      this.commentForm.style.opacity = originalOpacity;

      // Разблокируем поля ввода
      inputs.forEach((input) => {
        input.disabled = false;
      });

      // Убедимся, что значения восстановлены
      this.usernameInput.value = this.savedUsername;
      this.commentInput.value = this.savedComment;
    }
  }

  setupEventListeners() {
    // Обработчик формы
    setupFormHandlers(
      this.commentForm,
      this.usernameInput,
      this.commentInput,
      this.submitComment.bind(this),
      (username, comment) => {
        this.savedUsername = username;
        this.savedComment = comment;
      }
    );

    // Обработчик цитирования
    setupQuoteHandler(this.commentsContainer, this.commentInput);

    // Обработчик лайков
    this.commentsContainer.addEventListener("click", handleLikeClick);
  }
}
