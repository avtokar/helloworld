import { initComments } from "./comments.js";

document.addEventListener("DOMContentLoaded", function () {
  const commentsContainer = document.querySelector(".comments");
  const commentForm = document.querySelector("#comment-form");
  const usernameInput = document.querySelector("#username-input");
  const commentInput = document.querySelector("#comment-input");

  initComments(commentsContainer, commentForm, usernameInput, commentInput);
});
