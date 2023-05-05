import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

export function TweetSentAlert({ showAlert, setShowAlert }) {
  if (showAlert) {
    return (
      <Row className="justify-content-center">
        <Col className="col-auto">
          <Alert onClose={() => setShowAlert(false)} dismissible>
            Tweet is submitted
          </Alert>
        </Col>
      </Row>
    );
  }
}
