import React from 'react';

const orders = [
  {
    orderNumber: 'BD045903594059',
    date: '2024-10-23',
    productName: 'Wireless Headphones',
    price: '$150',
    status: 'Shipped',
    steps: [
      { label: 'Order Placed', completed: true },
      { label: 'Processing', completed: true },
      { label: 'Shipped', completed: true },
      { label: 'Out for Delivery', completed: false },
      { label: 'Delivered', completed: false },
    ],
  },
  {
    orderNumber: 'BD045903594060',
    date: '2024-10-21',
    productName: 'Smartphone',
    price: '$800',
    status: 'Processing',
    steps: [
      { label: 'Order Placed', completed: true },
      { label: 'Processing', completed: true },
      { label: 'Shipped', completed: false },
      { label: 'Out for Delivery', completed: false },
      { label: 'Delivered', completed: false },
    ],
  },
];

const OrderTracking = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-10 mb-8">Track Your Orders</h1>
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8">
        {orders.map((order, index) => (
          <div key={index} className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">Order Number: {order.orderNumber}</p>
              <p className="text-lg font-semibold">{order.price}</p>
            </div>
            <p className="mb-2">Date: {order.date}</p>
            <p className="mb-6">Product: {order.productName}</p>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                {order.steps.map((step, idx) => (
                  <div key={idx} className="text-center flex-1">
                    <div
                      className={`w-8 h-8 rounded-full mx-auto ${
                        step.completed ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    />
                    <p className="mt-2 text-sm">{step.label}</p>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                {order.steps.map((step, idx) => (
                  <div
                    key={idx}
                    className={`h-1 flex-1 ${
                      idx !== order.steps.length - 1
                        ? 'mr-2'
                        : ''
                    } ${step.completed ? 'bg-green-500' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
            </div>

            {/* Order status */}
            <p className={`font-semibold text-lg ${order.status === 'Shipped' ? 'text-green-600' : 'text-yellow-500'}`}>
              Current Status: {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderTracking;
