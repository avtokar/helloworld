// form.js
export function setupFormHandlers(
  form,
  usernameInput,
  commentInput,
  onSubmit,
  onInput
) {
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const author = usernameInput.value.trim();
    const text = commentInput.value.trim();

    onInput(author, text);

    if (!navigator.onLine) {
      alert("Нет подключения к интернету");
      return;
    }

    if (author.length < 3 || text.length < 3) {
      alert("Имя и текст минимум 3 символа");
      return;
    }

    onSubmit(author, text).then(() => {
      usernameInput.value = "";
      commentInput.value = "";
      onInput("", "");
    });
  });

  usernameInput.addEventListener("input", function () {
    onInput(usernameInput.value.trim(), commentInput.value.trim());
  });

  commentInput.addEventListener("input", function () {
    onInput(usernameInput.value.trim(), commentInput.value.trim());
  });
}

export function setupQuoteHandler(commentsContainer, commentInput) {
  commentsContainer.addEventListener("click", function (event) {
    if (event.target.closest(".like-button")) {
      return;
    }

    const target = event.target.closest(".comment");
    if (target) {
      const author = target.dataset.author;
      const text = target.dataset.text;
      commentInput.value = `<${text} (автор: ${author})>`;
    }
  });
}
