// messages.js

let loadingMessage = null;
let addingCommentMessage = null;

export function createMessage(container, text) {
  const message = document.createElement("div");
  message.textContent = text;
  container.appendChild(message);
  return message;
}

export function clearMessages() {
  if (loadingMessage) loadingMessage.remove();
  if (addingCommentMessage) addingCommentMessage.remove();
  loadingMessage = null;
  addingCommentMessage = null;
}

export function setLoadingMessage(msg) {
  loadingMessage = msg;
}
export function setAddingMessage(msg) {
  addingCommentMessage = msg;
}
