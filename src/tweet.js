import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export function Tweet({ tweet, user }) {
    const onSubmit = async () => {
        axios.delete(`/tweets/${tweet.id}?user=${user}`)
            .then(
                (response) => {
                    console.log(response);
                    window.location.reload(true);
                }
            ).catch(
                console.error
            );
    }
    return (
        <Card>
            <Card.Body>
                <Card.Header style={{ color: 'blue' }}>{tweet.created_at}</Card.Header>
                <Card.Text>{tweet.text}</Card.Text>
                <Button className='btn-warning' type='submit' onClick={onSubmit}>Delete</Button>
            </Card.Body>
        </Card>
    )
}
