import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig"; 
import { collection, getDocs } from "firebase/firestore";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../styles.css";
import AddToCartButton from "../components/AddToCartButton";
import icons100 from "../assets/icons100.png";
import iconscompras50 from "../assets/iconscompras50.png";
import iconsfavorito50 from "../assets/iconsfavorito50.png";
import { Link } from "react-router-dom";

function ProductsFavorite() {
  //   const handleAddToCart = (product) => {
  //     // Função para adicionar o produto ao carrinho
  //     console.log("Produto adicionado ao carrinho:", product);
  //   };

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
            <img
              src={iconscompras50}
              alt="Ícone Carrinho"
              className="icon-cart"
            />
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
      <div className="product-list">Lista de favoritos aqui!</div>
    </div>
  );
}

export default ProductsFavorite;
