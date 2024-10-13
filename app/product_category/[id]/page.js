"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useCart } from '@/app/context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faThumbsDown as faThumbsDownSolid } from '@fortawesome/free-solid-svg-icons';
import { faThumbsDown as faThumbsDownRegular } from '@fortawesome/free-regular-svg-icons';




const CategoryDetails = ({ params }) => {
  const router = useRouter();
  const { id } = params; // Get the category ID from the URL
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [toastMessage, setToastMessage] = useState("");
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart(); // Destructure addToCart from CartContext

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    if (name) {
      setCategoryName(decodeURIComponent(name)); // Decode and set the category name
    }
  }, []); // Empty dependency array to run only on mount

  useEffect(() => {
    if (id) {
      // Fetch products for the selected category
      const fetchProductsByCategory = async () => {
        try {
          const response = await fetch(`https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/category/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProductsByCategory();
    }
  }, [id]);
/*
  const handleAddToCart = (product) => {
    addToCart(product, 1); // Call addToCart from context, you can adjust the quantity as needed
  };
  */

  const handleAddToCart = (product) => {
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
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-rose-400">{categoryName}</h1>

      {products.length > 0 ? (
        <Swiper spaceBetween={20} slidesPerView={3} className="swiper-container">
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <article className="p-4 bg-zinc-200 shadow rounded-lg transition-transform duration-300 hover:scale-105">
               
              <img
        src={product.productImageUrl}
        alt={product.name}
        className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-110" // Zoom effect on image
      />
      <div className="bg-white p-4">
       
          <h3 className="text-black text-sm  cursor-pointer hover:text-rose-300">{product.name}</h3>
          <p className="text-black mt-3 font-bold">${product.price.toFixed(2)}</p>
          <p className="text-black mt-3 font-bold">Delivery: In {product.deliveryTimeSpan}</p>
            
        <div className="flex items-center mt-2">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-14 p-0.2 text-center rounded border border-black bg-white"
            min="1"
          />
          <button
            onClick={() => handleAddToCart(product)}
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


              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">No products available for this category.</p>
      )}
    </div>
  );
};

export default CategoryDetails;
