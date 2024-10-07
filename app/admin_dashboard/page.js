"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // or use a custom modal
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome, faBoxOpen, faTruck, faUndo, faPlusCircle, faUser, faEnvelope, faShoppingCart,
  faPhone, faLocationArrow, faEdit, faSave, faChartLine, faUsers, faTag, faDollarSign,
  faExclamationCircle, faFileAlt, faTrashAlt, faPlus, faTrash 
} from "@fortawesome/free-solid-svg-icons";
import ManageUsers from '../components/ManageUsers';
import UserProfile from '../components/UserProfile';



const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
    const [newProduct, setNewProduct] = useState({
    productName: '',
    productImageUrl: '',
    categoryId: '',
    productDescription: '',
    productPrice: '',
    createdDate: '',
    deliveryTimeSpan: '',
    productSKU: '',
  });
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // For showing/hiding modal
  const [editProduct, setEditProduct] = useState(null); // For holding product data being edited
  const [currentProduct, setCurrentProduct] = useState(null);


  const [profileData, setProfileData] = useState({
    name: "Admin",
    email: "admin@example.com",
    phone: "+123456789",
    location: "123 Admin Street, New York",
  });

  // Function to handle form changes for profile
  const handleProfileInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle saving the edited profile
  const handleSaveProfile = () => {
    setIsEditing(false);
    // Save profile updates through API
    toast.success("Profile updated successfully!");
  };

  // Fetch categories when the component mounts
 

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const response = await axios.get('https://localhost:9937/api/product/allCategories');
            setCategories(response.data); 
          } catch (error) {
            console.error('Error fetching categories:', error);
          }
        };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://localhost:9937/api/users');
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };


    const fetchProducts = async () => {
        try {
          const response = await axios.get('https://localhost:9937/api/product/allProducts');
          setProducts(response.data); 
        } catch (error) {
          console.error('Error fetching users:', error);
        }
      };

    const fetchPayments = async () => {
      try {
        const response = await axios.get('https://localhost:9937/api/payments');
        setPayments(response.data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      }
    };

    fetchCategories();
    fetchUsers();
    fetchPayments();
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleNewOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:9937/api/product/restock', newProduct);
      toast.success('Product saved successfully!');
      setNewProduct({
        productName: '',
        productImageUrl: '',
        categoryId: '',
        productDescription: '',
        productPrice: '',
        createdDate: '',
        deliveryTimeSpan: '',
        productSKU: '',
      });
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;
  
    try {
      const response = await fetch(`https://localhost:9937/api/product/delete${productId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the product');
      }
  
      alert('Product deleted successfully!');
      // Optionally, you can trigger a state update or redirect to update the UI
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('There was an error deleting the product. Please try again.');
    }
  };

  const handleEditProduct = (productId) => {
    const product = products.find((p) => p.id === productId);
    setCurrentProduct(product);
    setIsModalOpen(true); // Show the modal
  };

  const handlCancelSave = () =>{
    setIsModalOpen(false);
  }

  // Function to save the updated product details
  const handleSaveProduct = async () => {
    try {
      const response = await axios.put(`https://localhost:9937/api/product/${currentProduct.id}`, currentProduct);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === currentProduct.id ? { ...product, ...currentProduct } : product
        )
      );
      setIsModalOpen(false); // Close the modal on success
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };




  const pendingOrders = [
    { orderNumber: 'PO12345', date: '2024-09-15', product: 'Digital Art Canvas', status: 'Pending' },
  ];

  const deliveredOrders = [
    { orderNumber: 'DO54321', date: '2024-09-01', product: 'Photography Print', status: 'Delivered' },
  ];

  const returnedOrders = [
    { orderNumber: 'RO98765', date: '2024-09-10', product: 'Vintage Ceramic Vase', status: 'Returned' },
  ];

  const mockusers = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'admin',
      status: 'active',
      registrationDate: '2023-01-12',
      lastLogin: '2024-09-21',
      orders: [
        {
          orderId: 'BD045903594059',
          orderDate: '2024-09-20',
          totalAmount: 150.00,
          products: [
            { productId: 'P001', productName: 'Painting A', quantity: 1, price: 50.00 },
            { productId: 'P002', productName: 'Painting B', quantity: 2, price: 100.00 },
          ]
        },
        {
          orderId: 'BD045903594060',
          orderDate: '2024-08-15',
          totalAmount: 75.00,
          products: [
            { productId: 'P003', productName: 'Sculpture A', quantity: 1, price: 75.00 },
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'customer',
      status: 'inactive',
      registrationDate: '2022-05-30',
      lastLogin: '2024-07-18',
      orders: [
        {
          orderId: 'BD045903594061',
          orderDate: '2024-08-25',
          totalAmount: 200.00,
          products: [
            { productId: 'P004', productName: 'Art Print A', quantity: 2, price: 100.00 },
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'seller',
      status: 'active',
      registrationDate: '2021-09-12',
      lastLogin: '2024-10-01',
      orders: []
    }
  ];

  const UserManagement = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);
  
    const toggleOrders = (userId) => {
      setSelectedUserId(selectedUserId === userId ? null : userId);
    };



      











    return (
      <div>
        <h2 className="text-3xl font-bold mb-6">User Management</h2>
        <div className="overflow-auto">
          <table className="min-w-full bg-white rounded-lg shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-2 px-4">User ID</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Registration Date</th>
                <th className="py-2 px-4">Last Login</th>
                <th className="py-2 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockusers.map(user => (
                <tr key={user.id} className="text-center border-b">
                  <td className="py-2 px-4">{user.id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-white ${user.role === 'admin' ? 'bg-blue-500' : user.role === 'customer' ? 'bg-green-500' : 'bg-purple-500'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-2 px-4">
                    <span className={`inline-block px-3 py-1 rounded-full ${user.status === 'active' ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-700'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">{new Date(user.registrationDate).toLocaleDateString()}</td>
                  <td className="py-2 px-4">{new Date(user.lastLogin).toLocaleString()}</td>
                  <td className="py-2 px-4">
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-full mr-2">
                      <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
                    </button>
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full mr-2">
                      <FontAwesomeIcon icon={faTrashAlt} className="mr-1" /> Delete
                    </button>
                    <button onClick={() => toggleOrders(user.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full">
                      <FontAwesomeIcon icon={faFileAlt} className="mr-1" /> View Orders
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {selectedUserId && (
            <div className="mt-6">
              <h3 className="text-2xl font-bold mb-4">Orders for User ID: {selectedUserId}</h3>
              <table className="min-w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="py-2 px-4">Order ID</th>
                    <th className="py-2 px-4">Order Date</th>
                    <th className="py-2 px-4">Total Amount</th>
                    <th className="py-2 px-4">Products</th>
                  </tr>
                </thead>
                <tbody>
                  {mockusers
                    .find(user => user.id === selectedUserId)
                    ?.orders.map(order => (
                      <tr key={order.orderId} className="text-center border-b">
                        <td className="py-2 px-4">{order.orderId}</td>
                        <td className="py-2 px-4">{new Date(order.orderDate).toLocaleDateString()}</td>
                        <td className="py-2 px-4">${order.totalAmount.toFixed(2)}</td>
                        <td className="py-2 px-4">
                          {order.products.map(product => (
                            <div key={product.productId}>{product.productName} (x{product.quantity})</div>
                          ))}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-900 text-white h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
        <ul>
          <li className={`mb-2 cursor-pointer ${activeSection === 'dashboard' ? 'text-blue-300' : ''}`} onClick={() => handleSectionChange('dashboard')}>
            <FontAwesomeIcon icon={faChartLine} className="mr-2" /> Dashboard
          </li>
          <li className={`mb-2 cursor-pointer ${activeSection === 'products' ? 'text-blue-300' : ''}`} onClick={() => handleSectionChange('products')}>
            <FontAwesomeIcon icon={faBoxOpen} className="mr-2" /> Products
          </li>
          <li className={`mb-2 cursor-pointer ${activeSection === 'orders' ? 'text-blue-300' : ''}`} onClick={() => handleSectionChange('orders')}>
            <FontAwesomeIcon icon={faTruck} className="mr-2" /> Orders
          </li>
          <li className={`mb-2 cursor-pointer ${activeSection === 'users' ? 'text-blue-300' : ''}`} onClick={() => handleSectionChange('users')}>
            <FontAwesomeIcon icon={faUsers} className="mr-2" /> Users
          </li>
          <li className={`mb-2 cursor-pointer ${activeSection === 'payments' ? 'text-blue-300' : ''}`} onClick={() => handleSectionChange('payments')}>
            <FontAwesomeIcon icon={faDollarSign} className="mr-2" /> Payments
          </li>
          <li className={`mb-2 cursor-pointer ${activeSection === 'profile' ? 'text-blue-300' : ''}`} onClick={() => handleSectionChange('profile')}>
            <FontAwesomeIcon icon={faUser} className="mr-2" /> Profile
          </li>
        </ul>
      </div>
      <div className="flex-1 p-4">
        <ToastContainer />
        {activeSection === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
            {/* Dashboard content can be added here */}
            <h3 className="text-2xl mb-4">Pending Orders</h3>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">Order Number</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map(order => (
                  <tr key={order.orderNumber} className="text-center border-b">
                    <td className="py-2 px-4">{order.orderNumber}</td>
                    <td className="py-2 px-4">{order.date}</td>
                    <td className="py-2 px-4">{order.product}</td>
                    <td className="py-2 px-4">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="text-2xl mb-4">Delivered Orders</h3>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">Order Number</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {deliveredOrders.map(order => (
                  <tr key={order.orderNumber} className="text-center border-b">
                    <td className="py-2 px-4">{order.orderNumber}</td>
                    <td className="py-2 px-4">{order.date}</td>
                    <td className="py-2 px-4">{order.product}</td>
                    <td className="py-2 px-4">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h3 className="text-2xl mb-4">Returned Orders</h3>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">Order Number</th>
                  <th className="py-2 px-4">Date</th>
                  <th className="py-2 px-4">Product</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {returnedOrders.map(order => (
                  <tr key={order.orderNumber} className="text-center border-b">
                    <td className="py-2 px-4">{order.orderNumber}</td>
                    <td className="py-2 px-4">{order.date}</td>
                    <td className="py-2 px-4">{order.product}</td>
                    <td className="py-2 px-4">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'products' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Manage Products</h2>
            <form onSubmit={handleNewOrderSubmit} className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="productName" value={newProduct.productName} onChange={handleInputChange} placeholder="Product Name" className="border border-gray-300 p-2 rounded" required />
                <input type="text" name="productImageUrl" value={newProduct.productImageUrl} onChange={handleInputChange} placeholder="Product Image URL" className="border border-gray-300 p-2 rounded" required />
                <select name="categoryId" value={newProduct.categoryId} onChange={handleInputChange} className="border border-gray-300 p-2 rounded" required>
                  <option value="">Select Category</option>
                  {categories.map(category => (
                    <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                  ))}
                </select>
                <textarea name="productDescription" value={newProduct.productDescription} onChange={handleInputChange} placeholder="Product Description" className="border border-gray-300 p-2 rounded" required></textarea>
                <input type="number" name="productPrice" value={newProduct.productPrice} onChange={handleInputChange} placeholder="Product Price" className="border border-gray-300 p-2 rounded" required />
              </div>
              <button type="submit" className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mt-4">
                <FontAwesomeIcon icon={faPlus} className="mr-1" /> Add Product
              </button>
            </form>
            <h3 className="text-2xl mb-4">Existing Products</h3>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">Product Name</th>
                  <th className="py-2 px-4">Category</th>
                  <th className="py-2 px-4">Price</th>
                  <th className="py-2 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.productId} className="text-center border-b">
                    <td className="py-2 px-4">{product.productName}</td>
                    <td className="py-2 px-4">{product.id}</td>
                    <td className="py-2 px-4">${product.price.toFixed(2)}</td>
                    <td className="py-2 px-4">
                      <button onClick={() => handleEditProduct(product.id)} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-full mr-2">
                        <FontAwesomeIcon icon={faEdit} className="mr-1" /> Edit
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full">
                        <FontAwesomeIcon icon={faTrash} className="mr-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}


{/* Modal for editing product */}
{isModalOpen && currentProduct && (
  <Modal
    isOpen={isModalOpen}
    onRequestClose={() => setIsModalOpen(false)}
    className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50"
    overlayClassName="fixed inset-0 bg-black bg-opacity-50"
  >
    <div className="bg-white w-full max-w-lg mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
      <form onSubmit={handleSaveProduct} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="productName">Product Name</label>
            <input
              id="productName"
              type="text"
              name="productName"
              value={currentProduct.productName}
              onChange={(e) => setCurrentProduct({ ...currentProduct, productName: e.target.value })}
              placeholder="Product Name"
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="productImageUrl">Product Image URL</label>
            <input
              id="productImageUrl"
              type="text"
              name="productImageUrl"
              value={currentProduct.productImageUrl}
              onChange={(e) => setCurrentProduct({ ...currentProduct, productImageUrl: e.target.value })}
              placeholder="Image URL"
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="categoryId">Category</label>
            <select
              id="categoryId"
              name="categoryId"
              value={currentProduct.categoryId}
              onChange={(e) => setCurrentProduct({ ...currentProduct, categoryId: e.target.value })}
              className="border border-gray-300 p-2 w-full rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Product Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="productDescription">Product Description</label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={currentProduct.productDescription}
              onChange={(e) => setCurrentProduct({ ...currentProduct, productDescription: e.target.value })}
              placeholder="Product Description"
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>

          {/* Product Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="productPrice">Product Price</label>
            <input
              id="productPrice"
              type="number"
              name="productPrice"
              value={currentProduct.productPrice}
              onChange={(e) => setCurrentProduct({ ...currentProduct, productPrice: e.target.value })}
              placeholder="Product Price"
              className="border border-gray-300 p-2 w-full rounded"
              required
            />
          </div>
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mt-4 w-full flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faSave} className="mr-1" /> Save Product
        </button>

         {/* Cancel Button */}
         <button
          
          onClick={() => handlCancelSave()}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mt-4 w-full flex items-center justify-center"
        >
          <FontAwesomeIcon  className="mr-1" /> Cancel
        </button>
      </form>
    </div>
  </Modal>
)}


        {activeSection === 'orders' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Manage Orders</h2>
            <h3 className="text-2xl mb-4">Pending Orders</h3>
            <table className="min-w-full bg-white rounded-lg shadow-lg">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="py-2 px-4">Order Number</th>
                  <th className="py-2 px-4">Order Date</th>
                  <th className="py-2 px-4">Total Amount</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {pendingOrders.map(order => (
                  <tr key={order.orderNumber} className="text-center border-b">
                    <td className="py-2 px-4">{order.orderNumber}</td>
                    <td className="py-2 px-4">{order.date}</td>
                    <td className="py-2 px-4">${order.amount.toFixed(2)}</td>
                    <td className="py-2 px-4">{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'users' && (
          <ManageUsers />
        )}

        {activeSection === 'payments' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Manage Payments</h2>
            {/* Add payment management content here */}
          </div>
        )}

{activeSection == 'profile' && (
<UserProfile/>
)}

      </div>
    </div>
  );
};

export default AdminDashboard;
