import React, { useState, useEffect } from "react";
import TopMenu from "./components/TopMenu";
import Products from "./components/Products";
import useFetch from "./hooks/useFetch";
import { urlApiProductos } from "./utils/constants";
import { STORAGE_PRODUCT_CART } from "./utils/constants";
import { ToastContainer, toast } from "react-toastify";
import Toast from "react-bootstrap/Toast";
//import productos from "./db/dbProducts.json";

function App(props) {
  const products = useFetch(urlApiProductos, null);
  const [productsCart, setProductsCart] = useState([]);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    getProductsCart();
  }, []);

  //Con esto guardo los items en el local storage sin que se pierdan al recargar la pagina jeje
  const getProductsCart = () => {
    const idsProducts = localStorage.getItem(STORAGE_PRODUCT_CART);

    if (idsProducts) {
      const idsProductsSplit = idsProducts.split(",");
      setProductsCart(idsProductsSplit);
    } else {
      setProductsCart([]);
    }
  };

  //Vacio el carrito
  const emptyCart = () => {
    localStorage.removeItem(STORAGE_PRODUCT_CART);
    getProductsCart();
  };

  //Aumento la cantidad deel item en el carrito

  const addProductCart = (id, name) => {
    const idsProducts = productsCart;
    idsProducts.push(id);
    setProductsCart(idsProducts);
    localStorage.setItem(STORAGE_PRODUCT_CART, productsCart);
    getProductsCart();
    // console.log(`Haz agregado ${name} con id ${id}`);
  };

  const show = () => {
    setShowToast(true);
  };

  return (
    <div className="App">
      <TopMenu
        productsCart={productsCart}
        emptyCart={emptyCart}
        products={products}
        getProductsCart={getProductsCart}
      />
      <Products
        products={products}
        addProductCart={addProductCart}
        show={show}
      />
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="mr-auto">Producto añadido.</strong>
        </Toast.Header>
        <Toast.Body>Se ha añadido correctamente al carrito.</Toast.Body>
      </Toast>
    </div>
  );
}

export default App;
