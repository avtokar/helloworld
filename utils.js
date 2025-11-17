// utils.js

export function sanitizeText(text) {
  return text
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
