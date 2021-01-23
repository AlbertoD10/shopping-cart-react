import React, { useState, useEffect } from "react";
import TopMenu from "./components/TopMenu";
import Products from "./components/Products";
import useFetch from "./hooks/useFetch";
import { urlApiProductos } from "./utils/constants";
import { STORAGE_PRODUCT_CART } from "./utils/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import productos from "./db/dbProducts.json";

function App(props) {
  const products = useFetch(urlApiProductos, null);
  const [productsCart, setProductsCart] = useState([]);

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
    show();
    // console.log(`Haz agregado ${name} con id ${id}`);
  };

  const show = () => {
    toast.success("Producto agregado al carrito");
  };

  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={2300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
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
    </div>
  );
}

export default App;
