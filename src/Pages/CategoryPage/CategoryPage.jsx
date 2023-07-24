import { Container, ButtonGroup, Dropdown, Form } from "react-bootstrap";
import "./CategoryPage.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Products from "../../Components/Products/Products";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProducts } from "../../Redux/productsSlice";
// image must be 400x400
const CategoryPage = () => {
  const location = useLocation();
  const category = location.pathname.split("/")[2];
  const [filters, setfilter] = useState({});
  const [sort, setSort] = useState("newest");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [category, dispatch]);

  const ProductsFilter = useSelector((state) => state.products.items);
  const handleFilter = (e) => {
    const value = e.target.value;
    if (value === "") {
      setfilter({}); // Reset the filters to an empty object
    } else {
      setfilter({
        ...filters,
        [e.target.name]: value,
      });
    }
  };
  return (
    <Container className="container py-5 mt-5 ">
      <div className="category-section container">
        <ButtonGroup className="category-buttons">
          <h2>Filter Products</h2>
          <Form.Select
            aria-label="Default select example"
            name="color"
            onChange={handleFilter}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Select Color
            </option>
            <option value="">All Colors</option>
            {ProductsFilter.map((item, index) => {
              const currentColor = item.color[0];
              const previousColor = ProductsFilter[index - 1]?.color[0];

              if (
                (index === 0 || currentColor !== previousColor) &&
                currentColor
              ) {
                return <option key={index}>{currentColor}</option>;
              }

              return null;
            })}
          </Form.Select>

          <Form.Select
            aria-label="Default select example"
            name="size"
            onChange={handleFilter}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Select Size
            </option>
            <option value="">All Sizes</option>
            {ProductsFilter.map((item, index) => {
              const currentsize = item.size[0];
              const previoussize = ProductsFilter[index - 1]?.size[0];

              if (
                (index === 0 || currentsize !== previoussize) &&
                currentsize
              ) {
                return <option key={index}>{currentsize}</option>;
              }

              return null;
            })}
          </Form.Select>
        </ButtonGroup>

        <Dropdown className="sort-by-dropdown">
          <h2>Sort Products</h2>
          <Form.Select
            aria-label="Default select example"
            name="sort"
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="asc">Price asc</option>
            <option value="desc">Price desc</option>
          </Form.Select>
        </Dropdown>
      </div>
      <Products category={category} filters={filters} sort={sort} />
    </Container>
  );
};

export default CategoryPage;
