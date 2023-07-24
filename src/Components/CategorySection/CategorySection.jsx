import { Dropdown, ButtonGroup, Form } from "react-bootstrap";
import "./CategorySection.css";
import { useState } from "react";
import Products from "../Products/Products";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../Redux/productsSlice";
import PropTypes from "prop-types";

function CategorySection({ category }) {
  const [filters, setfilter] = useState({});
  const [sort, setSort] = useState("newest");
  const dispatch = useDispatch();
  const ProductsFilter = useSelector((state) => state.products.items);
  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [category, dispatch]);

  const handleSortBySelect = (sortBy) => {
    console.log(`Selected sort by: ${sortBy}`);
    setSort(sortBy); // Update the sort state with the selected value
  };

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
    <>
      <div className="category-section container py-5">
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
            onChange={(e) => handleSortBySelect(e.target.value)} // Update the sort state when the value changes
          >
            <option value="newest">Newest</option>
            <option value="asc">Price Lowest price</option>
            <option value="desc">Price Highest price</option>
          </Form.Select>
        </Dropdown>
      </div>
      <Products
        category={category}
        filters={filters}
        sort={sort}
        SliceStart={0}
        SliceEnd={8}
      />
    </>
  );
}
CategorySection.propTypes = {
  category: PropTypes.string.isRequired,
};

export default CategorySection;
