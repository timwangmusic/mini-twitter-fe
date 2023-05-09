import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { React, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

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

function DisplayTweets({ user, tweets, reloadTweets, setReloadTweets }) {
  const deleteTweet = async (tweetId) => {
    axios
      .delete(`/tweets/${tweetId}?user=${user.name}`)
      .then((response) => {
        console.log(response);
        setReloadTweets(!reloadTweets);
      })
      .catch(console.error);
  };
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

// The Tweets component fetches and displays tweets for a user
export function Tweets({ user, reloadTweets, setReloadTweets, itemsPerPage }) {
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(tweets.length / itemsPerPage);
  const endOffset = itemOffset + itemsPerPage;
  console.log(
    `Loading items from ${itemOffset + 1} to ${endOffset} for user ${user.name}`
  );
  const currentTweets = tweets.slice(itemOffset, endOffset);

  const handleBootstrapPageClick = (e) => {
    const pageNumber = Number(e.target.textContent);
    const newOffset = ((pageNumber - 1) * itemsPerPage) % tweets.length;
    setItemOffset(newOffset);
    setCurrentPage(pageNumber);
  };

  let paginationItems = [];
  for (let page = 1; page <= pageCount; page++) {
    paginationItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={handleBootstrapPageClick}
      >
        {page}
      </Pagination.Item>
    );
  }

  // resets when user changes or need to reload tweets
  function resetInternalStates() {
    setLoading(false);
    setItemOffset(0);
    setCurrentPage(1);
  }

  useEffect(() => {
    const fetchTweets = async () =>
      axios
        .get(`/tweets/${user.name}`)
        .then((response) => {
          setTweets(response.data.tweets);
          resetInternalStates();
        })
        .catch((err) => {
          console.log(err);
          resetInternalStates();
        });

    fetchTweets();
  }, [reloadTweets, user]);

  if (loading) {
    return <h2>Loading tweets</h2>;
  }
  if (tweets) {
    return (
      <>
        <DisplayTweets
          tweets={currentTweets}
          user={user}
          reloadTweets={reloadTweets}
          setReloadTweets={setReloadTweets}
        />

        <Pagination>{paginationItems}</Pagination>
      </>
    );
  }
  return <h2>User's tweets goes here</h2>;
}
