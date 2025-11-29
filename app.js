//app.js

import { fetchComments, postComment } from "./commentsApi.js";
import { createCommentHTML, renderComments, clearComments } from "./render.js";
import { loginApi } from "./loginApi.js";
import { renderLoginPage } from "./loginView.js";

export class CommentsApp {
  constructor() {
    this.appRoot = document.getElementById("app");
    this.commentsData = [];
    this.commentsContainer = null;
    this.commentForm = null;
    this.usernameInput = null;
    this.commentInput = null;

    this.token = null;
    this.isAuthenticated = false;
  }

  async init() {
    // попытка загрузить токен из локального хранилища
    this.token = localStorage.getItem("auth_token");
    this.isAuthenticated = !!this.token;

    // Рендр по состоянию
    if (this.isAuthenticated) {
      await this.renderCommentsView();
      await this.loadComments();
    } else {
      this.renderLoginView();
    }
  }

  async loadComments() {
    clearComments(this.commentsContainer);
    try {
      const data = await fetchComments(this.token);
      this.commentsData = data.comments || [];
      renderComments(this.commentsData, this.commentsContainer);
    } catch (e) {
      alert("Не удалось загрузить комментарии");
    }
  }

  async onLoginSuccess(token) {
    this.token = token;
    this.isAuthenticated = true;
    localStorage.setItem("auth_token", token);
    await this.renderCommentsView();
    await this.loadComments();
  }

  renderCommentsView() {
    // Очистим app и вставим базовую разметку для списка и формы
    this.appRoot.innerHTML = `
      <div class="comments-section">
        <ul id="comments" class="comments"></ul>
        <form id="comment-form" class="add-form">
          <input id="username-input" type="text" class="add-form-name" readonly value="" />
          <textarea id="comment-input" class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
          <div class="add-form-row">
            <button type="submit" id="submit" class="add-form-button">Написать</button>
          </div>
        </form>
      </div>
      <div><a href="#" id="logout-link">Выйти</a></div>
    `;

    this.commentsContainer = document.getElementById("comments");
    this.commentForm = document.getElementById("comment-form");
    this.usernameInput = document.getElementById("username-input");
    this.commentInput = document.getElementById("comment-input");

    // имя должно приходить с сервера после авторизации; пока пустое
    this.usernameInput.value = ""; // будет заполняться при авторизации

    // обработка формы
    this.commentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const author = this.usernameInput.value.trim();
      const text = this.commentInput.value.trim();
      if (!author || !text) {
        alert("Заполните имя и текст");
        return;
      }
      // авторизация нужна для добавления
      if (!this.token) {
        alert("Пожалуйста, авторизуйтесь");
        return;
      }
      try {
        await postComment(this.token, text);
        // обновить список
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
        this.commentInput.value = "";
      } catch (err) {
        alert("Ошибка отправки комментария: " + (err?.message ?? err));
      }
    });

    // логика выхода
    const logoutLink = document.getElementById("logout-link");
    if (logoutLink) {
      logoutLink.addEventListener("click", (ev) => {
        ev.preventDefault();
        localStorage.removeItem("auth_token");
        this.token = null;
        this.isAuthenticated = false;
        this.renderLoginView();
      });
    }
  }

  async renderLoginView() {
    // чистим
    this.appRoot.innerHTML = "";
    // показать страницу логина через отдельный компонент
    renderLoginPage(
      {
        onLogin: async (login, password) => {
          try {
            const token = await loginApi(login, password);
            // сохранить имя пользователя в поле readonly после авторизации
            // и переключиться на страницу комментариев
            await this.onLoginSuccess(token);
          } catch (err) {
            alert("Ошибка авторизации");
          }
        },
      },
      this.appRoot
    );
  }
}
