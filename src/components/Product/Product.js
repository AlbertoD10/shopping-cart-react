import React from "react";
import { Col, Card, Button } from "react-bootstrap";
import "./product.scss";
import { BASE_PATH } from "../../utils/constants";

export default function Product(props) {
  const { product, addProductCart } = props;

  return (
    <Col xs={12} className="product">
      <Card>
        <Card.Img variant="top" src={`${BASE_PATH}/${product.image}`} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>{product.extraInfo}</Card.Text>
          <Card.Text>{product.price.toFixed(2)}</Card.Text>
          <Button
            variant="outline-primary"
            onClick={() => addProductCart(product.id, product.name)}
          >
            Añadir al carrito
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
}
