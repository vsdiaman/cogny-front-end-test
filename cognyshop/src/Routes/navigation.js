// Navigation.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductsCart from "../views/ProductsCart";
import ProductsFavorite from "../views/ProductsFavorite";
import ProductsList from "../views/ProductList";
import "../styles.css";

function Navigation() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductsList />} />
        <Route path="/cart" element={<ProductsCart />} />
        <Route path="/favorites" element={<ProductsFavorite />} />
      </Routes>
    </Router>
  );
}

export default Navigation;
