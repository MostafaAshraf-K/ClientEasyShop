import Carousel from "react-bootstrap/Carousel";
import "./HeroSection.css";
import controller3 from "../../assets/Slider-5.png";
import controller2 from "../../assets/Slider-8.png";
import controller from "../../assets/Slider-7.png";
import { Link } from "react-router-dom";

function UncontrolledExample() {
  return (
    <Carousel className="slider" fade={true} controls={false} slide={true}>
      <Carousel.Item>
        <div className="carousel-content">
          <div className="slider-text">
            <h1>Walk in Comfort and Fashion</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Similique cumque fugiat velit, impedit qui molestiae.
            </p>
            <Link to="/products/shoes" className="shop-now-btn">
              Shop now
            </Link>
          </div>
          <img
            className="d-block w-100 fashion"
            src={controller}
            alt="First slide"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-content">
          <div className="slider-text">
            <h1>Trendsetting Designs for Her</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Similique cumque fugiat velit, impedit qui molestiae.
            </p>
            <Link to="/products/electronics" className="shop-now-btn">
              Shop now
            </Link>
          </div>
          <img
            className="d-block w-100 tec"
            src={controller2}
            alt="First slide"
          />
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="carousel-content">
          <div className="slider-text">
            <h1>Unleash Your Audio Experience</h1>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Similique cumque fugiat velit, impedit qui molestiae.
            </p>
            <Link to="/products/headphones" className="shop-now-btn">
              Shop now
            </Link>
          </div>
          <img
            className="d-block w-100 headphone"
            src={controller3}
            alt="First slide"
          />
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;
