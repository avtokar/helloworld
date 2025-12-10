//CommentsList.jsx
import { useEffect, useState } from "react";
import { fetchComments } from "../api/comments";

export default function CommentsList({ personalKey }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments(personalKey)
      .then((data) => {
        setComments(data);
      })
      .catch((e) => {
        console.error(e);
        setComments([]);
      })
      .finally(() => setLoading(false));
  }, [personalKey]);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div>
      <ul>
        {comments.map((c) => (
          <li key={c.id}>
            <strong>{c.author?.name}</strong>: {c.text}
          </li>
        ))}
      </ul>
      <a href="/login">Чтобы добавить комментарий, авторизуйтесь</a>
    </div>
  );
}
