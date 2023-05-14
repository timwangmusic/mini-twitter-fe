import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from 'react-bootstrap/InputGroup';
import { useRef, useState } from "react";
import axios from "axios";
import { UserDropdown } from "./user";
import { TweetSentAlert } from "./alerts";

// The New Tweet Form component defines a form for posting new tweets
export function NewTweetForm({ user, setUser, reloadTweets, setReloadTweets }) {
  const [newTweetText, setNewTweetText] = useState("");
  const newTweetFormRef = useRef();
  const [status, setStatus] = useState("typing");
  const [showAlert, setShowAlert] = useState(false);
  const handlePost = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    const data = {
      user: user.name,
      text: newTweetText,
    };
    await axios
      .post("/tweets", JSON.stringify(data))
      .then(setReloadTweets(!reloadTweets))
      .then(setNewTweetText(""))
      .then(
        // clears input after posting
        () => newTweetFormRef.current.reset()
      )
      .then(setShowAlert(true))
      .then(setStatus("typing"))
      .catch((err) => console.error(err));
  };

  function handleTextareaChange(e) {
    setNewTweetText(e.target.value);
  }

  return (
    <div>
      <Form ref={newTweetFormRef}>
        <Container>
          <Form.Group>
            <Row className="justify-content-center">
              <Col className="col-auto">
                <UserDropdown setUser={setUser}></UserDropdown>
              </Col>
              <Col className="col-sm-1">
                <p style={{ color: "#00acee", fontSize: "1.3em" }}>
                  <b>{user.name}</b>
                </p>
              </Col>
              <Col className="col-md-6">
                <InputGroup>
                  <Form.Control
                    data-testid="tweet-text-input"
                    onChange={handleTextareaChange}
                    placeholder="new tweet"
                    id="tweet-text-input"
                  ></Form.Control>
                  <Button
                    variant="outline-primary"
                    data-testid='tweet-post-btn'
                    type="submit"
                    onClick={handlePost}
                    disabled={
                      newTweetText.length === 0 || status === "submitting"
                    }
                  >
                    Post
                  </Button>
                </InputGroup>
              </Col>
            </Row>
            <TweetSentAlert showAlert={showAlert} setShowAlert={setShowAlert} />
          </Form.Group>
        </Container>
      </Form>
    </div>
  );
}
