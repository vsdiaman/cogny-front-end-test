import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { firebase } from '../firebaseConfig'; 
import { collection, getDocs } from 'firebase/firestore';
import icons100 from '../assets/icons100.png';
import iconscompras50 from '../assets/iconscompras50.png';
import iconsfavorito50 from '../assets/iconsfavorito50.png';

const ProductsList = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(firebase.firestore(), 'products'));
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    } catch (error) {
      console.error('Erro ao buscar produtos: ', error);
    }
  };

  const fetchCartCount = () => {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalCount);
  };

  useEffect(() => {
    fetchProducts();
    fetchCartCount();
  }, []);

  const handleAddToCart = (product) => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

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

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    fetchCartCount(); // Atualiza o número total de itens no carrinho
    navigation.navigate('Cart'); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Image source={icons100} style={styles.logo} />
          <Text style={styles.title}>COGNYSHOES</Text>
        </TouchableOpacity>
        <View style={styles.icons}>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <View style={styles.iconContainer}>
              <Image source={iconscompras50} style={styles.icon} />
              {cartCount > 0 && <Text style={styles.cartCount}>{cartCount}</Text>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <Image source={iconsfavorito50} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
            <Text>{item.description}</Text>
            <Text>Preço: R$ {item.price.toFixed(2).replace('.', ',')}</Text>
            <Button title="Adicionar ao Carrinho" onPress={() => handleAddToCart(item)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 50,
  },
  title: {
    fontSize: 24,
  },
  icons: {
    flexDirection: 'row',
  },
  iconContainer: {
    position: 'relative',
  },
  icon: {
    width: 50,
    height: 50,
  },
  cartCount: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 50,
    width: 20,
    height: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  productItem: {
    marginBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
  },
});

export default ProductsList;
