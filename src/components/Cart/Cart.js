import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as CartEmpty } from "../../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/svg/cart-full.svg";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Garbage } from "../../assets/svg/garbage.svg";
import { STORAGE_PRODUCT_CART, BASE_PATH } from "../../utils/constants";
import {
  removeArrayDuplicates,
  countDuplicatesItemArray,
  removeItemArray,
} from "../../utils/ArrayFunc";
import "./cart.scss";

export default function Cart(props) {
  const { productsCart, emptyCart, products, getProductsCart } = props;
  const [cartOpen, setCartOpen] = useState(false);
  const [singleProductsCart, setSingleProductsCart] = useState([]);
  const [cartTotalPrice, setCartTotalPrice] = useState(0);
  //Creo una variable para setear el valor del width cuando abra el carrito
  const widthCartContent = cartOpen ? 400 : 0;

  //Cargo los productos
  useEffect(() => {
    const allProductsId = removeArrayDuplicates(productsCart);
    setSingleProductsCart(allProductsId);
  }, [productsCart]);

  //Actualizo el precio total del carrito
  useEffect(() => {
    const productData = [];
    let totalPrice = 0;

    const allProductsId = removeArrayDuplicates(productsCart); //Devuelve los productos unicos del carrito
    allProductsId.forEach((productId) => {
      const quantity = countDuplicatesItemArray(productId, productsCart); //Saber la cantidad del mismo producto
      const productValue = {
        id: productId,
        quantity: quantity,
      }; //Aqui guardo la cantidad de producto y el id del producto
      productData.push(productValue); //Ingreso en el array de arriba la info del producto
    });

    if (!products.loading && products.result) {
      products.result.forEach((product) => {
        productData.forEach((item) => {
          if (product.id == item.id) {
            const totalValue = product.price * item.quantity;
            totalPrice = totalPrice + totalValue;
          }
        });
      });
    }
    setCartTotalPrice(totalPrice);
  }, [products, productsCart]);

  const openCart = () => {
    setCartOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeCart = () => {
    setCartOpen(false);
    document.body.style.overflow = "auto";
  };

  const increaseQuantity = (id) => {
    const arrayItemsCart = productsCart;
    arrayItemsCart.push(id);
    localStorage.setItem(STORAGE_PRODUCT_CART, arrayItemsCart);
    console.log("INcrementado");
    // getProductsCart();
  };

  const decreaseQuantity = (id) => {
    const arrayItemsCart = productsCart;
    const result = removeItemArray(arrayItemsCart, id.toString());
    localStorage.setItem(STORAGE_PRODUCT_CART, arrayItemsCart);
    console.log("Decrementado");
  };

  return (
    <>
      <Button className="cart" variant="link" onClick={openCart}>
        {productsCart.length > 0 ? (
          <CartFull onClick={openCart} />
        ) : (
          <CartEmpty onClick={openCart} />
        )}
      </Button>
      <div className="cart-content" style={{ width: widthCartContent }}>
        <CartContentHeader closeCart={closeCart} emptyCart={emptyCart} />
        <div className="cart-content__products">
          {singleProductsCart.map((idProductCart, index) => (
            <CartContentProducts
              key={index}
              products={products}
              idsProductsCart={productsCart} //Productos totales en el local storage
              idProductCart={idProductCart} //El id sin duplicar que voy a generar
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              getProductsCart={getProductsCart}
            />
          ))}
        </div>
        <CartContentFooter cartTotalPrice={cartTotalPrice} />
      </div>
    </>
  );
}

function CartContentHeader(props) {
  const { closeCart, emptyCart } = props;

  return (
    <div className="cart-content__header">
      <div>
        <Close onClick={closeCart} />
        <h2>Carrito.</h2>
      </div>
      <Button variant="link" onClick={emptyCart}>
        Vaciar
        <Garbage />
      </Button>
    </div>
  );
}

function CartContentProducts(props) {
  const {
    products: { loading, result },
    idsProductsCart,
    idProductCart,
    increaseQuantity,
    decreaseQuantity,
    getProductsCart,
  } = props;

  if (!loading && result) {
    return result.map((product, index) => {
      if (idProductCart == product.id) {
        const cantidad = countDuplicatesItemArray(product.id, idsProductsCart);
        return (
          <RenderProduct
            key={index}
            product={product}
            cantidad={cantidad}
            increaseQuantity={increaseQuantity}
            decreaseQuantity={decreaseQuantity}
            getProductsCart={getProductsCart}
          />
        );
      }
    });
  }

  return "Products...";
}

function RenderProduct(props) {
  const { product, cantidad, increaseQuantity, decreaseQuantity } = props;

  return (
    <div className="cart-content__product">
      <img src={`${BASE_PATH}/${product.image}`} alt={product.name} />
      <div className="cart-content__product-info">
        <div>
          <h3> {product.name.substr(0, 25)}...</h3>
          <p>{product.price.toFixed(2)} $ / ud.</p>
        </div>
        <p>En carro: {cantidad} ud.</p>
        <div>
          <button onClick={() => increaseQuantity(product.id)}>+</button>
          <button onClick={() => decreaseQuantity(product.id)}>-</button>
        </div>
      </div>
    </div>
  );
}

function CartContentFooter(props) {
  const { cartTotalPrice } = props;

  return (
    <div className="cart-content__footer">
      <div>
        <p>Total aproximado: </p>
        <p>{cartTotalPrice.toFixed(2)}$ </p>
      </div>
      <Button>Tramitar pedido</Button>
    </div>
  );
}
