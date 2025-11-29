// commentsApi.js

const apiUrl = "https://wedev-api.sky.pro/api/v2/igor-syrovatko";

export async function fetchComments(token) {
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const resp = await fetch(`${API_BASE}comments`, { headers });
  if (!resp.ok) throw resp;
  return await resp.json();
}

export async function postComment(token, text) {
  if (!token) throw new Error("Нет токена");
  const resp = await fetch(`${API_BASE}comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  if (!resp.ok) throw resp;
  return await resp.json();
}
