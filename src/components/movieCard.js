import React, { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { UserContext } from "../UserContext";

const MovieCard = (props) => {
  const [token] = useContext(UserContext);
  const handleDelete = async (id) => {
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      "https://mvpback.herokuapp.com/api/movie/" + id,
      requestOptions
    );
    console.log(response);
    if (!response.ok) {
      console.log("Something Went Wrong Try Again");
    } else {
      window.location.reload();
    }
  };
  const loadVideo = (url) => {
    window.open(url);
  };
  return (
    <div>
      <Card>
        <Row className="no-gutters">
          <Col md={5} lg={1}>
            <Card.Img
              style={{
                width: "7rem",
                height: "9rem",
              }}
              //   variant="top"
              src={props.image_link}
            />
          </Col>
          <Col>
            <Card.Body>
              <div>
                <Card.Title>{props.title}</Card.Title>
                <Card.Text>{props.overview}</Card.Text>
              </div>
            </Card.Body>
          </Col>
        </Row>
        <div>
          <Button variant="success" onClick={() => handleDelete(props.id)}>
            remove
          </Button>
          <Button variant="success" onClick={() => loadVideo(props.video_link)}>
            play
          </Button>
        </div>
      </Card>
      <br></br>
    </div>
  );
};
export default MovieCard;
