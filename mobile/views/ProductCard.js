import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { firebase } from "../firebaseConfig"; 
import icons100 from "../assets/icons100.png";
import iconscompras50 from "../assets/iconscompras50.png";
import iconsfavorito50 from "../assets/iconsfavorito50.png";

const ProductsCart = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(items);
    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleRemoveFromCart = (itemToRemove) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item.id === itemToRemove.id) {
          if (item.quantity > 1) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return null;
          }
        }
        return item;
      })
      .filter((item) => item !== null);

    setCartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

    const totalCount = updatedCartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    setCartCount(totalCount);
  };

  const handleFinalizeOrder = () => {
    Alert.alert("Pedido Finalizado", "Seu pedido foi finalizado!");
    setCartItems([]);
    localStorage.setItem("cartItems", JSON.stringify([]));
    setCartCount(0);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Image source={icons100} style={styles.logo} />
          <Text style={styles.title}>COGNYSHOES</Text>
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <View style={styles.iconContainer}>
              <Image source={iconscompras50} style={styles.icon} />
              {cartCount > 0 && (
                <Text style={styles.cartCount}>{cartCount}</Text>
              )}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Favorites")}>
            <Image source={iconsfavorito50} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>

      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image
                  source={{ uri: item.imageUrl }}
                  style={styles.cartItemImage}
                />
                <View style={styles.cartItemDetails}>
                  <Text>{item.name}</Text>
                  <Text>Quantidade: {item.quantity}</Text>
                  <Text>
                    Preço Total: R${" "}
                    {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                  </Text>
                  <Button
                    title="Remover"
                    onPress={() => handleRemoveFromCart(item)}
                  />
                </View>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPrice}>
              Total: R$ {calculateTotalPrice().toFixed(2).replace(".", ",")}
            </Text>
            <Button title="Finalizar Pedido" onPress={handleFinalizeOrder} />
          </View>
        </>
      ) : (
        <Text style={styles.emptyCartMessage}>O carrinho está vazio.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 50,
  },
  title: {
    fontSize: 24,
  },
  icons: {
    flexDirection: "row",
  },
  iconContainer: {
    position: "relative",
  },
  icon: {
    width: 50,
    height: 50,
  },
  cartCount: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "red",
    color: "white",
    borderRadius: 50,
    width: 20,
    height: 20,
    textAlign: "center",
    lineHeight: 20,
  },
  cartItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  cartItemImage: {
    width: 100,
    height: 100,
  },
  cartItemDetails: {
    marginLeft: 16,
    flex: 1,
  },
  totalPriceContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  totalPrice: {
    fontSize: 18,
    marginBottom: 8,
  },
  emptyCartMessage: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});

export default ProductsCart;
