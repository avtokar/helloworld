// render.js
import { sanitizeText } from "./utils.js";

export function createCommentHTML(comment) {
  const sanitizedText = sanitizeText(comment.text);
  return `
    <li class="comment" data-author="${comment.author.name}" data-text="${sanitizedText}">
      <div class="comment-header">
        <div>${comment.author.name}</div>
        <div>${new Date(comment.date).toLocaleString("ru-RU")}</div>
      </div>
      <div class="comment-body">
        <div class="comment-text">${sanitizedText}</div>
      </div>
      <div class="comment-footer">
        <div class="likes">
          <span class="likes-counter">${comment.likes}</span>
          <button class="like-button"></button>
        </div>
      </div>
    </li>
  `;
}

export function clearComments(container) {
  container.innerHTML = "";
}

export function renderComments(comments, container) {
  comments.forEach((comment) => {
    container.insertAdjacentHTML("beforeend", createCommentHTML(comment));
  });
}
