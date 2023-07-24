import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import "./SingleProductPage.css";
import smallImage1 from "../../assets/Products-img-1.png";
import smallImage2 from "../../assets/Products-img-1.png";
import smallImage3 from "../../assets/Products-img-1.png";
import smallImage4 from "../../assets/Products-img-1.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { publicRequest } from "../../requestMethod";
import { useDispatch, useSelector } from "react-redux";
import { addProductToCart } from "../../Redux/userRedux.js";
import { addToCart } from "../../Redux/apiCalls.js";
import Swal from "sweetalert2";
// import { addToCart } from "../../Redux/UserCartProduct.js"; // This is the API function to add the product to the cart

// Big image must be   height: 600px; width: 745px;

const SingleProductPage = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/products/find/" + id);
        setProduct(res.data);
      } catch (error) {
        // console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantityDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityIncrease = () => {
    setQuantity(quantity + 1);
  };
  const handleSmallImageHover = (imageSrc) => {
    document.getElementById("mainImage").src = imageSrc;
  };

  const handleSmallImageLeave = () => {
    document.getElementById("mainImage").src = product.img;
  };

  const handleColorChange = (event) => {
    const selectedColor = event.target.value;
    setColor(selectedColor);
  };

  const handleSizeChange = (event) => {
    const selectedSize = event.target.value;
    setSize(selectedSize);
  };

  const handleAddToCart = async () => {
    try {
      let updatedQuantity = quantity; // Create a separate variable to hold the updated quantity value

      const productData = {
        _id: product._id,
        title: product.title,
        desc: product.desc,
        img: product.img,
        smallImages: product.smallImages,
        categories: product.categories,
        size: size ? [size] : [],
        color: color ? [color] : [],
        price: product.price,
        quantity: updatedQuantity, // Use the updated quantity value in the productData object
      };
      // console.log(productData);
      await addToCart(user._id, productData);
      dispatch(addProductToCart(productData));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Required",
        text: "Please register an account to add products to your cart.",
        customClass: {
          confirmButton: "SweetAlertBtn",
        },
      });
    }
  };

  return (
    <Container className="single-product-page py-5 mt-5">
      <Row>
        <Col lg={7} sm={12} className="single-product-images">
          <img
            src={product?.img}
            alt="Main"
            className="single-main-image"
            id="mainImage"
          />
          <Row className="single-product-small-images">
            {product?.smallImages?.map((smallimg) => {
              return (
                <Col
                  key={smallimg.id}
                  xs={3}
                  className="single-product-small-img"
                >
                  <img
                    src={smallimg.url}
                    alt="Small 1"
                    onMouseEnter={() => handleSmallImageHover(smallimg.url)}
                    onMouseLeave={handleSmallImageLeave}
                  />
                </Col>
              );
            })}
          </Row>
        </Col>
        <Col lg={5} sm={12} className="single-page-product-details">
          <h2 className="single-p-product-name">{product.title}</h2>
          <p className="single-product-details">{product.desc}</p>
          <div className="single-p-product-rating">
            <p className="rating">Rating</p>
            <FaStar className="single-p-star" />
            <FaStar className="single-p-star" />
            <FaStar className="single-p-star" />
            <FaStar className="single-p-star" />
            <FaStar className="single-p-star" />
          </div>
          <p className="single-p-product-price">${product.price}</p>
          <div className="chose">
            <Form.Select
              aria-label="Default select example"
              name="color"
              onChange={handleColorChange}
              defaultValue="" // Add defaultValue attribute
              className="increase-sing-p"
            >
              <option value="" disabled hidden>
                Select Color
              </option>
              {product?.color?.map((color) => {
                return <option key={color}>{color}</option>;
              })}
            </Form.Select>
            <Form.Select
              aria-label="Default select example"
              name="size"
              onChange={handleSizeChange}
              defaultValue="" // Add defaultValue attribute
            >
              <option value="" disabled hidden>
                Select Size
              </option>
              {product?.size?.map((size) => {
                return <option key={size}>{size}</option>;
              })}
            </Form.Select>
          </div>
          <div className="quantity-input">
            <Button
              onClick={handleQuantityDecrease}
              variant="outline-secondary"
            >
              -
            </Button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />

            <Button
              onClick={handleQuantityIncrease}
              variant="outline-secondary"
            >
              +
            </Button>
          </div>

          <div className="buttons">
            <Button
              variant="outline-primary"
              className="add-to-cart-button"
              onClick={handleAddToCart} // Pass the productId as an argument
            >
              Add to Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SingleProductPage;
