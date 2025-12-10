// AddComment.jsx
import { useState, useEffect } from "react";
import { postComment } from "../api/comments";
import { getCurrentUser } from "../api/auth";

export default function AddComment({ personalKey, onCommentAdded }) {
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setName(user?.name || "");
      })
      .catch(() => {
        // при ошибке можно оставить имя пустым
      });
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (text.trim().length < 3) {
      setError("Текст должен содержать хотя бы 3 символа");
      return;
    }
    try {
      await postComment(text, personalKey);
      setText("");
      setError(null);
      onCommentAdded && onCommentAdded();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Имя</label>
        <input value={name} readOnly />
      </div>
      <div>
        <label>Комментарий</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Добавить комментарий</button>
    </form>
  );
}
