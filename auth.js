// auth.js
export function getToken() {
  return localStorage.getItem("authToken");
}
export function setToken(token) {
  localStorage.setItem("authToken", token);
}
export function clearToken() {
  localStorage.removeItem("authToken");
}

export async function login(loginVal, password) {
  const url = `https://wedev-api.sky.pro/api/user/login`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login: loginVal, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "Ошибка авторизации");
  }
  const token = data?.user?.token;
  if (!token) throw new Error("Token not received");
  setToken(token);
  return data.user;
}
export async function getCurrentUser() {
  // Это пример; путь зависит от вашего API,
  // можно использовать тот же /api/user или другой эндпоинт
  const url = `https://wedev-api.sky.pro/api/user`;
  const token = getToken();
  const res = await fetch(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
  if (!res.ok) throw new Error("Не удалось получить данные пользователя");
  const data = await res.json();
  return data.user;
}
