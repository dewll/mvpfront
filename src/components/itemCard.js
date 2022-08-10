import React, { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { UserContext } from "../UserContext";
import ErrorMessage from "./errorMessage";
import SuccessMessage from "./successMessage";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const ItemCard = (props) => {
  const [token] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  let history = useHistory();

  const addMovies = async (title, overview, image_link, video_link) => {
    if (token === null) {
      history.push("/");
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        title,
        overview,
        image_link,
        video_link,
      }),
    };
    const response = await fetch(
      "https://mvpback.herokuapp.com/api/movie",
      requestOptions
    );
    const data = await response.json();
    console.log(data);
    if (!response.ok) {
      setErrorMessage("Something Went Wrong");
    } else {
      setSuccessMessage("Item successfully Added To Cart");
    }
  };
  const loadVideo = (url) => {
    window.open(url);
  };
  return (
    <div style={{ margin: "5px", padding: "10px" }}>
      <Card
        style={{
          margin: "auto",
          marginTop: "5px",
          //padding: "10px",
          width: "14rem",
          p: 0,
          overflow: "hidden",
          h: "100 shadow",
        }}
      >
        <Card.Img
          style={{ height: "20rem" }}
          variant="top"
          src={props.image_link}
        />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Button
            // style={{width:}}
            variant="success"
            onClick={() =>
              addMovies(
                props.title,
                props.overview,
                props.image_link,
                props.video_link
              )
            }
          >
            watch later
          </Button>
          <Button
            style={{}}
            variant="success"
            onClick={() => loadVideo(props.video_link)}
          >
            play
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};
export default ItemCard;
