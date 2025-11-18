// likes.js

import { delay } from "./utils.js";

export function handleLikeClick(event) {
  const target = event.target.closest(".like-button");
  if (target) {
    const likeButton = target;
    const likeCountElement =
      likeButton.parentNode.querySelector(".likes-counter");
    const currentCount = parseInt(likeCountElement.textContent, 10);
    likeButton.classList.add("-loading-like");
    delay(1000).then(() => {
      likeButton.classList.remove("-loading-like");
      if (likeButton.classList.contains("-active-like")) {
        likeCountElement.textContent = currentCount - 1;
        likeButton.classList.remove("-active-like");
      } else {
        likeCountElement.textContent = currentCount + 1;
        likeButton.classList.add("-active-like");
      }
    });
  }
}
