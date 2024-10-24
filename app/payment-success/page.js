// pages/payment-success.js
import React from 'react';
import Link from 'next/link';

const PaymentSuccess = () => {
    return (
        <div className="container mx-auto my-8 flex flex-col items-center text-center">
            <h1 className="text-3xl font-bold mb-6 text-green-500">Payment Successful!</h1>
            <p>Your payment has been processed successfully. Thank you for your purchase!</p>
            <p>If you have any questions, please contact our support team.</p>
            <Link href="/order-tracking" className="text-blue-500 font-bold hover:underline mt-4">
                My Orders
            </Link>
        </div>

    );
};

export default PaymentSuccess;
