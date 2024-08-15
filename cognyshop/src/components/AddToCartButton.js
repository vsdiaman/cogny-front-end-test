import React from "react";
import "./AddToCartButton.css"; // Importa o arquivo de estilos

function AddToCartButton({ onClick }) {
  return (
    <button className="add-to-cart-button" onClick={onClick}>
      Adicionar ao Carrinho
    </button>
  );
}

export default AddToCartButton;
