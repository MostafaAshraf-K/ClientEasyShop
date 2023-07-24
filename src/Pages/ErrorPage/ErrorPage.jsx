import { Container, Row, Col } from "react-bootstrap";
import "./ErrorPage.css";

const ErrorPage = () => {
  const errorStyle = {
    color: "red",
    fontSize: "18px",
    textAlign: "center",
  };
  return (
    <div className="error-page">
      <Container>
        <Row>
          <Col>
            <h1>Oops! Something went wrong.</h1>
            <p style={errorStyle}>
              We&apos;re sorry, but an error has occurred.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ErrorPage;
