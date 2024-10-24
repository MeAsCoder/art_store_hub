// Home.js
"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Carousel from "./components/Carousel";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import { FaCheckCircle, FaHeadset,FaRegLightbulb,FaListUl, FaTag,FaChevronRight,FaBolt,FaFlash } from 'react-icons/fa';
import Link from 'next/link';
import FeaturedCategories from "./components/FeaturedCategories";
import NewArrivals from "./components/NewArrivals";
import BestSellers from "./components/BestSellers";
import ArtistSpotlight from "./components/ArtistSportlight";
import Testimonials from "./components/Testimonials";
import BlogSection from "./components/BlogPost";
import NewsletterSignUp from "./components/NewsLetterSignUp";   
import WhyChooseUs from "./components/WhyChooseUs";


export default function Home() {
  const [products, setProducts] = useState([]); // Initialize state as an empty array
  const [categories, setCategories] = useState([]);
  const [hoveredCategory, setHoveredCategory] = useState(null); // To track which category is being hovered
  const [hoveredproducts, setHoveredProducts] = useState([]);


  const [timeLeft, setTimeLeft] = useState({
    days: 10,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

   
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


    
   // Countdown Timer logic
useEffect(() => {
  const flashSaleStartDate = new Date(); // Example start date, adjust as necessary
  const flashSaleDurationDays = 10; // Example duration, adjust as necessary

  const targetDate = new Date(flashSaleStartDate);
  targetDate.setDate(targetDate.getDate() + flashSaleDurationDays);

  const updateTimer = () => {
    const currentTime = new Date();
    const difference = targetDate - currentTime;

    console.log('Current Time:', currentTime);
    console.log('Target Date:', targetDate);
    console.log('Difference in milliseconds:', difference);

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      console.log(`Time Left - Days: ${days}, Hours: ${hours}, Minutes: ${minutes}, Seconds: ${seconds}`); // Log remaining time

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
      });
    } else {
      setTimeLeft({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
    }
  };

  const timer = setInterval(updateTimer, 1000); // Update the timer every second

  return () => clearInterval(timer); // Cleanup the interval on component unmount
}, []);


const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
const newProducts = products.filter(product => product.createdDate === today);



  return (
    <div className="m-4">
     <div className="mt-10"></div>     

      
      <div className="flex">



        <div></div>
 

        {/* Left Sidebar */}
        <div className="w-1/4 bg-slate-600 text-white p-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
              
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
          

            {/* Carousel */}
            <div className="z-0">
            <div className="flex items-center mb-4">
              <Link href="#">
              <h1 className=" text-black mr-5  font-bold hover:text-rose-500"> What&apos;s New</h1>
              </Link>
              <Link href="#">
              <h1 className=" text-black font-bold hover:text-rose-500">Flash Sale </h1>

              </Link>
  
              </div>
              <Carousel>
                {products.map((product) => (
                  <Carousel.Item key={product.id}>
                    <img
                      src={product.productImageUrl} 
                      alt={product.productName} 
                      className="w-full h-48 object-contain" 
                     
                    />
                    <Carousel.Caption className = "p-0">
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
  <p className="text-sm leading-relaxed">
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
        <span className="text-rose-400">{String(timeLeft.days).padStart(2, '0')}</span>
        <span className="text-black"> days </span>
        <span className="text-rose-400">{String(timeLeft.hours).padStart(2, '0')}</span>
        <span className="text-black"> hours </span>
        <span className="text-rose-400">{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span className="text-black"> minutes </span>
        <span className="text-rose-400">{String(timeLeft.seconds).padStart(2, '0')}</span>
        <span className="text-black"> seconds</span>
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


      <FeaturedCategories categories={categories}/>
      <NewArrivals products ={newProducts} />
      <BestSellers />
      <WhyChooseUs/>
      <Testimonials />
      <NewsletterSignUp />


    </div>
  );
}
