import React, { useEffect, useContext, useState } from "react";
import { Container } from "react-bootstrap";
import "./cart.css";
import { UserContext } from "../UserContext";
import { CartContext } from "../CartContext";
import MovieCard from "./movieCard";
import { useHistory } from "react-router-dom";

const Cart = () => {
  const [token] = useContext(UserContext);
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
      } else {
        const data = await response.json();
        let information = data[0];
        console.log(information);
        setCarts({ data: [...data] });
      }
    };
    getCart();
  }, [token]);
  console.log(carts);

  return (
    <Container fluid>
      <section className="py-4 container">
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
