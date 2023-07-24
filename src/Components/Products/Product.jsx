import { Button, Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// image must be 300x300

const Product = ({ productId, img, title, desc, price, handleClick }) => {
  return (
    <Col key={productId} lg={3} md={6} sm={12} onClick={handleClick}>
      {/* <Card className="product-card"> */}
      <Card className="product-card">
        {/* <Link to={`/product/${productId}`}> */}
          <Card.Img
            variant="top"
            src={img}
            alt="Product"
            className="product-img skeleton"
          />
        {/* </Link> */}
        <Card.Body>
          <Card.Title className="cartTitle">{title} </Card.Title>
          <div className="product-details">
            <Card.Text>{desc}</Card.Text>{" "}
            <div className="price skeleton-text">
              {/* <span className="product-price">Price:</span> */}
              <span className="product-price">
                <span className="dollars">$</span>
                {price}
              </span>
            </div>
          </div>
        </Card.Body>
        <Link to={`/product/${productId}`}>
          {" "}
          <Button className="show-btn">Show</Button>
        </Link>
      </Card>{" "}
      {/* </Card> */}
    </Col>
  );
};
Product.propTypes = {
  productId: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Product;
