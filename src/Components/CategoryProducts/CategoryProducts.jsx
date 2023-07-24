import { Container, Row, Col } from "react-bootstrap";
import "./CategoryProducts.css";
import shoes from "../../assets/category-2.png";
import men from "../../assets/men-category.png";
import women from "../../assets/women-category.png";
import electric from "../../assets/elect-category.png";
import hat from "../../assets/cap-category.png";
import headphone from "../../assets/headphone-category.png";
import { Link } from "react-router-dom";

const CategoryProducts = () => {
  return (
    <div className="category-section container py-5">
      <Container>
        <h2 className="category-title">Top Categories</h2>
        <Row>
          <Col lg={2} md={4} sm={6} className="category-item">
            <Link to="/products/men">
              <img src={men} alt="men" />
              <div className="category-text">Men</div>
            </Link>
          </Col>
          <Col lg={2} md={4} sm={6} className="category-item">
            <Link to="/products/electronics">
              <img src={electric} alt="electronics" />
              <div className="category-text">Electronics</div>
            </Link>
          </Col>
          <Col lg={2} md={4} sm={6} className="category-item">
            <Link to="/products/shoes">
              <img src={shoes} alt="shoes" />
              <div className="category-text">Shoes</div>
            </Link>
          </Col>
          <Col lg={2} md={4} sm={6} className="category-item">
            <Link to="/products/headphones">
              <img src={headphone} alt="headphones" />
              <div className="category-text">Headphones</div>
            </Link>
          </Col>
          <Col lg={2} md={4} sm={6} className="category-item">
            <Link to="/products/women">
              <img src={women} alt="women" />
              <div className="category-text">Women</div>
            </Link>
          </Col>
          <Col lg={2} md={4} sm={6} className="category-item">
            <Link to="/products/hats">
              <img src={hat} alt="hats" />
              <div className="category-text">Hats</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategoryProducts;
