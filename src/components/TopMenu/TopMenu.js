import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { ReactComponent as Logo } from "../../assets/svg/logo.svg";
import Cart from "../Cart";

import "./TopMenu.scss";

export default function TopMenu(props) {
  const { productsCart, emptyCart, products } = props;
  return (
    <Navbar className="top-menu" bg="dark" variant="dark">
      <Container>
        <BrandNav />
        {/* <MenuNav /> */}
        <Cart
          productsCart={productsCart}
          emptyCart={emptyCart}
          products={products}
        />
      </Container>
    </Navbar>
  );
}

function BrandNav() {
  return (
    <Navbar.Brand>
      <Logo />
      <h4>Bochom's IceCream</h4>
    </Navbar.Brand>
  );
}
function MenuNav() {
  return (
    <Nav className="mr-auto">
      <Nav.Link href="#">Aperitivos</Nav.Link>
      <Nav.Link href="#">Helados</Nav.Link>
      <Nav.Link href="#">Mascotas</Nav.Link>
    </Nav>
  );
}
