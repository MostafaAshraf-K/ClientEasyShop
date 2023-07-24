import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Button, Form } from "react-bootstrap";
import { login } from "../../Redux/apiCalls.js";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const dispatch = useDispatch();
  const usernameInputRef = useRef(null);
  const navigate = useNavigate(); // Add useNavigate hook

  const handleClick = (e) => {
    e.preventDefault();
    setIsButtonClicked(true);

    login(dispatch, { username, password });
    navigate("/");
  };

  const handleFocusUsername = () => {
    usernameInputRef.current.focus();
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <Form className="register-form">
          <div className="register-have-acc">
            <Link to="/register">
              <h1>Dont Have an account?</h1>
            </Link>
          </div>
          <div className="register-form-input">
            <h1>Login</h1>
            <Form.Control
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={usernameInputRef}
            />
            <Form.Control
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              className="register-btn"
              onClick={handleClick}
              disabled={isButtonClicked}
            >
              {isButtonClicked ? "Logging in..." : "LOGIN"}
            </Button>

            <Link to="#">DO NOT YOU REMEMBER THE PASSWORD?</Link>
            <Link to="#" onClick={handleFocusUsername}>
              FOCUS USERNAME FIELD
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
