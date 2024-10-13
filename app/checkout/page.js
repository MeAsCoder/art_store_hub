"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation'; 
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from '../components/PaymentForm'; // Import your PaymentForm component
import Select from 'react-select'; // Import react-select for dropdown
import { useMemo } from "react";
import countries from 'i18n-iso-countries'; // Import countries list
import 'i18n-iso-countries/langs/en.json'; // Import the English language data

// Register the locale for country names
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

const Checkout = () => {
    const { cart } = useCart();
    const [paymentMethod, setPaymentMethod] = useState("creditCard");
    const [loading, setLoading] = useState(true); // Set to true initially
    const router = useRouter();
    const stripePromise = loadStripe('pk_test_51Q9NrN01RRyMppsk3JJ1XGjoEfJhPKHWJu3gjhOun5VLr1yEl7WtnbX1qdZliblWlY2hCLXPhNPC55cyg8J370Is00Z4hlhP12');
    
    const countryOptions = useMemo(() => {
      // Load countries and format them for the dropdown
      return Object.entries(countries.getNames("en")).map(([code, name]) => ({
          value: code,
          label: (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img
                      src={`https://flagcdn.com/w20/${code.toLowerCase()}.png`} // Flag image URL
                      alt={name}
                      style={{ marginRight: '8px', width: '20px', height: 'auto' }}
                  />
                  {name}
              </div>
          ),
      }));
  }, []);

    useEffect(() => {
        // Simulating a loading delay
        if (cart.length > 0) {
            setLoading(false);
        }
    }, [cart]);

    if (loading) {
        return <p>Loading...</p>; // Placeholder or loading state
    }

    // Calculate subtotal and total based on cart items
    const calculateTotals = () => {
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const taxes = subtotal * 0.16;
        const shippingCost = subtotal * 0.05; // Fixed shipping cost, adjust as necessary
        const total = subtotal + shippingCost + taxes;
        return { subtotal, shippingCost, total, taxes };
    };

    const { subtotal, shippingCost, total, taxes } = calculateTotals();

    const handlePayment = async (paymentMethodId) => {
        const paymentData = {
            amount: total * 100, // Stripe uses the smallest currency unit (cents)
            currency: 'usd',
            paymentMethodId,
        };

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        });

        const data = await response.json();

        if (data.success) {
            // Handle successful payment
            console.log('Payment successful', data.paymentIntent);
            // Redirect or show success message
        } else {
            // Handle payment failure
            console.log('Payment failed', data.error);
        }
    };

    return (
        <div className="container mx-auto  my-8">
            <h1 className="text-3xl font-bold mb-6 m-2">Checkout</h1>
            <div className="flex">
                {/* Billing Address Section */}
                <div className="w-2/3 pr-4">
                    <section className="mb-6 bg-neutral-100 rounded-lg shadow-md max-w-xl m-5">
                        <h2 className="text-xl font-semibold mb-4">Billing Information</h2>
                        <form>
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="name">Name</label>
                                <input type="text" id="name" className="w-full border rounded p-2" required />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="email">Email</label>
                                <input type="email" id="email" className="w-full border rounded p-2" required />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="country">Country</label>
                                <Select
                                    id="country"
                                    options={countryOptions}
                                    placeholder="Select your country"
                                    className="react-select-container"
                                    classNamePrefix="react-select"
                                />
                            </div>
                           
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="city">City</label>
                                <input type="text" id="city" className="w-full border rounded p-2" required />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="address">Address</label>
                                <input type="text" id="address" className="w-full border rounded p-2" required />
                            </div>
                            <div className="mb-4">
                                <label className="block mb-2" htmlFor="zip">ZIP Code</label>
                                <input type="text" id="zip" className="w-full border rounded p-2" required />
                            </div>
                          
                        </form>
                    </section>
                </div>

                {/* Order Summary Section */}
                <div className="w-1/3">
                    <section className="bg-neutral-200 p-4 rounded-lg shadow-md mb-6">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <div key={item.id} className="flex justify-between mb-2">
                                    <span>{item.name} (x{item.quantity})</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))
                        ) : (
                            <p>Your cart is empty.</p>
                        )}
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Shipping</span>
                            <span>${shippingCost.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Taxes</span>
                            <span>${taxes.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2 font-bold">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </section>

                    {/* Payment Method */}
                    <section className="bg-neutral-100 p-4 rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                        <div className="flex mb-4">
                            <button
                                className={`flex-1 p-2 rounded ${paymentMethod === "creditCard" ? "bg-rose-400 text-white" : "bg-gray-200"} mr-2`}
                                onClick={() => setPaymentMethod("creditCard")}
                            >
                                Credit Card
                            </button>
                            <button
                                className={`flex-1 p-2 rounded ${paymentMethod === "paypal" ? "bg-rose-400 text-white" : "bg-gray-200"} mr-2`}
                                onClick={() => setPaymentMethod("paypal")}
                            >
                                PayPal
                            </button>
                            <button
                                className={`flex-1 p-2 rounded ${paymentMethod === "eTransfer" ? "bg-rose-400 text-white" : "bg-gray-200"}`}
                                onClick={() => setPaymentMethod("eTransfer")}
                            >
                                eTransfer
                            </button>
                        </div>
                        {paymentMethod === "creditCard" && (
                            <Elements stripe={stripePromise}>
                                <PaymentForm onPaymentSuccess={() => handlePayment()} onPaymentFailure={(error) => console.log(error)} />
                            </Elements>
                        )}
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
