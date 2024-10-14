"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CartContext = createContext();

export const useCart = () => {
  console.log("useCart called");
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  // Initialize cart with the value from localStorage if it exists, otherwise an empty array
  const [cart, setCart] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  });            
  
  const [cartCount, setCartCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem("cartItems");
      return storedCart ? JSON.parse(storedCart).length : 0;
    }
    return 0;
  });
  
  const [toastMessage, setToastMessage] = useState("");

  // Helper function to update localStorage when the cart changes
  const updateLocalStorage = (newCart) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("cartItems", JSON.stringify(newCart));
    }
  };

  const addToCart = (product, quantity) => {
    const existingProduct = cart.find((item) => item.id === product.id);
    const quantityToAdd = parseInt(quantity, 10);

    let updatedCart;
    if (existingProduct) {
      updatedCart = cart.map(item =>
        item.id === product.id
          ? { ...existingProduct, quantity: existingProduct.quantity + quantityToAdd }
          : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity }];
    }
    
    setCart(updatedCart);
    setCartCount(updatedCart.length);
    updateLocalStorage(updatedCart);  // Persist updated cart to localStorage

    // Display notification
    toast.success(`${quantity} of ${product.name} added to cart!`);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
    setCartCount(updatedCart.length);
    updateLocalStorage(updatedCart);  // Update localStorage

    toast.success(`Item removed from cart!`);
  };

  const updateQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCart(updatedCart);
    updateLocalStorage(updatedCart);  // Update localStorage

    toast.success(`Quantity updated!`);
  };

  const clearCart = () => {
    setCart([]); // Clear the cart
    setCartCount(0); // Reset the cart count
    updateLocalStorage([]); // Update localStorage
    toast.success("Cart cleared successfully!"); // Optional: Notify user
  };
  

  // Load the cart from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem("cartItems");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
        setCartCount(JSON.parse(storedCart).length);
      }
    }
  }, []);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity,clearCart,cartCount, toastMessage }}>
      {children}
      <ToastContainer /> {/* Toast Container for notifications */}
    </CartContext.Provider>
  );
};
