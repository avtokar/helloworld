export function createMessage(container, text) {
  const message = document.createElement("div");
  message.textContent = text;
  container.appendChild(message);
  return message;
}

export function clearMessages() {
  const messages = document.querySelectorAll(".message");
  messages.forEach((message) => message.remove());
}

export function sanitizeText(text) {
  return text
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
