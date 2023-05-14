import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import { React, useState } from "react";
import { NewTweetForm } from "./newTweetForm";
import Nav from "react-bootstrap/Nav";
import { Tweets } from "./tweets";
import { MdOutlineViewTimeline } from "react-icons/md";
import { BsPersonPlus } from "react-icons/bs";

function App() {
  const [user, setUser] = useState({ name: "guest" });
  const [reloadTweets, setReloadTweets] = useState(false);

  return (
    <>
      <div className="App">
        <Nav>
          <Nav.Item>
            <Nav.Link href="/signup">
              <BsPersonPlus /> Signup
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/timeline">
              <MdOutlineViewTimeline /> Timeline
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <h1 style={{ color: "#00acee", marginBottom: "1em"}}>Mini Twitter</h1>
        <NewTweetForm
          user={user}
          setUser={setUser}
          reloadTweets={reloadTweets}
          setReloadTweets={setReloadTweets}
          key={user.name}
        />
        <hr />

        <Container>
          <Tweets
            user={user}
            reloadTweets={reloadTweets}
            setReloadTweets={setReloadTweets}
            itemsPerPage={5}
          />
        </Container>
      </div>
    </>
  );
}

export default App;
