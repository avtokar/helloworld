import { CommentsApp } from "./app.js";

document.addEventListener("DOMContentLoaded", async function () {
  const app = new CommentsApp();
  await app.init();
});
