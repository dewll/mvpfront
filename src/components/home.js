import React, { useEffect, useContext, useState } from "react";
import { MoviesContext } from "../MoviesContext";
import ItemCard from "./itemCard";
import { Container } from "react-bootstrap";
import ErrorMessage from "./errorMessage";

const Home = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useContext(MoviesContext);

  useEffect(() => {
    fetch("https://mvpback.herokuapp.com/api/home")
      .then((resp) => {
        console.log(resp);
        if (!resp.ok) {
          setErrorMessage("Something went wrong");
        }
        return resp.json();
      })
      .then((results) => {
        console.log(results);
        setMovies({ data: [...results] });
      });
  }, []);
  console.log(movies.data);
  return (
    <Container fluid>
      <section className="py-4 container">
        <ErrorMessage message={errorMessage} />
        <div className="row justify-content-center">
          {movies.data.map((movie, index) => (
            <ItemCard
              id={movie.id}
              title={movie.title}
              overview={movie.overview}
              image_link={movie.image_link}
              video_link={movie.video_link}
              key={index}
              movie={movie}
            />
          ))}
        </div>
      </section>
    </Container>
  );
};

export default Home;
