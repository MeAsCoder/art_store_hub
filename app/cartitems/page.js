"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { useCart } from '@/app/context/CartContext';
import { CheckIcon } from '@heroicons/react/24/solid'; // Import from the correct path for Heroicons v2
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faTruck, faTags, faLeaf } from '@fortawesome/free-solid-svg-icons'; 


 


const Cart = () => {

 // Use the Cart context
 const { removeFromCart, cart, updateQuantity  } = useCart(); // Destructure addToCart from CartContext
  const [subtotal, setSubtotal] = useState(0);
  const [shippingEstimate, setShippingEstimate] = useState(0);
  const [taxEstimate, setTaxEstimate] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const router = useRouter();

  const [loading, setLoading] = useState(true);

   // Simulating a loading delay based on cart length
   useEffect(() => {
    if (cart.length > 0) {
      setLoading(false);
    } else {
      setLoading(true); // Reset loading if cart is empty
    }
  }, [cart]);

  // Calculate financial estimates when the cart changes
  useEffect(() => {
    if (!loading) {
      const newSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
      setSubtotal(newSubtotal);

      const newShippingEstimate = newSubtotal * 0.05;
      setShippingEstimate(newShippingEstimate);

      const newTaxEstimate = newSubtotal * 0.16;
      setTaxEstimate(newTaxEstimate);

      const newOrderTotal = newSubtotal + newShippingEstimate + newTaxEstimate;
      setOrderTotal(newOrderTotal);
    }
  }, [cart, loading]); // Add loading as a dependency

  if (loading) {
    return <p>Loading...</p>; // Placeholder or loading state
  }

  
  return (
    <div className="container row ml-8">
    <h1 className="text-4xl font-bold text-left" style={{ marginTop: '50px', marginBottom: '50px',marginLeft: '10px' }} >Shopping Cart</h1>

    <div className="container mx-auto flex flex-col md:flex-row">
      {/* Cart Items */}
      <div className="md:w-1/2 md:pr-4 bg-neutral-100 rounded-lg">
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.id} className="flex items-center border-b pb-4 mb-4">
              <img
                src={item.productImageUrl}
                alt={item.name}
                className="w-24 h-24 object-cover mr-4"
              />
              <div className="flex-grow">
                <h3 className="font-semibold">{item.name}</h3>
                <p>{item.color}</p>
                <p>{item.size}</p>
                <p className="font-bold">${item.price.toFixed(2)}</p>

                  {/* "In stock" with tick icon */}
                  <div className="flex items-center text-green-600 mt-10">
                    <CheckIcon className="h-5 w-5 mr-1" /> {/* Tick mark icon */}
                    <span>In stock</span>
                  </div>
              </div>

               {/* Quantity Update Section */}
        <div className="flex items-center space-x-2 mr-20">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)} // Decrement quantity
            className="px-2 py-1 bg-gray-200 rounded"
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)} // Increment quantity
            className="px-2 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-xl"
              >
                ✖
              </button>
            </div>
          ))
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      {/* Order Summary */}
      <div className="md:w-1/3 mt-8 md:mt-0 ml-5">
        <div className="shadow-md rounded-lg p-6 bg-neutral-200">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Shipping estimate</span>
            <span>
              <a href="#" className="text-blue-500 text-sm underline">
                Learn more about how shipping is calculated
              </a>
            </span>
            <span>${shippingEstimate.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Tax estimate</span>
            <span>
              <a href="#" className="text-blue-500 text-sm underline">
                Learn more about how tax is calculated
              </a>
            </span>
            <span>${taxEstimate.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-lg mb-4">
            <span>Order total</span>
            <span>${orderTotal.toFixed(2)}</span>
          </div>

          <button className="w-full bg-rose-400 text-white py-2 rounded-lg hover:bg-rose-200"
                  onClick={() => router.push('/checkout')}
                  >
            
            Checkout
            
          </button>
        </div>
      </div>
    </div>




   {/* Additional Features Section */}
   <article className="bg-neutral-100 mt-10 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Additional Features</h2>
        <div className="flex space-x-4">
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faRotateLeft} className="text-2xl mb-2 text-rose-400" />
            <h3 className="font-semibold">Free returns</h3>
            <p>Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.</p>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faTruck} className="text-2xl mb-2 text-rose-400" />
            <h3 className="font-semibold">Same day delivery</h3>
            <p>We offer a delivery service that has never been done before. Checkout today and receive your products within hours.</p>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faTags} className="text-2xl mb-2 text-rose-400" />
            <h3 className="font-semibold">All year discount</h3>
            <p>Looking for a deal? You can use the code &quot;ALLYEAR&quot; at checkout and get money off all year round.</p>
          </div>
          <div className="flex flex-col items-center">
            <FontAwesomeIcon icon={faLeaf} className="text-2xl mb-2 text-rose-400" />
            <h3 className="font-semibold">For the planet</h3>
            <p>We&apos;ve pledged 1% of sales to the preservation and restoration of the natural environment.</p>
          </div>
        </div>
      </article>










  </div>
  );
};

export default Cart;
