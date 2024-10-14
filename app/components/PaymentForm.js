// app/components/PaymentForm.js
"use client";

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';

const PaymentForm = ({ onPaymentSuccess, onPaymentFailure }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        setLoading(false);

        if (error) {
            console.error('Error creating payment method:', error);
            onPaymentFailure(error);
        } else {
            console.log('Payment method created:', paymentMethod);
            onPaymentSuccess(paymentMethod.id);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement className="border rounded p-2 mb-4" />
            <button type="submit" disabled={!stripe || loading} className="bg-blue-500 text-white p-2 rounded">
                {loading ? 'Processing...' : 'Pay Now'}
            </button>
        </form>
    );
};

export default PaymentForm;
