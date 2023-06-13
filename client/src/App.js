import { Route, Routes } from "react-router-dom";

import Home from './components/pages/Home/Home';
import SingleProduct from './components/pages/SingleProduct/SingleProduct';
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import { Container } from "react-bootstrap";
import NotFound from "./components/pages/NotFound/NotFound";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import Logout from "./components/pages/Logout/Logout";
import Cart from "./components/pages/Cart/Cart";
import OrderSummary from "./components/pages/OrderSummary/OrderSummary";

const App = () => {

  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/order" element={<OrderSummary />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;