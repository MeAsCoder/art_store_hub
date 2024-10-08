// ProductCard.js

/*

"use client";

import Link from "next/link";
import { useState } from "react";


const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart.`);
  };



  

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg rounded-sm">
      <img
        src={product.productImageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className=" bg-red-100 absolute inset-0 flex items-center justify-end transition-transform duration-300 transform translate-x-full group-hover:translate-x-0">
        <div className="p-4">
          <Link href={`/product/${product.id}`}>
          <h3 className="text-rose-400 text-lg font-bold cursor-pointer hover:underline">{product.name}</h3>
          <p className="text-rose-400">${product.price.toFixed(2)}</p>
          </Link>
          <div className="flex items-center mt-2">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-16 p-1 text-center rounded border border-rose-400 bg-rose-400"
              min="1"
            />
            <button
              onClick={handleAddToCart}
              className="ml-2 bg-rose-400 text-white px-3 py-1 rounded hover:bg-rose-200 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage("")} />}
    </div>
  
  );
};

export default ProductCard;

*/
// ProductCard.js




"use client"
import { useState } from "react";

import Toast from "./Toast"; // Import the Toast component
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
//import useCart from '../context/CartContext'; // Correcting this to match default export
import { useCart } from '../context/CartContext';



const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const { addToCart } = useCart(); // Get addToCart from context


  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToastMessage(`Added ${quantity} of ${product.name} to cart.`);
  };

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg rounded-sm">
      <img
        src={product.productImageUrl}
        alt={product.name}
        className="w-full h-48 object-cover"
      />
      <div className=" bg-red-100 absolute inset-0 flex items-center justify-end transition-transform duration-300 transform translate-x-full group-hover:translate-x-0">
        <div className="p-4">
          <a href={`/product/${product.id}`}>
          <h3 className="text-rose-400 text-lg font-bold cursor-pointer hover:underline">{product.name}</h3>
          <p className="text-rose-400">${product.price.toFixed(2)}</p>
          </a>
          <div className="flex items-center mt-2">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-16 p-1 text-center rounded border border-rose-400 bg-rose-400"
              min="1"
            />
            <button
              onClick={handleAddToCart}
              className="ml-2 bg-rose-400 text-white px-3 py-1 rounded hover:bg-rose-200 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Show Toast */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          duration={3000}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};

export default ProductCard;






