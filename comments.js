// comments.js
import { getToken } from "./auth";
export async function fetchComments(personalKey) {
  const url = `https://wedev-api.sky.pro/api/v2/${personalKey}/comments`;
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(
      err?.error || `Failed to fetch comments (status ${res.status})`
    );
  }
  const data = await res.json();
  return data.comments;
}
export async function postComment(text, personalKey) {
  const token = getToken();
  const url = `https://wedev-api.sky.pro/api/v2/${personalKey}/comments`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ text }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "Ошибка при добавлении комментария");
  }
  return data;
}
