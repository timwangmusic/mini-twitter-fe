import axios from "axios";
import { useEffect, useState } from "react";
import { UserDropdown } from "./user";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import { RiHomeHeartLine } from "react-icons/ri";
import { Tweet } from "./tweets";

export function Timeline() {
  const [user, setUser] = useState({ name: "guest" });
  const [refreshFollowingList, setRefreshFollowingList] = useState(false);
  useEffect(() => {
    document.title = "Mini Twitter";
  }, []);

  return (
    <>
      <Nav>
        <Nav.Item>
          <Nav.Link href="/">
            <RiHomeHeartLine /> Home
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Container>
        <Row className="justify-content-center">
          <Col className="col-auto">
            <h1 style={{ color: "#00acee", marginBottom: "1em" }}>
              Mini Twitter
            </h1>
          </Col>
        </Row>
        <UserDropdown setUser={setUser} />
        <hr />
        <Row className="justify-content-center">
          <Col>
            <DisplayTimeline user={user} refresh={refreshFollowingList} />
          </Col>
          <Col>
            <h2>Following</h2>
            <FollowingList
              user={user}
              refresh={refreshFollowingList}
              setRefresh={setRefreshFollowingList}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

function FollowingListEntry({ fromUser, toUser, setRefresh, refresh }) {
  const unfollowUser = async () => {
    await axios
      .post(
        "/unfollows",
        JSON.stringify({
          from: fromUser.name,
          to: toUser.name,
        })
      )
      .then(setRefresh(!refresh))
      .catch(console.error);
  };

  return (
    <Card>
      <Card.Body>
        <Card.Text style={{ color: "#00acee", fontWeight: "bold" }}>
          {toUser.name}
        </Card.Text>
        <Button size="sm" variant="outline-warning" onClick={unfollowUser}>
          unfollow
        </Button>
      </Card.Body>
    </Card>
  );
}

// fetch and display the list of users the user is following
function FollowingList({ user, refresh, setRefresh }) {
  const [followingUsers, setFollowingUsers] = useState([]);
  useEffect(() => {
    const fetchFollowing = async () => {
      await axios
        .get("/following?user=" + user.name)
        .then((response) => {
          console.log(response.data);
          setFollowingUsers(response.data.following);
        })
        .catch(console.error);
    };
    fetchFollowing();
  }, [user, refresh]);

  return (
    <>
      {followingUsers.length > 0 ? (
        followingUsers.map((u, idx) => (
          <FollowingListEntry
            key={idx}
            fromUser={user}
            toUser={{ name: u }}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        ))
      ) : (
        <p>Not following anyone.</p>
      )}
    </>
  );
}

function DisplayTimeline({ user, refresh }) {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTimeline = async () => {
      await axios
        .get(`/timeline/${user.name}`)
        .then((response) => setTweets(response.data.result))
        .catch(console.error);
    };

    fetchTimeline();
  }, [user, refresh]);

  return (
    <>
      <h2>Timeline for {user.name}</h2>
      {tweets.map((tweet) => (
        <Tweet tweet={tweet} key={tweet.id} allowDelete={false} />
      ))}
    </>
  );
}
