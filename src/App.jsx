import NavBar from "./Components/NavBar/NavBar";
import Home from "./Pages/Home/Home";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./Pages/ErrorPage/ErrorPage";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import CategoryPage from "./Pages/CategoryPage/CategoryPage";
import SingleProductPage from "./Pages/SingleProductPage/SingleProductPage";
import { useSelector } from "react-redux";
import Cancel from "./Components/Shop/Cancel";
import Success2 from "./Components/Shop/Success2";
function App() {
  const user = useSelector((state) => state.user.currentUser);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<NavBar />}>
        <Route index element={<Home />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        
        <Route path="/products/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<SingleProductPage />} />
        <Route path="/success" element={<Success2 />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
