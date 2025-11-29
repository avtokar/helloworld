//loginView.js

export function renderLoginPage({ onLogin }, appRoot) {
  if (!appRoot) appRoot = document.getElementById("app");
  appRoot.innerHTML = `
    <div class="login-page">
      <h2>Авторизация</h2>
      <form id="login-form">
        <input id="login" type="text" placeholder="Логин" required />
        <input id="password" type="password" placeholder="Пароль" required />
        <button type="submit">Войти</button>
      </form>
      <div id="login-error" class="error" style="color:red; display:none;"></div>
    </div>
  `;
  const form = document.getElementById("login-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    try {
      const token = await loginApi(login, password);
      onLogin(login, password, token);
    } catch (err) {
      const errEl = document.getElementById("login-error");
      errEl.style.display = "block";
      errEl.textContent = "Неверные учетные данные";
    }
  });
}
