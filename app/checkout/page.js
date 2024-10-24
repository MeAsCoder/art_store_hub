"use client";

import CheckoutPage from "../components/CheckoutPage.";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation'; 
import { useState, useEffect } from "react";


if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function Home() {
  const { cart } = useCart();
  const router = useRouter();
  const [totals, setTotals] = useState({ subtotal: 0, shippingCost: 0, total: 0, taxes: 0 });
 


  useEffect(() => {
    if (cart.length > 0) {
      const calculateTotals = () => {
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const taxes = subtotal * 0.16;
        const shippingCost = subtotal * 0.05; // Fixed shipping cost, adjust as necessary
        const total = subtotal + shippingCost + taxes;
        return { subtotal, shippingCost, total, taxes };
      };

      const { subtotal, shippingCost, total, taxes } = calculateTotals();
      setTotals({ subtotal, shippingCost, total, taxes });
    }
  }, [cart]);


 const amount = Math.round(totals.total);

 if (amount <= 0) {
  return (
    <main className="max-w-lg mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-slate-500 to-purple-300">
      <div className="mb-10">
        <h1 className="text-2xl font-extrabold mb-2">No items in the cart</h1>
        <h2 className="text-xl">Please add some items to the cart to proceed with checkout.</h2>
      </div>
    </main>
  );
}


  return (
    <main className="max-w-lg mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-slate-500 to-purple-300">
      <div className="mb-10">
        <h1 className="text-4xl font-bold mb-2">ArtGalleryHub</h1>
        <h2 className="text-xl">
        is about to process your payment of
          <span className="font-bold"> ${amount}</span>
          
        </h2>
      </div>
      <div><p>Check Out Securely with Stripe or PayPal</p></div>

      <Elements
        
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </main>
  );
}