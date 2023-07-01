import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../contexts/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const navigate = useNavigate();
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const x = useAuth();
  console.log(x);

  const { login, isAuthenticated } = useAuth();

  useEffect(
    function () {
      if (isAuthenticated === true) navigate("/app", { replace: true }); // we did replace true bcz if we are logged in then we we cannot go back bcz it will take us to login page so immediately we will be directed to /app so with replace we replace login page in history so we can move to home page directly
    },
    [isAuthenticated, navigate]
  );

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
  }

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
