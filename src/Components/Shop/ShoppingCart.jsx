// import { useState, useEffect } from "react";
// import "./ShoppingCart.css";
// import { Row, Col, Button } from "react-bootstrap";
// import { useSelector, useDispatch } from "react-redux";
// import StripeCheckout from "react-stripe-checkout";
// import { userRequest } from "../../requestMethod";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   selectCart,
//   updateProductQuantity,
//   removeItem,
// } from "../../Redux/userRedux.js";
// import { removeFromCart } from "../../Redux/apiCalls";
// import Swal from "sweetalert2";
// import axios from "axios";

// const KEY =
//   "pk_test_51NKMTnGOEoWcRfMY9z3SV4qTiDcjvbPxBUF1q9UNWvEEgCNsN6SdjB4bNrVJGplj6NCJ4mGzaeXscrsObll4vpHe00bNahyN2A";

// const ShoppingCart = () => {
//   const cart = useSelector((state) => state.cart);
//   const shipping = 5.0;
//   const discount = 10.0;
//   const cartUser = useSelector(selectCart);
//   const user = useSelector((state) => state.user.currentUser);

//   const dispatch = useDispatch();

//   const handleQuantityDecrease = (productId) => {
//     dispatch(updateProductQuantity({ productId, quantity: -1 }));
//   };

//   const handleQuantityIncrease = (productId) => {
//     dispatch(updateProductQuantity({ productId, quantity: 1 }));
//   };

//   const handleRemoveItem = async (productId) => {
//     try {
//       console.log(user._id);

//       Swal.fire({
//         title: "Confirmation",
//         text: "Are you sure you want to remove this item?",
//         icon: "warning",
//         showCancelButton: true,
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, remove it!",
//         customClass: {
//           confirmButton: "SweetAlertBtn",
//         },
//       }).then(async (result) => {
//         if (result.isConfirmed) {
//           await removeFromCart(user._id, productId);
//           dispatch(removeItem({ productId }));

//           Swal.fire("Removed!", "The item has been removed.", "success");
//         }
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const subtotal = cartUser?.reduce(
//     (acc, item) => {
//       const itemQuantity = item.quantity || 0;
//       return { price: acc.price + item.price * itemQuantity };
//     },
//     { price: 0 }
//   ).price;

//   const total = subtotal + shipping - discount;

//   const checkout = async () => {
//     try {
//       const response = await fetch(
//         "http://localhost:5000/api/checkout/create-checkout-session",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             cartUser: cartUser.map((item) => ({
//               id: item._id,
//               quantity: item.quantity,
//               price: item.price,
//               name: item.title,
//               img: item.img,
//               desc: item.desc,
//             })),
//             userId: user._id,
//           }),
//         }
//       );
//       if (response.ok) {
//         const res = await response.json();
//         console.log(res);
//         window.location = res.url;
//       } else {
//         const { error } = await response.json();
//         console.error(error);
//       }
//     } catch (e) {
//       console.error(e);
//     }
//   };

//   console.log(cartUser);
//   // console.log(user);
//   return (
//     <div className="shopping-cart py-5 mt-5">
//       <Row>
//         <Col xs={8}>
//           <h1 style={headerStyle}>Your Bag</h1>
//           <Row style={cartItemsStyle}>
//             {cartUser?.map((item) => {
//               return (
//                 <div key={item._id} style={ShopingcartProduct}>
//                   <Col xs={3} style={cartItemImageStyle}>
//                     <img src={item.img} alt="Product" style={itemImageStyle} />
//                   </Col>
//                   <Col xs={9} style={cartItemDetailsStyle}>
//                     <div style={itemDetailsStyle}>
//                       <h4 style={itemNameStyle}>{item.title}</h4>
//                       <p style={itemInfoStyle}>Color: {item.color}</p>
//                       <p style={itemInfoStyle}>Size: {item.size}</p>
//                       <p style={itemInfoStyle}>Quantity: {item.quantity}</p>
//                       <div style={itemQuantityStyle}>
//                         <div style={quantityControlsStyle}>
//                           <Button
//                             variant="outline-danger"
//                             onClick={() => handleRemoveItem(item._id)}
//                           >
//                             Remove
//                           </Button>
//                         </div>
//                       </div>
//                       <p style={itemPriceStyle}>
//                         ${(item.price * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </Col>
//                 </div>
//               );
//             })}
//           </Row>{" "}
//         </Col>

//         <Col xs={4} className="cart-check-out">
//           <div className="cart-text">
//             <p>
//               Subtotal: <span>${subtotal}</span>
//             </p>
//             <p>
//               Shipping: <span>${shipping.toFixed(2)}</span>
//             </p>
//             <p>
//               Discount: <span>-${discount.toFixed(2)}</span>
//             </p>
//             <p>
//               Total: <span>${total}</span>
//             </p>
//           </div>
//           <div>
//             <Button className="continue-shopping">
//               <Link to="/">Continue Shopping</Link>{" "}
//             </Button>

//             <button
//               onClick={checkout}
//               className="bg-green-400 text-white px-8 py-4 rounded-md text-2xl 
//               font-semibold"
//             >
//               Checkout
//             </button>
//           </div>
//         </Col>
//       </Row>
//     </div>
//   );
// };

// export default ShoppingCart;

// // Styles

// const headerStyle = {
//   fontSize: "24px",
// };

// const cartItemsStyle = {
//   marginBottom: "20px",
// };

// const ShopingcartProduct = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
// };

// const cartItemImageStyle = {
//   display: "flex",
//   justifyContent: "center",
//   margin: "1rem 1rem 1rem 0rem",
// };

// const itemImageStyle = {
//   width: "200px",
//   height: "200px",
// };

// const cartItemDetailsStyle = {
//   display: "flex",
//   alignItems: "center",
// };

// const itemDetailsStyle = {
//   marginLeft: "0px",
// };

// const itemNameStyle = {
//   fontSize: "20px",
// };

// const itemInfoStyle = {
//   marginBottom: "5px",
// };

// const itemQuantityStyle = {
//   display: "flex",
//   alignItems: "center",
//   marginBottom: "10px",
// };

// const quantityControlsStyle = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// };

// const itemPriceStyle = {
//   fontSize: "18px",
//   fontWeight: "bold",
// };
