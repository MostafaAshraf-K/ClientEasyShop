import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register, login } from "../../Redux/apiCalls";
import { useRef } from "react";
import "./Register.css"; // Import the CSS file for styling
import Swal from "sweetalert2";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const usernameInputRef = useRef(null);
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    let timerInterval;
    Swal.fire({
      title: "Auto close alert!",
      html: "I will close in <b></b> milliseconds.",
      timer: 1000,
      timerProgressBar: true,
      allowOutsideClick: false, // Prevent clicking outside the alert
      didOpen: () => {
        Swal.showLoading();
        const b = Swal.getHtmlContainer().querySelector("b");
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft();
        }, 100);
      },
      willClose: () => {
        clearInterval(timerInterval);
      },
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.timer) {
        // The alert was closed by the timer
        // Perform your desired action here
        console.log("I was closed by the timer");
        // Continue with your login or navigation logic
        register(dispatch, { username, password, email })
          .then(() => login(dispatch, { username, password }))
          .then(() => navigate("/"))
          .catch((error) => {
            // Handle any errors that occurred during registration or login
            console.log(error);
          });
      }
    });
  };

  const handleFocusUsername = () => {
    usernameInputRef.current.focus();
  };

  return (
    <div className="register-page">
      <div className="register-form-container">
        <Form className="register-form">
          <div className="register-have-acc">
            <Link to="/login">
              <h1>Already Have an account?</h1>
            </Link>
          </div>
          <div className="register-form-input">
            <h1>Create an account</h1>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={usernameInputRef}
            />
            <Form.Control
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="register-btn" onClick={handleClick}>
              REGISTER
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

export default Register;
