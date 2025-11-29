// main.js
import { CommentsApp } from "./app.js";

document.addEventListener("DOMContentLoaded", async () => {
  const app = new CommentsApp();
  await app.init();
});
