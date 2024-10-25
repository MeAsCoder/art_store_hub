import React, { useEffect, useState } from "react";
import {useRouter}  from 'next/navigation';

const PayPalButton = ({ amount }) => {
 
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter(); // Initialize the router

  useEffect(() => {
    setIsMounted(true); // Component has mounted on client-side
  }, []);

  useEffect(() => {
    if (!isMounted) return; // Only proceed if component is mounted on the client

    const loadPayPalScript = () => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(
          `script[src="https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD"]`
        );

        if (!existingScript) {
          const script = document.createElement("script");
          script.src = `https://www.paypal.com/sdk/js?client-id=${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}&currency=USD`;
          script.async = true;

          script.onload = () => {
            if (window.paypal) {
              resolve(window.paypal);
            } else {
              reject(new Error("PayPal SDK failed to load"));
            }
          };

          script.onerror = (err) => {
            console.error("Failed to load PayPal SDK", err);
            reject(err);
          };

          document.body.appendChild(script);
        } else {
          resolve(window.paypal);
        }
      });
    };

    if (document.getElementById("paypal-button-container")) {
      loadPayPalScript()
        .then((paypal) => {
          paypal
            .Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: amount.toFixed(2),
                      },
                    },
                  ],
                });
              },
              onApprove: (data, actions) => {
                return actions.order.capture().then((details) => {
                 // alert("Transaction completed by " + details.payer.name.given_name);
                  
                  const amount = details.purchase_units[0].amount.value;
                  const transactionId = details.id;

                  // Use router.push() to redirect the user
                  router.push(`/payment-success?amount=${amount}&transactionId=${transactionId}`);
                });
              },
              
              onError: (err) => {
                console.error("PayPal Checkout Error", err);
                alert("An error occurred during the transaction: " + err.message);
              },
            })
            .render("#paypal-button-container");
        })
        .catch((error) => {
          console.error("Failed to load PayPal script", error);
        });
    }
  }, [isMounted, amount]);

  return <div id="paypal-button-container" />; // Ensure this div is rendered
};

export default PayPalButton;
