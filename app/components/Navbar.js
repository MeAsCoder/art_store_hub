
"use client"; 
import Link from 'next/link'; 
import { useState, useEffect } from 'react'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faUser, faCartPlus, faSearch, faBars, faTimes, faClose } from '@fortawesome/free-solid-svg-icons'; 
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'; 
import { useCart } from '../context/CartContext'; 
import { useRouter } from 'next/navigation'; 
import Image from 'next/image';


const Navbar = () => { 
  const [isSearchVisible, setIsSearchVisible] = useState(false); 
  const { cartCount, cart } = useCart(); 
  const [isCartHovered, setIsCartHovered] = useState(false); 
  const [categories, setCategories] = useState([]); 
  const [isCategoriesHovered, setIsCategoriesHovered] = useState(false); 
  const [searchQuery, setSearchQuery] = useState(''); 
  const [filteredProducts, setFilteredProducts] = useState([]); 
  const [products, setProducts] = useState([]); 
  const [isMounted, setIsMounted] = useState(false); 
  const router = useRouter(); 
  const [isSearching, setIsSearching] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [isDesktop, setIsDesktop] = useState(true); // Track if the screen is in desktop mode 
  const [navbar, setNavbar] = useState(false);

  useEffect(() => { 
    const handleResize = () => { 
      setIsDesktop(window.innerWidth >= 1024); // Change 1024 to your breakpoint for desktop 
    }; 
    handleResize(); // Set initial state based on current width 
    window.addEventListener('resize', handleResize); // Add event listener for resizing 
    return () => { 
      window.removeEventListener('resize', handleResize); // Cleanup on unmount 
    }; 
  }, []); 

  useEffect(() => { 
    setIsMounted(true); 
  }, []); 

  // Fetch categories on component mount 
  useEffect(() => { 
    const fetchCategories = async () => { 
      try { 
        const response = await fetch('https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/allCategories'); 
        if (!response.ok) { 
          throw new Error('Network response was not ok'); 
        } 
        const data = await response.json(); 
        setCategories(data); 
      } catch (error) { 
        console.error('Error fetching categories:', error); 
      } 
    }; 
    fetchCategories(); 
  }, []); 

  useEffect(() => { 
    // Fetch data from the API 
    const fetchProducts = async () => { 
      try { 
        const response = await fetch("https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/allProducts"); 
        const data = await response.json(); 
        setProducts(data); 
      } catch (error) { 
        console.error("Error fetching product data:", error); 
      } 
    }; 
    fetchProducts(); 
  }, []); 

  const handleSearchInputChange = async (e) => { 
    const query = e.target.value.toLowerCase(); 
    setSearchQuery(query); 
    if (query === '') { 
      setFilteredProducts([]); 
      return; 
    } 
    const filtered = products.filter(product => 
      product.productName.toLowerCase().includes(query) 
    ); 
    setFilteredProducts(filtered); 
    setIsSearching(true); 
  }; 

  const toggleSearch = () => { 
    setIsSearchVisible(!isSearchVisible); 
    setSearchQuery(''); 
    setFilteredProducts([]); 
  }; 

  const handleProductClick = (productId) => { 
    setIsSearchVisible(false); 
    router.push(`/product/${productId}`); 
  }; 

  const toggleMobileMenu = () => { 
    setIsMobileMenuOpen(!isMobileMenuOpen); 
  }; 

  return ( 
    <> 
      {/* Desktop Navbar */} 
      <div className="navbar bg-slate-500 text-black flex justify-between"> 
        <div>
          <div className="flex items-center justify-between py-3 md:py-5 md:block">

            <div className="text-rose-400"> 
              <Link href="/" className="btn btn-ghost normal-case text-xl "> 
                <FontAwesomeIcon icon={faShoppingCart} /> 
                 ArtGalleryHub 
              </Link> 
            </div> 

          {/* HAMBURGER BUTTON FOR MOBILE */}
            <div className="md:hidden absolute top-0 right-0 m-4">
              <button
                className="p-8 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}
              >
                {navbar ? (
                  <FontAwesomeIcon icon={faClose} size="lg" />
                ) : (
                  <FontAwesomeIcon icon={faBars} size="lg" />
                )}
              </button>
            </div>



          </div>
        </div>
        <div>

        <div className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? 'p-12 md:p-0 block' : 'hidden'
                  }`}> 
          <ul className="h-screen md:h-auto items-center justify-center md:flex "> 
            
           
            <li className="pb-4 text-xs text-white py-2 md:px-4 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent"><Link href="/categories_shop">SHOP BY CATEGORY</Link></li> 
            <li className="pb-4 text-xs text-white py-2 md:px-4 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent"> 
              {isMounted && ( 
                <Link 
                  href="/cartitems" 
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-400 hover:bg-rose-400 transition duration-200 p-2 ml-4" 
                  onMouseEnter={() => setIsCartHovered(true)} 
                  onMouseLeave={() => setIsCartHovered(false)} 
                > 
                  <FontAwesomeIcon icon={faCartPlus} className="text-white" /> 
                  {typeof window !== 'undefined' && cartCount > 0 ? ( 
                    <span className="ml-1 text-white text-sm bg-gray-700 rounded-full w-4 h-4 flex items-center justify-center"> 
                      {cartCount} 
                    </span> 
                  ):
                  isCartHovered &&  (
                    <span className="absolute bg-white text-black p-2 rounded shadow-lg text-xs mt-8">
                      Cart is empty
                    </span>
                  )                
                  } 
                </Link> 
              )} 
                      {isCartHovered && cart.length > 0 && ( 
                  <div className="absolute bg-white text-black shadow-lg rounded p-4 mt-12 z-50 mr-10 w-96 max-w-xl"> 
                    <h3 className="font-semibold text-lg mb-4">Cart Items</h3> 
                    <ul> 
                      {cart.map(item => ( 
                        <li key={item.id} className="flex items-center justify-between mb-4"> 
                          <div className="w-24"> 
                            
                            <img src={item.productImageUrl} alt={item.productName} className="w-16 h-16 object-cover rounded" /> 
                          </div> 
                          <div className="w-32 text-sm"> 
                            <p>{item.productName}</p> 
                          </div> 
                          <div className="w-12 text-sm text-center"> 
                            <p>Qty: {item.quantity}</p> 
                          </div> 
                          <div className="w-16 text-sm text-right"> 
                            <p>${item.price}</p> 
                          </div> 
                          <div className="w-20 text-sm text-right font-semibold"> 
                            <p>${(item.price * item.quantity).toFixed(2)}</p> 
                          </div> 
                        </li> 
                      ))} 
                    </ul> 
                  </div> 
                )}


            </li> 
            <li className="pb-4 text-xs text-white py-2 md:px-2 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent"> 
              <button 
                onClick={toggleSearch} 
                className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-400 hover:bg-rose-200 transition duration-200 p-2 ml-4" 
              > 
                <FontAwesomeIcon icon={faSearch} className="text-white" /> 
              </button> 
            </li> 
            <li className="pb-4 text-xs text-white py-2 md:px-2 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent"> 
              <Link 
                href="/login" 
                className="flex items-center justify-center w-8 h-8 rounded-full bg-rose-400 hover:bg-rose-300 transition duration-200 p-2 ml-4" 
              > 
                <FontAwesomeIcon icon={faUser} className="text-white" /> 
              </Link> 
            </li> 
            <li className="pb-4 text-xs text-white py-2 md:px-2 text-center border-b-2 md:border-b-0  hover:bg-purple-900  border-purple-900  md:hover:text-purple-600 md:hover:bg-transparent"> 
              <Link 
                href="/register" 
                className="inline-block px-4 py-1 text-white bg-rose-400 rounded hover:bg-rose-300 transition duration-200 ml-2" 
              > 
                SIGN UP 
              </Link> 
            </li> 
          </ul> 
        </div>
        </div>
      
      </div> 
       
       
          {/* Search bar */}
{isSearchVisible && (
  <div className="bg-white text-black p-4">
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearchInputChange}
      placeholder="I am Looking For..."
      className="input input-bordered w-full"
    />
    
    {isSearching && (
  <ul className="search-results">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => (
        <li
          key={product.id}
          onClick={() => handleProductClick(product.id)}
          className="cursor-pointer"
        >
          {product.productName}
        </li>
      ))
    ) : (
      searchQuery && (
        <li className="text-red-500">
          No product filtered, try another keyword
        </li>
      )
    )}
  </ul>
)}


  </div>
)}


    </> 

  



  ); 
}; 

export default Navbar;


































