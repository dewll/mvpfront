import React, { useEffect, useContext, useState } from "react";
import { Table, Container, Row, Col } from "react-bootstrap";
import "./cart.css";
import Card from "react-bootstrap/Card";
import { UserContext } from "../UserContext";
import ErrorMessage from "./errorMessage";
import SuccessMessage from "./successMessage";
import { Redirect } from "react-router-dom";
import { CartContext } from "../CartContext";
import MovieCard from "./movieCard";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const [token] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [carts, setCarts] = useContext(CartContext);

  let history = useHistory();
  useEffect(() => {
    const getCart = async () => {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      };
      const response = await fetch(
        "http://localhost:8000/api/movie",
        requestOptions
      );
      if (!response.ok) {
        history.push("/");
        // setErrorMessage("Session time out please re-login or Cart is empty");
      } else {
        const data = await response.json();
        let information = data[0];
        console.log(information);
        //setCarts([...information]);
        setCarts({ data: [...data] });
      }
    };
    getCart();
  }, [token]);
  console.log(carts);

  return (
    <Container fluid>
      <section className="py-4 container">
        <ErrorMessage message={errorMessage} />
        <div className="row justify-content-center">
          {carts.data.map((cart, index) => (
            <MovieCard
              id={cart.id}
              title={cart.title}
              overview={cart.overview}
              image_link={cart.image_link}
              video_link={cart.video_link}
              key={index}
              cart={cart}
            />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Cart;
