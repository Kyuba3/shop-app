import { useDispatch, useSelector } from "react-redux"
import { getAllProducts, loadProductsRequest } from "../../../redux/productsRedux"
import { useEffect } from "react";
import { Row, Col } from 'react-bootstrap';
import ProductBox from "../ProductsBox/ProductsBox";


const AllProducts = () => {
  const products = useSelector(getAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProductsRequest());
  }, [dispatch]);

  return (
    <Row xs={1} md={2} xl={3} className="g-3 ">
        {products.map((product) => (
          <Col key={product.id}>
            <ProductBox {...product} />
          </Col>
        ))}
    </Row>
  );
};

export default AllProducts;