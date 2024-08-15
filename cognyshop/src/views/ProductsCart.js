import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import icons100 from "../assets/icons100.png";
import iconscompras50 from "../assets/iconscompras50.png";
import iconsfavorito50 from "../assets/iconsfavorito50.png";
import "../styles.css";

function ProductsCart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);

    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);
  }, []);

  // Calcula o preço total baseado na quantidade
  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Função para remover um item do carrinho
  const handleRemoveFromCart = (itemToRemove) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item.id === itemToRemove.id) {
          if (item.quantity > 1) {
            // Se a quantidade for maior que 1, apenas diminui a quantidade
            return { ...item, quantity: item.quantity - 1 };
          } else {
            // Se a quantidade for 1, remove o item
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null); // Remove os itens que são null

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    // Atualiza a quantidade total de itens no carrinho
    const totalCount = updatedCartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setCartCount(totalCount);
  };

  // Função para finalizar o pedido
  const handleFinalizeOrder = () => {
    alert("Seu pedido foi finalizado!");

    // Zera o carrinho
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
    setCartCount(0);
  };

  return (
    <div className="container">
      <div className="topo">
        <h1 className="title">
          <Link to="/" className="home-link">
            COGNYSHOES
            <img src={icons100} alt="Ícone Cognyshoes" className="logo" />
          </Link>
        </h1>
        <h1 className="cart">
          <Link to="/cart">
            <div className="cart-icon-container">
              <img
                src={iconscompras50}
                alt="Ícone Carrinho"
                className="icon-cart"
              />
              {cartCount > 0 && (
                <div className="cart-count-badge">{cartCount}</div>
              )}
            </div>
          </Link>
          <Link to="/favorites">
            <img
              src={iconsfavorito50}
              alt="Ícone Favoritos"
              className="icon-cart"
            />
          </Link>
        </h1>
      </div>
      {cartItems.length > 0 ? (
        <>
          <div className="product-list-cart">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Quantidade: {item.quantity}</p>
                  <p>
                    Preço Total:{" "}
                    {(item.price * item.quantity).toFixed(2).replace(".", ",")}{" "}
                    reais
                  </p>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            ))}
            <button className="finalize-button" onClick={handleFinalizeOrder}>
              Finalizar Pedido
            </button>
          </div>
          <div className="total-price-container">
            <div className="total-price">
              <h3>
                Total: {calculateTotalPrice().toFixed(2).replace(".", ",")}{" "}
                reais
              </h3>
            </div>
          </div>
        </>
      ) : (
        <p className="empty-cart-message">O carrinho está vazio.</p>
      )}
    </div>
  );
}

export default ProductsCart;
