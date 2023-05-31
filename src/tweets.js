import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { React, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

const timestampToDate = function (timestamp) {
  const d = new Date(timestamp);
  return [
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
    "UTC",
    d.getUTCHours(),
  ].join("-");
};

export function Tweet({ tweet, deleteCallback, allowDelete }) {
  return (
    <Card>
      <Card.Body>
        <Card.Title style={{ color: "#00acee", fontWeight: "bold", fontSize: "1em" }}>
          {[tweet.user, "posted on", timestampToDate(tweet.created_at)].join(
            " "
          )}
        </Card.Title>
        <Card.Text>{tweet.text}</Card.Text>
        {allowDelete ? (
          <Button className="btn-warning" onClick={deleteCallback}>
            Delete
          </Button>
        ) : null}
      </Card.Body>
    </Card>
  );
}

function DisplayTweets({ user, tweets, reloadTweets, setReloadTweets }) {
  const deleteTweet = async (tweetId) => {
    await axios
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
              allowDelete={true}
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

  const handlePageClick = (e) => {
    if (e.target.textContent.includes("current")) {
      return;
    }
    const pageNumber = Number(e.target.textContent);
    setPageAndItemOffset(pageNumber);
  };

  let paginationItems = [];
  for (let page = 1; page <= pageCount; page++) {
    paginationItems.push(
      <Pagination.Item
        key={page}
        active={page === currentPage}
        onClick={handlePageClick}
      >
        {page}
      </Pagination.Item>
    );
  }

  function setPageAndItemOffset(page) {
    setCurrentPage(page);

    const newOffset = ((page - 1) * itemsPerPage) % tweets.length;
    setItemOffset(newOffset);
  }

  // resets when user changes or need to reload tweets
  function resetInternalStates() {
    setLoading(false);
    setItemOffset(0);
    setCurrentPage(1);
  }

  useEffect(() => {
    const fetchTweets = async () =>
      await axios
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
        <Container>
          <Row style={{ marginBottom: "1em" }}>
            <DisplayTweets
              tweets={currentTweets}
              user={user}
              reloadTweets={reloadTweets}
              setReloadTweets={setReloadTweets}
            />
          </Row>
          <Row className="justify-content-center">
            <Col className="col-auto">
              <Pagination>
                <Pagination.Prev
                  onClick={() => {
                    setPageAndItemOffset(Math.max(1, currentPage - 1));
                  }}
                />
                {paginationItems}
                <Pagination.Next
                  onClick={() => {
                    setPageAndItemOffset(Math.min(pageCount, currentPage + 1));
                  }}
                />
              </Pagination>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
  return <h2>User's tweets goes here</h2>;
}
