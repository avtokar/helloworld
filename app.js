// app.js
import { fetchComments, postComment } from "./commentsApi.js";
import { createCommentHTML, renderComments, clearComments } from "./render.js";
import { fetchCurrentUserName } from "./utils.js";
import { renderLoginPage } from "./loginView.js";
import { loginApi } from "./loginApi.js";

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
    this.username = "";
  }

  async init() {
    // попытка загрузить токен из локального хранилища
    this.token = localStorage.getItem("auth_token");
    this.isAuthenticated = !!this.token;

    // старт маршрутизации
    window.addEventListener("hashchange", () => this.route());

    await this.route();
  }

  async route() {
    const path = location.hash.replace("#", "") || "/";
    if (path === "/login") {
      await this.renderLoginView();
      return;
    }
    // по умолчанию показываем комментарии (без токена)
    await this.showComments();
  }

  async showComments() {
    // рендерим страницу комментариев
    this.appRoot.innerHTML = `
      <div class="comments-section">
        <ul id="comments" class="comments"></ul>
        <form id="comment-form" class="add-form">
          <input id="username-input" type="text" class="add-form-name" readonly value="${this.username}">
          <textarea id="comment-input" class="add-form-text" placeholder="Введите ваш комментарий" rows="4"></textarea>
          <div class="add-form-row">
            <button type="submit" id="submit" class="add-form-button">Написать</button>
          </div>
        </form>
      </div>
      <div><a href="#/login" id="login-link">Авторизоваться</a></div>
    `;

    this.commentsContainer = document.getElementById("comments");
    this.commentForm = document.getElementById("comment-form");
    this.usernameInput = document.getElementById("username-input");
    this.commentInput = document.getElementById("comment-input");

    // обработчик отправки
    this.commentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const text = this.commentInput.value.trim();
      if (!text) return;
      if (!this.token) {
        alert("Пожалуйста, авторизуйтесь");
        location.hash = "#/login";
        return;
      }
      try {
        await postComment(this.token, text);
        const newComment = {
          author: { name: this.username || "Автор" },
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

    // загрузка комментариев
    try {
      const data = await fetchComments(this.token);
      this.commentsData = data.comments ?? [];
      renderComments(this.commentsData, this.commentsContainer);
    } catch (e) {
      // если без токена — можно показать пустой список
      this.commentsContainer.innerHTML = "";
    }
  }

  async renderLoginView() {
    this.appRoot.innerHTML = "";
    renderLoginPage(
      {
        onLogin: async (login, password) => {
          try {
            const token = await loginApi(login, password);
            // сохранить токен
            this.token = token;
            this.isAuthenticated = true;
            localStorage.setItem("auth_token", token);

            // подстановка имени после авторизации
            const userName = await fetchCurrentUserName(token);
            this.username = userName;
            // перейти на страницу комментариев
            location.hash = "/";
          } catch (err) {
            alert("Ошибка авторизации");
          }
        },
      },
      this.appRoot
    );
  }
}
