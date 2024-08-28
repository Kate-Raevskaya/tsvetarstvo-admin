import { useState } from "react"

export const Login = () => {
  let [email, setEmail] = useState<string>("")
  let [password, setPassword] = useState<string>("")

  function handleSubmitForm(e: React.FormEvent) {
    e.preventDefault()
  }

  return (
    <div className="login-page-container">
      <div className="auth-form">
        <form onSubmit={handleSubmitForm}>
          <label>
            <p>Логин</p>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            <p>Пароль</p>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="auth-button" type="submit">
            Войти
          </button>
          <p className="auth-error"></p>
        </form>
      </div>
    </div>
  )
}
