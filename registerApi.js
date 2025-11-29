// registerApi.js
export async function registerApi(login, name, password) {
  const resp = await fetch("https://wedev-api.sky.pro/api/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ login, name, password }),
  });
  if (!resp.ok) throw resp;
  const data = await resp.json();
  return data?.user?.token ?? data?.token ?? null;
}
