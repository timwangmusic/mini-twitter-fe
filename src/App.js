import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { React, useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Tweet } from './tweet';


function NewTweet() {
  const tweetContent = useRef();
  const username = useRef();
  const submit = async () => {
    const data = {
      user: username.current.value,
      text: tweetContent.current.value,
    };
    axios.post(
      '/tweets',
      JSON.stringify(data),
    ).then(
      console.log
    ).catch(
      err => console.error(err)
    );
  }

  return (
    <div>
      <Form>
        <Container>
          <Form.Group>
            <Row className='justify-content-center'>
            <Col className='col-auto'>
                <Form.Control ref={username} placeholder='username'>
                </Form.Control>
              </Col>
              <Col className='col-md-6'>
                <Form.Control ref={tweetContent} placeholder='new tweet'>
                </Form.Control>
              </Col>
              <Col className='col-auto'><Button type='submit' onClick={submit}>Post</Button>
              </Col>
            </Row>

          </Form.Group>
        </Container>
      </Form>
    </div>
  );
}

// Displays tweets for a user
function Tweets({ user }) {
  const url = `/tweets/${user.name}`;
  const [loading, setLoading] = useState(true);
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    const fetchTweets = async () => axios.get(
      url
    ).then(
      (response) => {
        setTweets(response.data.tweets)
        setLoading(false);
      }
    ).catch(
      err => console.log(err)
    );

    fetchTweets();
  }, [])

  if (loading) {
    return <h2>Loading tweets</h2>
  }
  if (tweets) {
    return (
      <Container>
        <h2>Tweets from {user.name}</h2>
        <Row className='justify-content-center'>
          <Col className='col-auto'>
            {tweets.map(tweet => <Tweet tweet={tweet} user={user.name} key={tweet.created_at} />)}
          </Col>

        </Row>
      </Container>
    )
  }
  return (<h2>User's tweets goes here</h2>)
}

function App() {
  const user = { name: 'tim' }
  return (
    <>
      <div className='App'>
        <h1>Mini Twitter</h1>
        <NewTweet />
        <br></br>
        <br></br>

        <Container>
          <Tweets user={user} />
        </Container>
      </div>
    </>
  );
}

export default App;
