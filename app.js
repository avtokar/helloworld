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

  // ... существующая логика ...

  async renderLoginView() {
    this.appRoot.innerHTML = "";
    renderLogin(
      {
        onLogin: async (login, password) => {
          try {
            const token = await loginApi(login, password);
            this.token = token;
            this.isAuthenticated = true;
            localStorage.setItem("auth_token", token);

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
