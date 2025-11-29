// loginView.js
export function renderLoginView({ onLogin }, appRoot) {
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
      <p>Нет аккаунта? <a href="#/register" id="to-register">Зарегистрироваться</a></p>
    </div>
  `;

  const form = document.getElementById("login-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const login = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    try {
      const token = await onLogin(login, password);
      // успех: возвращается токен
      return token;
    } catch (err) {
      const errEl = document.getElementById("login-error");
      errEl.style.display = "block";
      errEl.textContent = "Неверные учетные данные";
    }
  });

  const toRegister = document.getElementById("to-register");
  if (toRegister)
    toRegister.addEventListener("click", (e) => {
      e.preventDefault();
      location.hash = "#/register";
    });
}
