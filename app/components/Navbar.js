"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCartPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

//import useCart from '../context/CartContext';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';



const Navbar = () => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const { cartCount, cart } = useCart();
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [categories, setCategories] = useState([]); // State to hold categories
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false); // Hover state for categories
  const [searchQuery, setSearchQuery] = useState(''); // Store the search query
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [isSearching, setIsSearching] = useState(false);



  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://localhost:9937/api/product/allCategories');
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

  
 


  useEffect(() => {
    // Fetch data from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://localhost:9937/api/product/allProducts");
        const data = await response.json();
        setProducts(data); // Set the fetched products array to state
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProducts();
  }, []);


  // Handle search input change
  const handleSearchInputChange = async (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    

    if (query === '') {
      setFilteredProducts([]);
     
      return;
    }

    // Fetch products and filter based on query
    // const products = await fetchProducts();
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(query)
    );

    setFilteredProducts(filtered);
    setIsSearching(true); 
  };


  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
    console.log("Filterred Products: ",filteredProducts)
    setSearchQuery(''); // Clear search query when toggling
    setFilteredProducts([]); // Clear filtered products when toggling
  };


  const handleProductClick = (productId) => {
    setIsSearchVisible(false); // Hide the search bar
    router.push(`/product/${productId}`); // Navigate to the selected product
  };

  return (
    <>

      <div className="navbar bg-slate-500 text-black flex justify-between">
      <div className="text-rose-400">
          <Link href="/" className="btn btn-ghost normal-case text-xl ">
          <FontAwesomeIcon icon={faShoppingCart} /> {/* Added cart icon */}
            ArtGalleryHub
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            {/* Dropdown with hover handling */}
            <li 
              className="dropdown"
              onMouseEnter={() => setIsCategoriesHovered(true)}
              onMouseLeave={() => setIsCategoriesHovered(false)}
            >
              <Link href="/categories_shop" className="dropdown-toggle">
                CATEGORIES
              </Link>
              {isCategoriesHovered && (
                <ul className="dropdown-menu absolute bg-white text-black shadow-lg rounded p-2 z-50 w-64">
                  {categories.map((category) => (
                    <li key={category.categoryId}>
                      <Link 
                        href={`/product_category/${category.categoryId}?name=${encodeURIComponent(category.categoryName)}`} 
                      >
                        {category.categoryName}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>

           
            <li>
              <Link href="/contacts">CONTACT US</Link>
            </li>
            <li>
              <Link href="/about">ABOUT US</Link>
            </li>
            <li>
              <Link href="/categories_shop">SHOP BY CATEGORY</Link>
            </li>
           

            <li>
              {isMounted &&(
              <Link
                href="/cartitems"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-400 hover:bg-rose-400 transition duration-200 p-2 ml-4"
                onMouseEnter={() => setIsCartHovered(true)}
                onMouseLeave={() => setIsCartHovered(false)}
              >
                <FontAwesomeIcon icon={faCartPlus} className="text-white" />
                {typeof window !== 'undefined' && cartCount > 0 && (
                  <span className="ml-1 text-white text-sm bg-gray-700 rounded-full w-4 h-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              )}
              {isCartHovered && cart.length > 0 && (
                <div className="absolute bg-white text-black shadow-lg rounded p-4 mt-12 z-50 mr-10 w-64 max-w-l">
                  <h3 className="font-semibold">Cart Items:</h3>
                  <ul>
                    {cart.map(item => (
                      <li key={item.id} className="flex items-center justify-between mb-2 mr-0">
                        <img src={item.productImageUrl} alt={item.productName} className="w-12 h-12 object-cover rounded" />
                        <div className="ml-2">
                          <p className="text-sm">{item.productName}</p>
                          <p className="text-xs">Qty: {item.quantity}</p>
                          <p className="text-xs word-break">Subtotal: ${item.price * item.quantity}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>

            <li>
              <button
                onClick={toggleSearch}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-400 hover:bg-rose-200 transition duration-200 p-2 ml-4"
              >
                <FontAwesomeIcon icon={faSearch} className="text-white" />
              </button>
            </li>


            <li>
              <Link
                href="/login"
                className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-400 hover:bg-rose-300 transition duration-200 p-2 ml-4"
              >
                <FontAwesomeIcon icon={faUser} className="text-white" />
              </Link>
            </li>
            <li>
              <Link
                href="/register"
                className="inline-block px-4 py-2 text-white bg-rose-400 rounded hover:bg-rose-300 transition duration-200 ml-4"
              >
                REGISTER
              </Link>
            </li>
          </ul>
        </div>
      </div>

     {/* Search Section */}

     {isSearchVisible && (
        <div className="bg-gray-100 p-4 text-black shadow-lg rounded mt-4 mx-4">
          <div className='flex'>
          <input
            type="text"
            placeholder="I am looking for..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="px-4 py-2 border border-gray-300 rounded-l w-full"
          />
           <button className="px-4 py-2 bg-rose-400 border border-rose-400 rounded-r hover:bg-rose-300">
    
           <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m1.95-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" />
            </svg>
            </button>
        </div>

          {filteredProducts.length > 0 ? (
            <ul className="bg-white text-black shadow-lg rounded p-2 mt-2 w-full">
              {filteredProducts.map((product) => (
                <li 
                key={product.productId} 
                className="p-2 border-b hover:bg-gray-200"
                onClick={() => {
                  setIsSearchVisible(false); // Hide the search bar
                  router.push(`/product/${product.id}`); // Programmatically navigate to the product page
                  }}
                >
                
                <span>{product.name}</span> {/* Use span instead of Link */}
               
                </li>
              ))}
            </ul>
          ):
          (
            // Display message when no match is found
            isSearching && <p className="text-gray-500 mt-2">No available match found, try another keyword</p>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
