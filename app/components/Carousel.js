"use client";

import { useEffect, useState } from 'react';

const Carousel = () => {
  const [products, setProducts] = useState([]); // State to store product data
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true); // State to manage loading status

  useEffect(() => {
    // Fetch product data from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/allProducts");
        const data = await response.json();
        
        console.log("Fetched data:", data); // Debug: Log fetched data
        
        setProducts(data); // Store entire product data for further use
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Change slide automatically every 3 seconds
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % products.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [products]);

  const handleImageLoad = () => {
    setLoading(false); // Set loading to false when the image loads
  };

  return (
    <div className="carousel w-full h-96 mt-6">
      {products.length > 0 ? (
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {products.map((product, index) => (
            <div key={product.id} className="carousel-item relative w-full flex flex-col items-center">
              <img
                src={product.productImageUrl} // Use productImageUrl for the image
                className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'blur-sm' : 'blur-0'}`} // Apply blur effect
                alt={product.productName} // Use productName for alt text
                onLoad={handleImageLoad} // Set loading state to false on image load
                onError={() => setLoading(false)} // Handle error case to remove blur
              />
               <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center p-2">
                  {product.productName} {/* Display the product name */}
                </div>
              
               {/* Display product name */}
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <button
                  className="btn btn-circle"
                  onClick={() => setCurrentSlide((index - 1 + products.length) % products.length)}
                >
                  ❮
                </button>
                <button
                  className="btn btn-circle"
                  onClick={() => setCurrentSlide((index + 1) % products.length)}
                >
                  ❯
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default Carousel;
