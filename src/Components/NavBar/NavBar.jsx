import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import Logo from "/nav-logo.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, removeItem, selectCart } from "../../Redux/userRedux";
import "./NavBar.css";
import { useEffect, useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2";
import { removeFromCart } from "../../Redux/apiCalls";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.user.currentUser);
  const [showCart, setshowCart] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const getNavbarStyle = () => {
    if (location.pathname === "/") {
      return { backgroundColor: "transparent", color: "#222" };
    }
    return {
      backgroundColor: "#222",
      margin: "0",
    };
  };
  // const handleCartPage = () => {
  //   console.log("handleCartPage");
  //   // setshowCart(true);
  // };
  useEffect(() => {
    const handleDocumentClick = (e) => {
      if (!e.target.closest(".shopping-cart")) {
        setshowCart(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const handleCartPage = (e) => {
    e.stopPropagation();
    if (!showCart) {
      setshowCart(true);
    }
  };
  const handleRemoveItem = async (productId) => {
    try {
      // console.log(user._id);

      Swal.fire({
        title: "Confirmation",
        text: "Are you sure you want to remove this item?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
        customClass: {
          confirmButton: "SweetAlertBtn",
        },
      }).then(async (result) => {
        if (result.isConfirmed) {
          await removeFromCart(user._id, productId);
          dispatch(removeItem({ productId }));

          Swal.fire("Removed!", "The item has been removed.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const shipping = 0;
  const discount = 0;
  const cartUser = useSelector(selectCart);
  const subtotal = cartUser?.reduce(
    (acc, item) => {
      const itemQuantity = item.quantity || 0;
      return { price: acc.price + item.price * itemQuantity };
    },
    { price: 0 }
  ).price;

  const total = subtotal + shipping - discount;
  const checkout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND}checkout/create-checkout-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cartUser: cartUser.map((item) => ({
              id: item._id,
              quantity: item.quantity,
              price: item.price,
              name: item.title,
              img: item.img,
              desc: item.desc,
            })),
            userId: user._id,
          }),
        }
      );
      if (response.ok) {
        const res = await response.json();
        // console.log(res);
        window.location = res.url;
      } else {
        const { error } = await response.json();
        console.error(error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Navbar
        expand="xl"
        className="Nav-bar position-absolute"
        style={getNavbarStyle()}
      >
        <Container>
          <Navbar.Brand className="Logo">
            <Link to="/">
              <img
                alt=""
                src={Logo}
                width="30"
                height="30"
                className="d-inline-block align-top me-2"
              />
              EasyShop
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="icon-navbar"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Item>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </Nav.Item>{" "}
              <Nav.Item>
                <Link to="/products/men" className="nav-link">
                  Men
                </Link>
              </Nav.Item>{" "}
              <Nav.Item>
                <Link to="/products/electronics" className="nav-link">
                  Electronics
                </Link>
              </Nav.Item>{" "}
              <Nav.Item>
                <Link to="/products/shoes" className="nav-link">
                  Shoes
                </Link>
              </Nav.Item>{" "}
              <Nav.Item>
                <Link to="/products/headphones" className="nav-link">
                  Headphones
                </Link>
              </Nav.Item>{" "}
              <Nav.Item>
                <Link to="/products/women" className="nav-link">
                  Women
                </Link>
              </Nav.Item>{" "}
              <Nav.Item>
                <Link to="/products/hats" className="nav-link">
                  Hats
                </Link>
              </Nav.Item>
              {!user && (
                <>
                  <NavDropdown title="User" id="basic-nav-dropdown">
                    <NavDropdown.Item
                      className="user-dropdown"
                      as={Link}
                      to="/register"
                    >
                      Register
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      className="user-dropdown"
                      as={Link}
                      to="/login"
                    >
                      Login
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              )}
              {user && (
                <>
                  <NavDropdown title="User" id="basic-nav-dropdown">
                    {/* <NavDropdown.Item className=""> */}
                    <Button
                      variant="link"
                      onClick={handleLogout}
                      className="user-dropdown-logout"
                    >
                      Logout
                    </Button>
                    {/* </NavDropdown.Item> */}
                  </NavDropdown>
                  <Nav.Item
                    className="cart-link nav-link "
                    onClick={handleCartPage}
                  >
                    {/* <Link to="/cart" className="nav-link"> */}
                    <AiOutlineShoppingCart size={25} />
                    <Badge className="cart-badge">{user?.cart?.length}</Badge>
                    {/* </Link> */}{" "}
                    <div>
                      <div className="container">
                        <div className="navbar-right">
                          <div
                            className={`shopping-cart ${
                              showCart ? "active" : ""
                            }`}
                          >
                            <div className="shopping-cart-header">
                              <AiOutlineShoppingCart className="cart-icon" />
                              <span className="badge">
                                {user?.cart?.length}
                              </span>
                              <div className="shopping-cart-total">
                                <span className="main-color-text total">
                                  Total: ${total}
                                </span>
                                <span>SubTotal: ${subtotal}</span>
                                {/* <span> Discount: -${discount.toFixed(2)}</span> */}
                                {/* <span> Shipping: ${shipping.toFixed(2)}</span> */}
                              </div>
                            </div>
                            <ul className="shopping-cart-items">
                              {cartUser?.length === 0 ? (
                                <p className="text-center py-3">
                                  Your Cart is empty
                                </p>
                              ) : (
                                cartUser?.map((item) => {
                                  return (
                                    <li key={item._id} className="clearfix">
                                      <img src={item.img} alt="Product" />
                                      <div className="data-product">
                                        <span className="item-name">
                                          {item.title}
                                        </span>
                                        <span className="item-detail">
                                          Color: {item.color}
                                        </span>{" "}
                                        <span className="item-detail">
                                          Size: {item.size}
                                        </span>
                                        <div className="price-q-d">
                                          {" "}
                                          <span className="item-price">
                                            {" "}
                                            $
                                            {(
                                              item.price * item.quantity
                                            ).toFixed(2)}
                                          </span>
                                          <span className="item-quantity">
                                            Quantity: {item.quantity}
                                          </span>
                                          <span
                                            className="item-delete"
                                            onClick={() =>
                                              handleRemoveItem(item._id)
                                            }
                                          >
                                            <FiTrash2 />
                                          </span>
                                        </div>
                                      </div>
                                    </li>
                                  );
                                })
                              )}
                            </ul>
                            {cartUser?.length === 0 ? (
                              ""
                            ) : (
                              <div className="button" onClick={checkout}>
                                Checkout <i className="fa fa-chevron-right"></i>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Nav.Item>
                </>
              )}
            </Nav>
            <Form className="d-flex nav-form">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2 nav-search"
                aria-label="Search"
              />
              <Button className="nav-search-btn">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default NavBar;
