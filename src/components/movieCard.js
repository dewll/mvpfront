import React, { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { Table, Container, Row, Col } from "react-bootstrap";
import { UserContext } from "../UserContext";
import ErrorMessage from "./errorMessage";
import SuccessMessage from "./successMessage";
import { Redirect } from "react-router-dom";

const MovieCard = (props) => {
  const [token] = useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      "http://localhost:8000/api/movie/" + id,
      requestOptions
    );
    console.log(response);
    if (!response.ok) {
      setErrorMessage("Something Went Wrong Try Again");
    } else {
      window.location.reload();
    }
  };

  //   if (token === "null") {
  //     return <Redirect to="/" />;
  //   }
  const loadVideo = (url) => {
    window.open(url);
  };
  return (
    <Card
      style={{
        marginTop: "30px",
        overflow: "hidden",
        width: "90rem",
        display: "flex",
        height: "12rem",
        h: "100 shadow",
        p: 0,
      }}
    >
      <Row
        className="no-gutters"
        style={{ paddingBottom: "5px", margin: "auto" }}
      >
        <Col md={5} lg={1}>
          <Card.Img
            style={{
              width: "7rem",
              height: "12rem",
            }}
            variant="top"
            src={props.image_link}
          />
        </Col>
        <Col>
          <Card.Body>
            <div style={{ martin: "auto", diplay: "flex" }}>
              <Card.Title>{props.title}</Card.Title>
              <Card.Text>{props.overview}</Card.Text>
            </div>
            <div style={{ float: "", martin: "auto", diplay: "flex" }}>
              <Button variant="success" onClick={() => handleDelete(props.id)}>
                remove
              </Button>
              <Button
                variant="success"
                onClick={() => loadVideo(props.video_link)}
              >
                play
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>

    // </div>
  );
};
export default MovieCard;
