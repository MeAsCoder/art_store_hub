"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faHome,  faBoxOpen,  faTruck,  faUndo,  faPlus,faPlusCircle,
    faUser,
    faEnvelope,faShoppingCart,
    faPhone,
    faLocationArrow,
    faEdit,
    faSave,} from "@fortawesome/free-solid-svg-icons";

const SellerDashboard = () => {
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
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+123456789",
    location: "123 Main Street, New York",
  });

  // Function to handle form changes
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
    // Here you would send a request to your API to update the profile
    // axios.put('/api/update-profile', profileData)
    toast.success("Profile updated successfully!");
  };

  // Fetch all categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/allCategories');
        setCategories(response.data); // Assuming the response contains an array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleNewOrderSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/restock', {
        productName: newProduct.productName,
        productPrice: parseFloat(newProduct.productPrice),
        productDescription: newProduct.productDescription,
        createdDate: newProduct.createdDate,
        deliveryTimeSpan: newProduct.deliveryTimeSpan,
        categoryId: parseInt(newProduct.categoryId), // Assuming categoryId is a number
        productImageUrl: newProduct.productImageUrl,
        productSKU: newProduct.productSKU,
      });
      console.log('Product saved successfully:', response.data);
      toast.success('Product saved successfully!');

      // Clear the form after successful submission
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

  // Placeholder orders
  const pendingOrders = [
    { orderNumber: 'PO12345', date: '2024-09-15', product: 'Digital Art Canvas', status: 'Pending' },
    { orderNumber: 'PO12346', date: '2024-09-12', product: 'Abstract Sculpture', status: 'Pending' },
  ];

  const deliveredOrders = [
    { orderNumber: 'DO54321', date: '2024-09-01', product: 'Photography Print', status: 'Delivered' },
    { orderNumber: 'DO54322', date: '2024-08-30', product: 'Oil Painting', status: 'Delivered' },
  ];

  const returnedOrders = [
    { orderNumber: 'RO98765', date: '2024-09-10', product: 'Vintage Ceramic Vase', status: 'Returned' },
  ];

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Seller Dashboard</h2>
        <nav>
          <ul>
            <li
              className={`mb-4 cursor-pointer ${activeSection === 'dashboard' ? 'text-yellow-300' : ''}`}
              onClick={() => setActiveSection('dashboard')}
            >
                <FontAwesomeIcon icon={faHome} className="mr-2" />
              Dashboard
            </li>
            <li
              className={`mb-4 cursor-pointer ${activeSection === 'pendingOrders' ? 'text-yellow-300' : ''}`}
              onClick={() => setActiveSection('pendingOrders')}
            >
                <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
              Pending Orders
            </li>
            <li
              className={`mb-4 cursor-pointer ${activeSection === 'deliveredOrders' ? 'text-yellow-300' : ''}`}
              onClick={() => setActiveSection('deliveredOrders')}
            >
                 <FontAwesomeIcon icon={faTruck} className="mr-2" />
              Delivered Orders
            </li>
            <li
              className={`mb-4 cursor-pointer ${activeSection === 'returnedOrders' ? 'text-yellow-300' : ''}`}
              onClick={() => setActiveSection('returnedOrders')}
            >
                 <FontAwesomeIcon icon={faUndo} className="mr-2" />
              Orders Returned
            </li>
            <li
              className={`mb-4 cursor-pointer ${activeSection === 'makeNewOrder' ? 'text-yellow-300' : ''}`}
              onClick={() => setActiveSection('makeNewOrder')}
            >
                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />
              Make New Order
            </li>

            <li
              className={`mb-4 cursor-pointer ${
                activeSection === "profile" ? "text-yellow-300" : ""
              }`}
              onClick={() => setActiveSection("profile")}
            >
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              Profile
            </li>

          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        {activeSection === 'dashboard' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold">Total Sales</h3>
                <p className="text-2xl mt-4">$1,230</p>
              </div>
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold">Pending Orders</h3>
                <p className="text-2xl mt-4">2</p>
              </div>
              <div className="bg-white p-6 shadow rounded-lg">
                <h3 className="text-xl font-bold">Delivered Orders</h3>
                <p className="text-2xl mt-4">4</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'pendingOrders' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Pending Orders</h2>
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div key={order.orderNumber} className="bg-white p-4 rounded-lg shadow">
                  <p className="text-lg font-semibold">Order #{order.orderNumber}</p>
                  <p>Date: {order.date}</p>
                  <p>Product: {order.product}</p>
                  <p>Status: {order.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'deliveredOrders' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Delivered Orders</h2>
            <div className="space-y-4">
              {deliveredOrders.map((order) => (
                <div key={order.orderNumber} className="bg-white p-4 rounded-lg shadow">
                  <p className="text-lg font-semibold">Order #{order.orderNumber}</p>
                  <p>Date: {order.date}</p>
                  <p>Product: {order.product}</p>
                  <p>Status: {order.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'returnedOrders' && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Orders Returned</h2>
            <div className="space-y-4">
              {returnedOrders.map((order) => (
                <div key={order.orderNumber} className="bg-white p-4 rounded-lg shadow">
                  <p className="text-lg font-semibold">Order #{order.orderNumber}</p>
                  <p>Date: {order.date}</p>
                  <p>Product: {order.product}</p>
                  <p>Status: {order.status}</p>
                </div>
              ))}
            </div>
          </div>
        )}


 {/* Profile Section with Edit Functionality */}
 {activeSection === "profile" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Seller Profile</h2>

            <div className="bg-white p-6 shadow rounded-lg space-y-4">
              {isEditing ? (
                <div>
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faUser} className="text-blue-500" />
                    <input
                      type="text"
                      name="name"
                      value={profileData.name}
                      onChange={handleProfileInputChange}
                      className="border rounded p-2 w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faEnvelope} className="text-red-500" />
                    <input
                      type="email"
                      name="email"
                      value={profileData.email}
                      onChange={handleProfileInputChange}
                      className="border rounded p-2 w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faPhone} className="text-green-500" />
                    <input
                      type="text"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleProfileInputChange}
                      className="border rounded p-2 w-full"
                    />
                  </div>
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon
                      icon={faLocationArrow}
                      className="text-yellow-500"
                    />
                    <input
                      type="text"
                      name="location"
                      value={profileData.location}
                      onChange={handleProfileInputChange}
                      className="border rounded p-2 w-full"
                    />
                  </div>
                  <button
                    className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
                    onClick={handleSaveProfile}
                  >
                    <FontAwesomeIcon icon={faSave} className="mr-2" />
                    Save Profile
                  </button>
                </div>
              ) : (
                <div>
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faUser} className="text-blue-500" />
                    <span className="text-lg font-semibold">{profileData.name}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faEnvelope} className="text-red-500" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon icon={faPhone} className="text-green-500" />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <FontAwesomeIcon
                      icon={faLocationArrow}
                      className="text-yellow-500"
                    />
                    <span>{profileData.location}</span>
                  </div>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
                    onClick={() => setIsEditing(true)}
                  >
                    <FontAwesomeIcon icon={faEdit} className="mr-2" />
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

{activeSection === 'makeNewOrder' && (
  <div>
    <h2 className="text-3xl font-bold mb-6">Make New Order</h2>
    <form onSubmit={handleNewOrderSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow mb-10">
      <div>
        <label htmlFor="productName" className="block text-lg font-semibold mb-1">Product Name</label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={newProduct.productName}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="productImageUrl" className="block text-lg font-semibold mb-1">Image URL</label>
        <input
          type="text"
          id="productImageUrl"
          name="productImageUrl"
          value={newProduct.productImageUrl}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="categoryId" className="block text-lg font-semibold mb-1">Category</label>
        <select
          id="categoryId"
          name="categoryId"
          value={newProduct.categoryId}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="productDescription" className="block text-lg font-semibold mb-1">Description</label>
        <textarea
          id="productDescription"
          name="productDescription"
          value={newProduct.productDescription}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="productPrice" className="block text-lg font-semibold mb-1">Price</label>
        <input
          type="number"
          id="productPrice"
          name="productPrice"
          value={newProduct.productPrice}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
          min="0"
        />
      </div>
      <div>
        <label htmlFor="createdDate" className="block text-lg font-semibold mb-1">Created Date</label>
        <input
          type="date"
          id="createdDate"
          name="createdDate"
          value={newProduct.createdDate}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="deliveryTimeSpan" className="block text-lg font-semibold mb-1">Delivery Time Span</label>
        <input
          type="text"
          id="deliveryTimeSpan"
          name="deliveryTimeSpan"
          value={newProduct.deliveryTimeSpan}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="productSKU" className="block text-lg font-semibold mb-1">Product SKU</label>
        <input
          type="text"
          id="productSKU"
          name="productSKU"
          value={newProduct.productSKU}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      {/* New Inputs for Artwork Details */}
      <div>
        <label htmlFor="material" className="block text-lg font-semibold mb-1">Material Used</label>
        <input
          type="text"
          id="material"
          name="material"
          placeholder='E.g Canvas, Acrylic Paint etc...'
          value={newProduct.material}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="dateCreated" className="block text-lg font-semibold mb-1">Date Created</label>
        <input
          type="text"
          id="dateCreated"
          name="dateCreated"
          placeholder='MM/DD/YYYY'
          value={newProduct.dateCreated}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="mountingSteps" className="block text-lg font-semibold mb-1">Mounting Steps</label>
        <textarea
          id="mountingSteps"
          name="mountingSteps"
          value={newProduct.mountingSteps}
          placeholder='E.g Say use screws and anchors for wall mounting etc...'
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="recommendedPlacement" className="block text-lg font-semibold mb-1">Recommended Placement</label>
        <textarea
          id="recommendedPlacement"
          name="recommendedPlacement"
          value={newProduct.recommendedPlacement}
          placeholder='E.g Living room, Bedroom, Office etc'
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <div>
        <label htmlFor="recommendations" className="block text-lg font-semibold mb-1">Recommendations</label>
        <textarea
          id="recommendations"
          name="recommendations"
          placeholder='E.g Ideal for enhancing the aesthetics of living rooms, bedrooms, or even office spaces etc..'
          value={newProduct.recommendations}
          onChange={handleInputChange}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
      </div>
      <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Save Order</button>
    </form>
  </div>
)}

      </main>
    </div>
  );
};

export default SellerDashboard;
