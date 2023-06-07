import { Route, Routes } from "react-router-dom";

import Home from './components/pages/Home/Home';
import Product from './components/pages/Products/Products';
import Header from "./components/views/Header/Header";
import Footer from "./components/views/Footer/Footer";
import { Container } from "react-bootstrap";
import NotFound from "./components/pages/NotFound/NotFound";
import Register from "./components/pages/Register/Register";

const App = () => {
  return (
    <Container>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Container>
  );
};

export default App;