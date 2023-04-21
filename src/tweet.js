import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';


export function Tweet({ tweet, deleteCallback }) {
    return (
        <Card>
            <Card.Body>
                <Card.Header style={{ color: 'blue' }}>{tweet.created_at}</Card.Header>
                <Card.Text>{tweet.text}</Card.Text>
                <Button className='btn-warning' onClick={deleteCallback}>Delete</Button>
            </Card.Body>
        </Card>
    )
}

function UserDropdown({ setUser, setCurrentUser }) {
    const [usernames, setUsernames] = useState([]);

    const handleSelect = (k, _e) => {
        setUser({ name: k });
        setCurrentUser(k);
    }

    useEffect(() => {
        const fetchUsers = async () => axios.get('/users')
            .then((response) => {
                setUsernames(response.data.users);
            })
            .catch(console.error);

        fetchUsers();
    }, []);

    return (
        <Dropdown onSelect={handleSelect}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Select User
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {
                    usernames.map(username => <Dropdown.Item key={username} eventKey={username}>{username}</Dropdown.Item>)
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}

// The New Tweet component defines a form for posting new tweets
export function NewTweet({ user, setUser, reloadTweets, setReloadTweets }) {
    const newTweetContentRef = useRef();
    const newTweetFormRef = useRef();
    const [currentUser, setCurrentUser] = useState('guest')
    const handlePost = async (e) => {
        e.preventDefault();
        const data = {
            user: user.name,
            text: newTweetContentRef.current.value,
        };
        axios.post(
            '/tweets',
            JSON.stringify(data),
        ).then(
            setReloadTweets(!reloadTweets)
        ).then(
            // clears input after posting
            () => newTweetFormRef.current.reset()
        ).catch(
            err => console.error(err)
        );
    }

    return (
        <div>
            <Form ref={newTweetFormRef}>
                <Container>
                    <Form.Group>
                        <Row className='justify-content-center'>
                            <Col className='col-auto'>
                                <UserDropdown setUser={setUser} setCurrentUser={setCurrentUser}></UserDropdown>
                            </Col>
                            <Col className='col-sm-1'>
                                <p><b>{currentUser}</b></p>
                            </Col>
                            <Col className='col-md-6'>
                                <Form.Control ref={newTweetContentRef} placeholder='new tweet' id='tweet-text-input'>
                                </Form.Control>
                            </Col>
                            <Col className='col-auto'><Button type='submit' onClick={handlePost}>Post</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </Container>
            </Form>
        </div>
    );
}
