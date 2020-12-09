import React from "react";
import { Container, Row } from "react-bootstrap";
import Loading from "../Loading";
import Product from "../Product";
import "./products.scss";

export default function Products(props) {
  const {
    products: { result, loading, error },
    addProductCart,
    show,
  } = props;
  return (
    <Container>
      <Row>
        {loading || !result ? (
          <Loading />
        ) : (
          result.map((product, index) => (
            <div key={index}>
              <Product
                product={product}
                addProductCart={addProductCart}
                show={show}
              />
            </div>
          ))
        )}
      </Row>
    </Container>
  );
}
