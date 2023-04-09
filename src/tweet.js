import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Dropdown from 'react-bootstrap/Dropdown';
import { useRef } from 'react';
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


// The New Tweet component defines a form for posting new tweets
export function NewTweet({ user, setUser, reloadTweets, setReloadTweets }) {
    const tweetContent = useRef();
    const handlePost = async (e) => {
        e.preventDefault();
        const data = {
            user: user.name,
            text: tweetContent.current.value,
        };
        axios.post(
            '/tweets',
            JSON.stringify(data),
        ).then(
            setReloadTweets(!reloadTweets)
        ).catch(
            err => console.error(err)
        );
    }

    const handleSelect = (k, _e) => {
        setUser({ name: k });
    }

    return (
        <div>
            <Form>
                <Container>
                    <Form.Group>
                        <Row className='justify-content-center'>
                            <Col className='col-auto'>
                                <Dropdown onSelect={handleSelect}>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        Select User
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey='tim'>tim</Dropdown.Item>
                                        <Dropdown.Item eventKey='batman'>batman</Dropdown.Item>
                                        <Dropdown.Item eventKey='wesley'>wesley</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                            <Col className='col-md-6'>
                                <Form.Control ref={tweetContent} placeholder='new tweet'>
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
