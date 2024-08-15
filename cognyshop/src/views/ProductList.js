import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import "../styles.css";
import AddToCartButton from "../components/AddToCartButton";
import icons100 from "../assets/icons100.png";
import iconscompras50 from "../assets/iconscompras50.png";
import iconsfavorito50 from "../assets/iconsfavorito50.png";
import { Link } from "react-router-dom";

function ProductsList() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  // const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error("Erro ao buscar produtos: ", error);
    }
  };

  const fetchCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);
  };

  useEffect(() => {
    fetchProducts();
    fetchCartCount();
  }, []);

  const handleAddToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex >= 0) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({
        id: product.id,
        name: product.description,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity: 1,
      });
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    fetchCartCount(); // Atualiza o número total de itens no carrinho
    // navigate("/cart");
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
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <img src={product.imageUrl} alt={product.description} />
            <h3>{product.description}</h3>
            <p>
              Preço:{" "}
              {product.price !== undefined && !isNaN(product.price)
                ? `R$ ${product.price.toFixed(2).replace(".", ",")}`
                : "Preço não disponível"}
            </p>
            <AddToCartButton onClick={() => handleAddToCart(product)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsList;
