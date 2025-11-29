// app.js
import { renderComments } from "./render.js";
import { fetchComments, postComment } from "./commentsApi.js";
import { loginApi } from "./loginApi.js";
import { registerApi } from "./registerApi.js";
import { renderRegisterView } from "./registerView.js";
import { fetchCurrentUserName } from "./utils.js";
import { renderLoginView as renderLogin } from "./loginView.js";

export class CommentsApp {
  constructor() {
    this.appRoot = document.getElementById("app");
    this.commentsContainer = null;
    this.commentForm = null;
    this.usernameInput = null;
    this.commentInput = null;

    this.token = null;
    this.isAuthenticated = false;
    this.username = "";
    async renderRegisterView() {
  renderRegisterView(
    {
      onRegister: async (login, name, password) => {
        const token = await registerApi(login, name, password);
        if (!token) throw new Error("Регистрация не вернулась токеном");
        localStorage.setItem("auth_token", token);
        this.token = token;
        this.isAuthenticated = true;
        // подстановка имени после регистрации
        this.username = await fetchCurrentUserName(token);
        location.hash = "/";
        return token;
      },
    },
    this.appRoot
  );
}
  }

  async init() {
    this.token = localStorage.getItem("auth_token");
    this.isAuthenticated = !!this.token;

    // простой маршрутизатор
    window.addEventListener("hashchange", () => this.route());
    await this.route();
  }

  async route() {
    const path = location.hash.replace("#", "") || "/";
    if (path === "/login") {
      await this.renderLoginView();
    } else if (path === "/register") {
      await this.renderRegisterView();
    } else {
      await this.showComments();
    }
  }

  async showComments() {
    // рендерим страницу комментариев (как в вашем проекте)
    // Примерная вставка разметки:
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
    `;
    this.commentsContainer = document.getElementById("comments");
    this.commentForm = document.getElementById("comment-form");
    this.usernameInput = document.getElementById("username-input");
    this.commentInput = document.getElementById("comment-input");

    this.commentForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const text = this.commentInput.value.trim();
      if (!text) return;
      if (!this.token) {
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
        // append
        this.commentsContainer.insertAdjacentHTML(
          "beforeend",
          `<li class="comment"><div>${text}</div></li>`
        );
        this.commentInput.value = "";
      } catch (err) {
        alert("Ошибка отправки: " + (err?.message ?? err));
      }
    });

    try {
      const data = await fetchComments(this.token);
      // отображение списка
    } catch {
      // без токена — пустой список
    }
  }

  async renderLoginView() {
    this.appRoot.innerHTML = "";
    renderLoginView(
      {
        onLogin: async (login, password) => {
          try {
            const token = await loginApi(login, password);
            this.token = token;
            this.isAuthenticated = true;
            localStorage.setItem("auth_token", token);

            // подстановка имени после авторизации
            const userName = await fetchCurrentUserName(token);
            this.username = userName;

            location.hash = "/";
          } catch (err) {
            alert("Ошибка авторизации: " + (err?.message ?? err));
          }
        },
      },
      this.appRoot
    );
  }

  async renderRegisterView() {
    renderRegisterView(
      {
        onRegister: async (login, name, password) => {
          const token = await registerApi(login, name, password);
          if (!token) throw new Error("Регистрация не вернулась токеном");
          localStorage.setItem("auth_token", token);
          this.token = token;
          this.isAuthenticated = true;
          // подстановка имени после регистрации
          this.username = await fetchCurrentUserName(token);
          location.hash = "/";
          return token;
        },
      },
      this.appRoot
    );
  }
}
