import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer py-5 ">
      <Container>
        <Row>
          <Col md={4}>
            <h5>Easy Shop</h5>
            <p>Your one-stop shop for all your shopping needs!</p>
          </Col>
          <Col md={4}>
            <h5>Useful Links</h5>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>Shop</li>
              <li>About Us</li>
              <li>Contact</li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Info</h5>
            <p>1234 Street Name, City, Country</p>
            <p>Email: info@easyshop.com</p>
            <p>Phone: +1 234 567890</p>
          </Col>
        </Row>
      </Container>
      <div className="footer-bottom">
        <Container>
          <p className="text-center">
            &copy; {new Date().getFullYear()} Easy Shop. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
