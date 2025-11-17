// commentsApi.js

const apiUrl = "https://wedev-api.sky.pro/api/v1/igor-syrovatko/comments";

export async function fetchComments() {
  const response = await fetch(apiUrl);
  if (!response.ok) throw response;
  return await response.json();
}

export async function postComment(author, text) {
  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ text, name: author }),
  });
  if (!response.ok) throw response;
  return await response.json();
}
