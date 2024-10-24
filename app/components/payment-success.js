// pages/payment-success.js
import React from 'react';
import Link from 'next/link'

const PaymentSuccess = () => {
    return (
        <div className="container mx-auto my-8">
            <h1 className="text-3xl font-bold mb-6">Payment Successful!</h1>
            <p>Your payment has been processed successfully. Thank you for your purchase!</p>
            <p>If you have any questions, please contact our support team.</p>
            <Link href="/order-tracking" className="text-blue-500 hover:underline">
                My Orders
            </Link>
        </div>
    );
};

export default PaymentSuccess;
