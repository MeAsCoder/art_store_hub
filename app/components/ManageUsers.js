import React from 'react';

const ManageUsers = () => {
  // Mock data for users and their products
  const users = [
    {
      userId: 1,
      userName: 'John Doe',
      dateJoined: '2023-10-01',
      products: [
        {
          id: 101,
          productName: 'Abstract Painting',
          productImageUrl: 'https://example.com/abstract-painting.jpg',
          productDescription: 'A beautiful abstract painting.',
          datePosted: '2023-10-05',
          price: 120.00,
        },
        {
          id: 102,
          productName: 'Modern Sculpture',
          productImageUrl: 'https://example.com/sculpture.jpg',
          productDescription: 'A stylish modern sculpture.',
          datePosted: '2023-10-10',
          price: 200.00,
        },
      ],
    },
    {
      userId: 2,
      userName: 'Jane Smith',
      dateJoined: '2023-09-15',
      products: [
        {
          id: 201,
          productName: 'Landscape Art',
          productImageUrl: 'https://example.com/landscape-art.jpg',
          productDescription: 'A serene landscape art piece.',
          datePosted: '2023-09-20',
          price: 180.00,
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Manage Users and Their Products</h2>

      {users.map((user) => (
        <div key={user.userId} className="mb-8 border-b pb-4">
          <h3 className="text-xl font-semibold mb-2">{user.userName}</h3>
          <p className="text-gray-500 mb-4">Joined: {user.dateJoined}</p>

          <h4 className="font-semibold mb-3">Products Posted:</h4>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 mb-4">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">product Id</th>
                  <th className="py-2 px-4 border-b text-left">Product Image</th>
                  <th className="py-2 px-4 border-b text-left">Name</th>
                  <th className="py-2 px-4 border-b text-left">Description</th>
                  <th className="py-2 px-4 border-b text-left">Date Posted</th>
                  <th className="py-2 px-4 border-b text-left">Price</th>
                  <th className="py-2 px-4 border-b text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {user.products.map((product, index) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">
                      <img
                        src={product.productImageUrl}
                        alt={product.productName}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">{product.productName}</td>
                    <td className="py-2 px-4 border-b">{product.productDescription}</td>
                    <td className="py-2 px-4 border-b">{product.datePosted}</td>
                    <td className="py-2 px-4 border-b">${product.price.toFixed(2)}</td>
                    <td className="py-2 px-4 border-b">
                      <button className="bg-blue-500 text-white px-2 py-1 rounded mr-2 mb-5">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ManageUsers;
