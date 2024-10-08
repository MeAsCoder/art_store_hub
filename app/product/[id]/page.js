// app/product/[id]/page.js

'use client'; // This makes the component a Client Component
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Breadcrumb from '@/app/components/Breadcrumb';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import Footer from '@/app/components/Footer';
import Toast from '@/app/components/Toast';
import { useCart } from '@/app/context/CartContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination, Autoplay]);

// Function to fetch product details
const fetchProductDetails = async (id) => {
  const res = await fetch(`https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch product details');
  }
  return res.json();
};

const fetchMostPurchasedProducts = async () => {
  const res = await fetch('https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/allProducts'); // Adjust this endpoint for most purchased
  if (!res.ok) {
    throw new Error('Failed to fetch most purchased products');
  }
  return res.json();
};

const ProductDetails = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [toastMessage, setToastMessage] = useState('');
  const { addToCart } = useCart();
  const [mostPurchasedProducts, setMostPurchasedProducts] = useState([]);

  // Fetch product details
  useEffect(() => {
    if (id) {
      const fetchProductDetailsById = async () => {
        try {
          const productDetails = await fetchProductDetails(id);
          setProduct(productDetails);
        } catch (error) {
          console.error('Error fetching product details:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchProductDetailsById();
    }
  }, [id]);

  // Fetch most purchased products
  useEffect(() => {
    const fetchPopularProducts = async () => {
      try {
        const products = await fetchMostPurchasedProducts();
        setMostPurchasedProducts(products.slice(0, 5)); // Display only the first 5 products
      } catch (error) {
        console.error('Error fetching most purchased products:', error);
      }
    };
    fetchPopularProducts();
  }, []);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    console.log(`Added ${quantity} of ${product.name} to cart`);
    setToastMessage(`Added ${quantity} of ${product.name} to cart.`);
  };

  const handleToastClose = () => {
    setToastMessage('');
  };

  const chunkArray = (array, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const productChunks = chunkArray(mostPurchasedProducts, 4); // 4 products per slide

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <Breadcrumb productName={product.name} />

      <div className="container mx-auto mt-6 flex space-x-8">
        {/* Left Section: Image and Product Info */}
        <div className="w-2/3">
          <div className="relative group overflow-hidden rounded-lg shadow-lg">
            <img
              src={product.productImageUrl}
              alt={product.name}
              className="w-full h-80 object-cover transition-transform duration-300 transform group-hover:scale-110"
            />
            <div className="relative mt-4">
              <div className="p-4 bg-white rounded-lg shadow-lg">
                <Link href={`/product/${product.id}`}>
                  <h3 className="text-rose-400 text-lg font-bold cursor-pointer hover:underline">{product.name}</h3>
                  <p className="text-rose-400">${product.price.toFixed(2)}</p>
                </Link>
                <div className="flex items-center mt-2">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="w-16 p-1 text-center rounded border border-rose-400"
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
          </div>
        </div>

        {/* Right Section: Artwork Details Card */}
        <div className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Artwork Details</h2>
          <ul className="space-y-2">
            <li><strong>Material:</strong> {product.materialUsed || "Canvas, Acrylic Paint"}</li>
            <li><strong>Date Created:</strong> {product.dateCreated || "June 2023"}</li>
            <li><strong>Mounting Steps:</strong> {product.mountingSteps || "Use screws and anchors for wall mounting"}</li>
            <li><strong>Recommended Placement:</strong> {product.recommendations || "Living room, Bedroom, Office"}</li>
          </ul>
          <div className="mt-6">
            <h3 className="font-semibold text-gray-700">Recommendations</h3>
            <p className="text-sm text-gray-600 mt-2">
              Ideal for enhancing the aesthetics of living rooms, bedrooms, or even office spaces.
            </p>
          </div>
        </div>
      </div>

      {/* Most Purchased Products Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-rose-300 text-center">Most Purchased Products</h2>

        {mostPurchasedProducts.length > 0 ? (
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            navigation={{ clickable: true }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            loop={true}
          >
            {productChunks.map((chunk, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-4 gap-6">
                  {chunk.map((product) => (
                    <div key={product.id} className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg transition-shadow">
                      <div className="h-48 bg-gray-200 rounded mb-4">
                        <img
                          src={product.productImageUrl}
                          alt={product.productName}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.productName}</h3>
                      <p className="text-rose-400">${product.price.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p className="text-center text-gray-500">No products available at the moment.</p>
        )}
      </div>

      {/* Carousel Section with Background */}
      <div className="relative mt-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("https://i.ebayimg.com/images/g/jLgAAOSw6Ptl95ow/s-l960.jpg")',
            height: '100%',
            width: '100%',
            zIndex: 1,
          }}
        ></div>

        <div className="relative z-10 container mx-auto py-20">
          <article className="bg-white bg-opacity-75 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold mb-6 text-rose-400">What Our Customers Say</h2>

            <div className="h-72 bg-transparent">
              <Carousel
                autoPlay
                infiniteLoop
                showThumbs={false}
                showStatus={false}
                showArrows={true}
                interval={5000}
                className="text-gray-700 h-70"
              >
                {[
                  { quote: "I recently purchased a beautiful piece of art, and it has transformed my living room! The colors are vibrant and the quality is amazing.", name: "John, Kilimani" },
                  { quote: "My bedroom looks so much more lively now with this artwork. The product arrived on time and in perfect condition.", name: "Emily, Nairobi" },
                  { quote: "Absolutely stunning artwork! It added the perfect touch of elegance to my office.", name: "Sarah, Westlands" }
                ].map((testimonial, index) => (
                  <div key={index} className="text-center">
                    <p className="italic text-gray-600">{testimonial.quote}</p>
                    <p className="font-bold mt-4">{testimonial.name}</p>
                  </div>
                ))}
              </Carousel>
            </div>
          </article>
        </div>
      </div>

      <Footer />

      {toastMessage && <Toast message={toastMessage} onClose={handleToastClose} />}
    </div>
  );
};

export default ProductDetails;
