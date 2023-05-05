import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { React, useEffect, useState } from "react";
import axios from "axios";

function Tweet({ tweet, deleteCallback }) {
  return (
    <Card>
      <Card.Body>
        <Card.Header style={{ color: "blue" }}>{tweet.created_at}</Card.Header>
        <Card.Text>{tweet.text}</Card.Text>
        <Button className="btn-warning" onClick={deleteCallback}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
}

// The Tweets component displays tweets for a user
export function Tweets({ user, reloadTweets, setReloadTweets }) {
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  const deleteTweet = async (tweetId) => {
    axios
      .delete(`/tweets/${tweetId}?user=${user.name}`)
      .then((response) => {
        console.log(response);
        setReloadTweets(!reloadTweets);
      })
      .catch(console.error);
  };

  useEffect(() => {
    const fetchTweets = async () =>
      axios
        .get(`/tweets/${user.name}`)
        .then((response) => {
          setTweets(response.data.tweets);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });

    fetchTweets();
  }, [reloadTweets, user]);

  if (loading) {
    return <h2>Loading tweets</h2>;
  }
  if (tweets) {
    return (
      <Container>
        <h2>Tweets from {user.name}</h2>
        <Row className="justify-content-center">
          <Col className="col-auto">
            {tweets.map((tweet) => (
              <Tweet
                tweet={tweet}
                deleteCallback={() => deleteTweet(tweet.id)}
                key={tweet.id}
              />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
  return <h2>User's tweets goes here</h2>;
}
