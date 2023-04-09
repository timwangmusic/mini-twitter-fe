import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { React, useEffect, useState } from 'react';
import axios from 'axios';
import { Tweet, NewTweet } from './tweet';

// The Tweets component displays tweets for a user
function Tweets({ user, reloadTweets, setReloadTweets }) {
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  const deleteTweet = async (tweetId) => {
    axios.delete(`/tweets/${tweetId}?user=${user.name}`)
      .then(
        (response) => {
          console.log(response);
          setReloadTweets(!reloadTweets);
        }
      ).catch(
        console.error
      );
  }

  useEffect(() => {
    const fetchTweets = async () => axios.get(
      `/tweets/${user.name}`
    ).then(
      (response) => {
        setTweets(response.data.tweets)
        setLoading(false);
      }
    ).catch(
      err => console.log(err)
    );

    fetchTweets();
  }, [reloadTweets, user])

  if (loading) {
    return <h2>Loading tweets</h2>
  }
  if (tweets) {
    return (
      <Container>
        <h2>Tweets from {user.name}</h2>
        <Row className='justify-content-center'>
          <Col className='col-auto'>
            {tweets.map(tweet => <Tweet tweet={tweet} deleteCallback={() => deleteTweet(tweet.id)} key={tweet.id} />)}
          </Col>

        </Row>
      </Container>
    )
  }
  return (<h2>User's tweets goes here</h2>)
}

function App() {
  const [user, setUser] = useState({ name: 'tim' })
  const [reloadTweets, setReloadTweets] = useState(false);
  return (
    <>
      <div className='App'>
        <h1>Mini Twitter</h1>
        <NewTweet user={user} setUser={setUser} reloadTweets={reloadTweets} setReloadTweets={setReloadTweets} />
        <br></br>
        <br></br>

        <Container>
          <Tweets user={user} reloadTweets={reloadTweets} setReloadTweets={setReloadTweets} />
        </Container>
      </div>
    </>
  );
}

export default App;
