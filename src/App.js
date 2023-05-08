import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { React, useState } from "react";
import { NewTweetForm } from "./newTweetForm";
import Nav from "react-bootstrap/Nav";
import { Tweets } from "./tweets";

function App() {
  const [user, setUser] = useState({ name: "guest" });
  const [reloadTweets, setReloadTweets] = useState(false);

  return (
    <>
      <div className="App">
        <Nav>
          <Nav.Item>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/timeline">Timeline</Nav.Link>
          </Nav.Item>
        </Nav>
        <h1 style={{ color: "#00acee" }}>Mini Twitter</h1>
        <NewTweetForm
          user={user}
          setUser={setUser}
          reloadTweets={reloadTweets}
          setReloadTweets={setReloadTweets}
        />
        <br></br>
        <br></br>

        <Container>
          <Tweets
            user={user}
            reloadTweets={reloadTweets}
            setReloadTweets={setReloadTweets}
          />
        </Container>
      </div>
    </>
  );
}

export default App;
