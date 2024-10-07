// Home.js
"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import { FaCheckCircle, FaHeadset,FaRegLightbulb,FaListUl, FaTag,FaChevronRight,FaBolt,FaFlash } from 'react-icons/fa';
import Link from 'next/link';


export default function Home() {
  const [products, setProducts] = useState([]); // Initialize state as an empty array
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null); // To track which category is being hovered
  const [hoveredproducts, setHoveredProducts] = useState([]);


  useEffect(() => {
    // Fetch data from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/allProducts");
        const data = await response.json();
        setProducts(data); // Set the fetched products array to state
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/allCategories');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data); // Set fetched categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this effect runs once on mount



  const fetchProducts = async (categoryId) => {
    try {
      const response = await fetch(`https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/category/${categoryId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setHoveredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleMouseEnter = (category) => {
    setHoveredCategory(category.categoryId);
    fetchProducts(category.categoryId);
  };

  // Handle mouse leave to hide the products panel
  const handleMouseLeave = () => {
    setHoveredCategory(null); // Reset the hovered category
  };




  return (
    <div>
     <div className="mt-10"></div>     

      
      <div className="flex h-screen">
 

  {/* Left Sidebar */}
  <div className="w-1/4 bg-slate-600 text-white p-4" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <div className="flex items-center mb-4 sticky top-0 bg-rose-300">
          <FaListUl className="mr-2" />
          <h2 className="text-xl font-bold">Category</h2>
        </div>
        <nav>
          <ul className="text-sm z-100">
            {categories.length > 0 ? (
              categories.map((category) => (
                <li
                  key={category.categoryId}
                  className="relative mb-2"
                  onMouseEnter={() => handleMouseEnter(category)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href={`/product_category/${category.categoryId}?name=${encodeURIComponent(category.categoryName)}`} className="block py-2 hover:bg-slate-500 flex items-center">
                    <FaListUl className="mr-2" />
                    {category.categoryName}
                    <FaChevronRight className="ml-auto" />
                  </a>

                  {/* Submenu Panel for Products */}
                  {hoveredCategory === category.categoryId && products.length > 0 && (
                    <div
                    className="absolute top-0 left-full w-64 bg-slate-700 text-white p-4 shadow-lg z-50"
                    style={{ minHeight: '200px', transform: 'translateY(-100%)', right: '-10px' }} 
                    >
                      <h3 className="text-lg mb-2">Products</h3>
                      <ul>
                        {hoveredproducts.map((product) => (
                          <li key={product.id} className="flex items-center mb-2">
                            <img
                              src={product.productImageUrl}
                              alt={product.productName}
                              className="w-12 h-12 object-cover mr-2"
                            />
                            <span>{product.productName}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li>Loading categories...</li>
            )}
          </ul>
        </nav>
      </div>


  {/* Right Content with Carousel */}
  <div className="w-3/4 bg-white ml-5 ">
    {/* Headings */}
    <div className="flex text-center">
  <Link href="/" className="text-l mr-20 font-bold hover:text-rose-500">
    <h2>What&apos;s New</h2>
  </Link>
  <Link href="/" className="text-l text-black font-bold hover:text-rose-500">
    <h3>Flash Sale</h3>
  </Link>
</div>

    {/* Carousel */}
    <div className="z-0">
      <Carousel>
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            <img
              src={product.productImageUrl} 
              alt={product.productName} 
              style={{ width: "100%", height: "400px", objectFit: "cover" }} 
            />
            <Carousel.Caption>
              <h3>{product.productName}</h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
   

   
  </div>
</div>


      <article className="text-gray-700 mt-0 mx-4 p-6 bg-gray-100 rounded-lg shadow-lg">
  <h2 className="text-2xl font-semibold text-rose-400 mb-4 text-center">Discover Our Best-Selling Art</h2>
  <p className="text-lg leading-relaxed italic text-center">
    Discover a curated collection of our best-selling art pieces, each crafted with meticulous attention to detail. 
    Our selection features high-quality, aesthetically pleasing artworks that are perfect for enhancing the ambiance of any space. 
    Whether you&apos;re looking to brighten up your living room, create a serene atmosphere in your bedroom, or find that perfect statement piece for your office, 
    we have something that will resonate with your unique style. Explore our diverse range of artistic expressions and let your walls tell a story. 
    Each piece is not just art; it&apos;s an experience waiting to be brought into your home.
  </p>
</article>



        <article className="bg-gray-100 mr-5 ml-5">

  {/* Flash Sale Section */}
  <div className="flex items-center justify-between p-4 bg-white mb-4">
    <div className="flex items-center">
      {/* Icon in a round background */}
      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-400 mr-2">
        <FaBolt className="text-sm text-white" /> {/* Flash Sale Icon */}
      </div>
      <h2 className="text-xl font-bold mr-4">Flash Sale</h2>
      <div className="flex items-start">
        <p className="text-lg mr-5">Ends in</p>
        <span className="text-lg font-bold">
          <span className="text-rose-400">00</span>
          <span className="text-black">:</span>
          <span className="text-rose-400">00</span>
          <span className="text-black">:</span>
          <span className="text-rose-400">00</span>
        </span> {/* Countdown Timer */}
      </div>
    </div>
  </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>Loading products...</p>
        )}
      </div>
      </article>

      <div 
        className="bg-fixed bg-center bg-cover h-[calc(100vh-4rem)] overflow-y-auto flex items-center justify-center text-white py-10"  
        style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/5/5c/Kenyan_oil_painting_01.jpg)' }}
      >
        {/* Optional content can go here */}
          <article>
        <div className="bg-black bg-opacity-50 p-6 rounded-md text-center">
          <h2 className="text-3xl font-bold mb-4 text-rose-200 mt-10">Why Choose Our Art?</h2>
          <p className="text-lg text-white mb-6 flex items-start">
          <FaRegLightbulb className="text-yellow-400 mr-1" />
            We specialize in high-quality oil hand paintings, crafted with care both locally and internationally. 
            Our artworks are tailored to suit your needs, ensuring that each piece resonates with your personal style. 
            Additionally, we take orders to customize art according to your specific preferences, making each 
            creation uniquely yours.
          </p>

          <h3 className="text-2xl font-semibold mb-4 text-rose-200 mt-10">Our Process</h3>
          <ol className="list-decimal list-inside mb-6">
            <li className="flex items-center mb-2">
             
              <FaCheckCircle className="text-green-400 mr-2" />
              <span>Collaborate with Professional Artists: We work with talented artists who pour their creativity and skill into every piece.</span>
            </li>
            <li className="flex items-center mb-2">
             
              <FaCheckCircle className="text-green-400 mr-2" />
              Select the Best Art: Our team curates a selection of artworks that meet our high standards of quality and originality.
            </li>
            <li className="flex items-center mb-2">
            <FaCheckCircle className="text-green-400 mr-2" />
              Customize to Your Liking: We tailor each artwork to meet your specific requirements and preferences, ensuring a perfect match for your space.
            </li>
            <li className="flex items-center mb-2">
            <FaCheckCircle className="text-green-400 mr-2" />
              Timely Delivery: We ensure that your chosen artwork is delivered to you safely and on time.
            </li>
          </ol>

          <p className="text-lg text-white mb-6 flex items-start">
          <FaRegLightbulb className="text-yellow-400 mr-2" />
            Our commitment to quality doesn&apos;t end with the selection process. We provide ongoing support to ensure that you are satisfied 
            with your purchase, and we are always available to assist you with any customizations or questions you may have.
          </p>

          <button className="bg-rose-400 text-white py-2 px-4 rounded hover:bg-rose-500 transition duration-300 mt-10">
            Order a Customized Art
          </button>
        </div>
        </article>


      </div>


    </div>
  );
}
