import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import success from "../../assets/success.png";

const Success2 = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center  font-raleway bg-light mt-5">
      <Row className="max-w-5xl rounded flex flex-col text-center">
        <h1 className="text-success display-1">Payment successful</h1>
        <p className="text-warning mt-4 lead font-weight-bold ">
          Your order is in our system
        </p>
        <Link to="/" className="text-decoration-underline lead">
          Back to Home Page
        </Link>
        <Col className="d-flex justify-content-center align-items-center my-5">
          <img src={success} alt="" className="w-50" />
        </Col>
      </Row>
    </Container>
  );
};

export default Success2;
