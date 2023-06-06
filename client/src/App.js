import { Route, Routes } from "react-router-dom";

import Home from './components/pages/Home/Home';
import Product from './components/pages/Products/Products';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </>
  );
};

export default App;