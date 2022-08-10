import React, { useState, useEffect, useContext } from "react";
import ErrorMessage from "./errorMessage";
import { UserContext } from "../UserContext";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();

  const [errorMessage, setErrorMessage] = useState("");
  const [, setToken] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cleanFormData = () => {
    setUsername("");
    setPassword("");
  };
  const submitLoginForm = async () => {
    console.log("yes");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    };
    const response = await fetch(
      `https://mvpback.herokuapp.com/api/signin`,
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      setErrorMessage(data.message);
    } else {
      setErrorMessage("you have Successfully Login");
      cleanFormData();
      console.log(data.access);
      setToken(data.access);
      history.push("/Home");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    submitLoginForm();
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={12} style={{ marginTop: "50px" }}>
          <form onSubmit={handleSubmit}>
            <h1 style={{ textAlign: "center" }}>Login</h1>
            <hr />

            <label for="username">
              <b>Username</b>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              name="username"
              id="username"
              required
            />

            <label for="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              name="password"
              id="psw"
              required
            />

            <hr />

            <ErrorMessage message={errorMessage} />
            {/* <p>By creating an account you agree to our <a href="#">Terms & Privacy</a>.</p> */}

            <Row>
              <Col></Col>
              <Col xs={2}>
                <button type="submit" class="registerbtn">
                  Login
                </button>
              </Col>
              <Col></Col>
            </Row>
            <div class="container signin">
              <p>
                Yet to have an account? <a href="Register">Register</a>.
              </p>
            </div>
          </form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
export default Login;
