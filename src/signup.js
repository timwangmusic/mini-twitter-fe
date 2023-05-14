import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useRef, useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Nav from "react-bootstrap/Nav";
import { RiHomeHeartLine } from "react-icons/ri";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [status, setStatus] = useState("pending");
  const formRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    await axios
      .post(
        "/users",
        JSON.stringify({
          Username: username,
          Email: email,
          Password: password,
        })
      )
      .then(() => {
        console.log("user is created");
        setStatus("success");
        clearUserinput();
        formRef.current.reset();
      })
      .catch(() => {
        console.error("failed to create the user");
        setStatus("failure");
        clearUserinput();
        formRef.current.reset();
      });
  }

  function clearUserinput() {
    setEmail("");
    setPassword("");
    setUsername("");
  }

  return (
    <>
      <Nav>
        <Nav.Item>
          <Nav.Link href="/"><RiHomeHeartLine /> Home</Nav.Link>
        </Nav.Item>
      </Nav>
      <h1 style={{ textAlign: "center", color: "#00acee" }}>Mini Twitter</h1>
      <Container>
        <Row className="justify-content-center">
          <Col className="col-4">
            <h2>Sign Up</h2>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="col-4">
            <Form ref={formRef}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button
                className="mb-3"
                onClick={handleSubmit}
                type="submit"
                disabled={email.length === 0 || password.length === 0}
              >
                Submit
              </Button>
            </Form>
            <NewUserCreateAlert status={status} setStatus={setStatus} />
          </Col>
        </Row>
      </Container>
    </>
  );
}

function NewUserCreateAlert({ status, setStatus }) {
  if (status === "success") {
    return (
      <div className="mb-3">
        <Alert
          className="mb-3"
          variant="success"
          onClose={() => setStatus("pending")}
          dismissible
        >
          User is created.
        </Alert>
      </div>
    );
  } else if (status === "failure") {
    return (
      <div className="mb-3">
        <Alert
          className="mb-3"
          variant="danger"
          onClose={() => setStatus("pending")}
          dismissible
        >
          Failed to create the user.
        </Alert>
      </div>
    );
  }
}
