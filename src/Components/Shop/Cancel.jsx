import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import cancel from "../../assets/cancel.png";

const Cancel = () => {
  return (
    <Container className="d-flex align-items-center justify-content-center font-raleway bg-light  mt-5">
      <Row className="max-w-5xl rounded flex flex-col text-center">
        <h1 className="text-danger display-1">Something went wrong!!</h1>
        <p className="text-danger mt-4 lead font-weight-bold">
          Please retry after sometime
        </p>
        <Link to="/" className="text-decoration-underline lead">
          Back to Home
        </Link>
        <Col className="d-flex justify-content-center align-items-center my-5">
          <img src={cancel} alt="" className="w-75" />
        </Col>
      </Row>
    </Container>
  );
};

export default Cancel;
