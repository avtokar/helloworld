// registerView.js
export function renderRegisterView({ onRegister }, appRoot) {
  if (!appRoot) appRoot = document.getElementById("app");
  appRoot.innerHTML = `
    <div class="register-page">
      <h2>Регистрация</h2>
      <form id="register-form">
        <input id="reg-login" type="text" placeholder="Логин" required />
        <input id="reg-name" type="text" placeholder="Имя" required />
        <input id="reg-password" type="password" placeholder="Пароль" required />
        <button type="submit">Зарегистрироваться</button>
      </form>
      <div id="register-error" class="error" style="color:red; display:none;"></div>
      <p>Уже есть аккаунт? <a href="#/login" id="to-login">Войти</a></p>
    </div>
  `;

  const form = document.getElementById("register-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const login = document.getElementById("reg-login").value;
    const name = document.getElementById("reg-name").value;
    const password = document.getElementById("reg-password").value;

    try {
      const token = await onRegister(login, name, password);
      if (token) {
        location.hash = "/"; // переход к главной/пользовательскому сценарию
      }
    } catch (err) {
      const errEl = document.getElementById("register-error");
      errEl.style.display = "block";
      errEl.textContent = "Ошибка регистрации: " + (err?.message ?? err);
    }
  });

  const toLogin = document.getElementById("to-login");
  if (toLogin)
    toLogin.addEventListener("click", (e) => {
      e.preventDefault();
      location.hash = "#/login";
    });
}
