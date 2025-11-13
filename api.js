const apiUrl = "https://wedev-api.sky.pro/api/v1/igor-syrovatko/comments";

export async function fetchComments() {
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.statusText}`);
  }
  const data = await response.json();
  return data.comments;
}

export async function postComment(author, text) {
  const response = await fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify({ text, name: author }),
  });
  if (!response.ok) {
    throw new Error(`Ошибка: ${response.statusText}`);
  }
  return {
    author: { name: author },
    date: new Date().toISOString(),
    text,
    likes: 0,
  };
}
