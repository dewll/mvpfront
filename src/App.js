import React, { useState, useContext } from "react";
import "./App.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, Badge } from "react-bootstrap";
import Main from "./components/main";
import { MoviesProvider } from "./MoviesContext";
import { CartProvider } from "./CartContext";
//import { UserCartProvider } from "./UserCartContext";
//import { UserContext } from "./UserContext";
import { Redirect } from "react-router-dom";

function App() {
  //const [token, setToken] = useContext(UserContext);
  // const [movies, setMovies] = useState({ data: [] });

  const logout = () => {
    localStorage.setItem("passToken", "null");
    return <Redirect to="/" />;
  };
  return (
    <MoviesProvider>
      <CartProvider>
        <Navbar bg="primary" variant="dark" expand="lg">
          <Container>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="Home" style={{ color: "white" }}>
                  Home
                </Nav.Link>
                <Nav.Link href="Movie" style={{ color: "white" }}>
                  Cart
                </Nav.Link>
                <Nav.Link href="Register" style={{ color: "white" }}>
                  Register
                </Nav.Link>
                <Nav.Link href="/" style={{ color: "white" }}>
                  Login
                </Nav.Link>
              </Nav>
              <Nav className="mr-auto">
                <Nav.Link href="/" onClick={logout} style={{ color: "white" }}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Main />
      </CartProvider>
    </MoviesProvider>
  );
}

export default App;
