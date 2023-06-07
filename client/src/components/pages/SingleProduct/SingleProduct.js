import React from "react";
import { useSelector } from "react-redux";
import { getProductById } from "../../../redux/productsRedux";
import { useParams } from "react-router-dom";
import { Col, Container, Card } from "react-bootstrap";


const SingleProduct = () => {

  const productId = useParams();
  const id = productId.id
  const productData = useSelector(state => getProductById(state, id));


  return (
    <Container className="d-flex justify-content-center">
      <Col xs="12" lg="5" className="mt-4">
        <Card>
          <Card.Body>
            <Card.Title> Price: {productData.price}$</Card.Title>
            <Card.Subtitle>
              <b>Name: {productData.name}</b>
            </Card.Subtitle>
            <Card.Text>
              <b>Description: {productData.description}</b>
            </Card.Text>
            <Card.Text>
              <b>CreatedAt: {productData.createdAt}</b>
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Container>
  )
}

export default SingleProduct;