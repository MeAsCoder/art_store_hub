"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useCart } from '../../context/CartContext';



const CategoryDetails = ({ params }) => {
  const router = useRouter();
  const { id } = params; // Get the category ID from the URL
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  // Use the Cart context
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
          const response = await fetch(`https://localhost:9937/api/product/category/${id}`);
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

  const handleAddToCart = (product) => {
    addToCart(product, 1); // Call addToCart from context, you can adjust the quantity as needed
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
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-lg transition-transform duration-300 transform hover:scale-110"
                />
                <h2 className="text-lg font-semibold mt-4">{product.productName}</h2>
                <p className="text-gray-600 mt-2">Price: ${product.productPrice}</p>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="mt-4 bg-rose-500 text-white py-2 px-4 rounded hover:bg-rose-600 transition duration-300"
                >
                  Add to Cart
                </button>
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
