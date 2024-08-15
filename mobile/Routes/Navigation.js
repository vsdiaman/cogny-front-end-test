import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProductsList from "../views/ProductList";
import ProductsCart from "../views/ProductCard";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={ProductsList} />
        <Stack.Screen name="Cart" component={ProductsCart} />
        <Stack.Screen name="Favorites" component={ProductsFavorite} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
