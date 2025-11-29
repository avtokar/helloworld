//loginApi.js

export async function loginApi(login, password) {
  const resp = await fetch("https://wedev-api.sky.pro/api/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, password }),
  });
  if (!resp.ok) throw resp;
  const data = await resp.json();
  // в примере ответ может содержать token в data.user.token или data.token
  const token = data?.user?.token || data?.token;
  if (!token) throw new Error("Токен не получен");
  return token;
}
