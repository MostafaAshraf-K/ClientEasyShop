import { Container, Row } from "react-bootstrap";
import "./Products.css";
import { useEffect, useState } from "react";
import Product from "./Product";
import axios from "axios";
import PropTypes from "prop-types";
import { useNavigate } from "react-router";

const Products = ({
  category,
  filters,
  sort,
  SliceStart,
  SliceEnd,
  ProductListName,
}) => {
  const [products, setProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const source = axios.CancelToken.source(); // Create a cancel token source

    const getProducts = async () => {
      try {
        const url = category
          ? `${import.meta.env.VITE_BACKEND}products?category=${category}`
          : `${import.meta.env.VITE_BACKEND}products`;

        const res = await axios.get(url, {
          cancelToken: source.token, // Set the cancel token for the request
        });
        setProducts(res.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          // console.log("Request canceled:", err.message); // Handle canceled request
        } else {
          // console.log(err);
        }
      }
    };

    getProducts();

    return () => {
      source.cancel("Cleanup: Request canceled"); // Cancel the request when the component unmounts or category changes
    };
  }, [category]);

  useEffect(() => {
    category &&
      setFilterProducts(
        products.filter((item) => {
          return Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          );
        })
      );
  }, [category, products, filters]);

  useEffect(() => {
    if (products.length > 0) {
      if (sort === "newest") {
        setFilterProducts((prev) =>
          [...prev].sort(
            (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
          )
        );
      } else if (sort === "asc") {
        setFilterProducts((prev) =>
          [...prev].sort((a, b) => a.price - b.price)
        );
      } else {
        setFilterProducts((prev) =>
          [...prev].sort((a, b) => b.price - a.price)
        );
      }
    }
  }, [sort, products]);

  const handleClick = (event, product) => {
    event.preventDefault();
    // dispatch(addProduct({ ...product }));
    // console.log("gg");
    navigate(`/product/${product._id}`);
  };

  return (
    <Container className="container py-5 Product-underLine">
      <h1 className="header">{category ? category : ProductListName}</h1>
      <Row>
        {category
          ? filterProducts
              .slice(SliceStart, SliceEnd ? SliceEnd : filterProducts.length)
              .map((item) => (
                <Product
                  key={item._id}
                  productId={item._id}
                  title={`${item.title.slice(0, 40)}...`}
                  desc={`${item.desc.slice(0, 50)}...`}
                  img={item.img}
                  price={item.price.toFixed(2)}
                  handleClick={(event) => handleClick(event, item)}
                />
              ))
          : products
              .slice(0, 8)
              .map((item) => (
                <Product
                  key={item._id}
                  productId={item._id}
                  title={`${item.title.slice(0, 40)}...`}
                  desc={`${item.desc.slice(0, 50)}...`}
                  img={item.img}
                  price={item.price.toFixed(2)}
                  handleClick={(event) => handleClick(event, item)}
                />
              ))}
      </Row>
    </Container>
  );
};
Products.propTypes = {
  category: PropTypes.string,
  filters: PropTypes.object,
  sort: PropTypes.string,
  SliceStart: PropTypes.number,
  SliceEnd: PropTypes.number,
  ProductListName: PropTypes.string,
};

export default Products;
