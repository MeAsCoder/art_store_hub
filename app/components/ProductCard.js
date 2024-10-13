"use client";
import { useState } from "react";
import Toast from "./Toast"; // Import the Toast component
import Link from "next/link";
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown as faThumbsDownSolid } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as faThumbsDownRegular } from '@fortawesome/free-regular-svg-icons';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const { addToCart } = useCart(); // Get addToCart from context
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setToastMessage(`Added ${quantity} of ${product.name} to cart.`);
  };

  const handleLike = () => {
    setLiked(true);
    setDisliked(false); // Dislike is automatically canceled
  };

  const handleDislike = () => {
    setDisliked(true);
    setLiked(false); // Like is automatically canceled
  };

  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg w-full max-w-xs transition-transform duration-300 transform hover:scale-105 hover:translate-y-1">
      <img
        src={product.productImageUrl}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-110" // Zoom effect on image
      />
      <div className="bg-white p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-black text-sm  cursor-pointer hover:text-rose-300">{product.name}</h3>
          <p className="text-black mt-3 font-bold">${product.price.toFixed(2)}</p>
          <p className="text-black mt-3">Delivery: In {product.deliveryTimeSpan}</p>
        </Link>
        <div className="flex items-center mt-2">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-14 p-0.2 text-center rounded border border-black bg-white"
            min="1"
          />
          <button
            onClick={handleAddToCart}
            className="ml-2 bg-rose-400 text-sm text-white px-2 py-1 rounded hover:bg-rose-200 transition-colors"
          >
            Add to Cart
          </button>
        </div>
        <div className="flex items-center mt-2">
          <button onClick={handleLike} className="mr-2">
            <FontAwesomeIcon
              icon={liked ? faHeartSolid : faHeartRegular}
              className={`text-black-500 ${liked ? 'text-blue-400' : 'text-gray-400'}`}
            />
          </button>
          <button onClick={handleDislike}>
            <FontAwesomeIcon
              icon={disliked ? faThumbsDownSolid : faThumbsDownRegular}
              className={`text-black-500 ${disliked ? 'text-red-600' : 'text-gray-400'}`}
            />
          </button>
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
