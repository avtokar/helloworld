//Login.jsx
import { useState } from "react";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [loginVal, setLoginVal] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(loginVal, password);
      navigate("/comments");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Логин</label>
        <input value={loginVal} onChange={(e) => setLoginVal(e.target.value)} />
      </div>
      <div>
        <label>Пароль</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="error">{error}</div>}
      <button type="submit">Войти</button>
    </form>
  );
}
