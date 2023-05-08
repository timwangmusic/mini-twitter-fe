import axios from "axios";
import { useEffect, useState } from "react";
import { UserDropdown } from "./user";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export function Timeline() {
  const [user, setUser] = useState({ name: "guest" });
  const [refreshFollowingList, setRefreshFollowingList] = useState(false);
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-auto">
            <h1 style={{ color: "#00acee" }}>Mini Twitter</h1>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="col-auto">
            <h2>Following</h2>
            <UserDropdown setUser={setUser} />
            <h4>Current User: {user.name}</h4>
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
        <Card.Text>{toUser.name}</Card.Text>
        <Button size="sm" variant="warning" onClick={unfollowUser}>
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
      axios
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
      {followingUsers.map((u, idx) => (
        <FollowingListEntry
          key={idx}
          fromUser={user}
          toUser={{ name: u }}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      ))}
    </>
  );
}
