// PaymentForm.js
import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ onPaymentSuccess, onPaymentFailure }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      onPaymentFailure(error);
    } else {
      onPaymentSuccess(paymentMethod.id);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement className="border p-2 rounded mb-4" />
      <button
        type="submit"
        className="w-full bg-rose-400 text-white py-2 rounded-lg hover:bg-rose-200"
        disabled={!stripe}
      >
        Pay Now
      </button>
    </form>
  );
};

export default PaymentForm;
