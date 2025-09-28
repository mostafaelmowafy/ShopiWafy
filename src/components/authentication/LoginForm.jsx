import { useState } from "react";
import Button from "../../ui/Button";
import { useLogin } from "./useLogin";
import Spinner from "../../ui/Spinner";
import FormRowVertical from "../../ui/FormRowVertical";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import "../../styles/style.css";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [email, setEmail] = useState("sidigi9630@ncien.com");
  const [password, setPassword] = useState("123456789");
  const { login, isLoading } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  if (isLoading) return <Spinner />;
  return (
    <form onSubmit={handleSubmit} className={Form.regular}>
      <FormRowVertical label="Email address">
        <input
          className={Input}
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <input
          className={Input}
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical>
        <div className=" text-center">
          <button
            size="large"
            disabled={isLoading}
            className={`${Button.big} ${Button.primary}`}
          >
            {isLoading ? <Spinner size="mini" /> : "Login"}
          </button>
          <button
            size="large"
            className={`${Button.big} ${Button.none}`}
            onClick={() => navigate("/signup")}
          >
            SignUp&rarr;
          </button>
        </div>
      </FormRowVertical>
    </form>
  );
}

export default LoginForm;
