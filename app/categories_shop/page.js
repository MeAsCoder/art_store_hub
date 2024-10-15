"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/allCategories'); // Update this with your API endpoint
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8 text-rose-300">Shop by Category</h1>
      <div className="flex overflow-x-auto space-x-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            // Check if categoryId is defined before rendering the Link
            category.categoryId ? (
              <Link key={category.categoryId} href={`/product_category/${category.categoryId}?name=${encodeURIComponent(category.categoryName)}`}>
                <div className="flex-shrink-0 w-64 p-4 bg-white shadow-lg rounded-lg transition-transform duration-300 transform hover:scale-95 hover:shadow-xl">
                  <img
                    src={category.imageUrl} // Assuming category has an image URL
                    alt={category.categoryName}
                    className="h-40 w-full object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-800">{category.categoryName}</h2>
                  <p className="text-gray-600 mt-1">{category.categoryDescription}</p>
                </div>
              </Link>
            ) : (
              <div key={category.categoryId} className="flex-shrink-0 w-64 p-4 bg-red-100 shadow-lg rounded-lg">
                <p className="text-red-600">Category ID is missing</p>
              </div>
            )
          ))
        ) : (
          <p className="text-center text-gray-500">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default ShopByCategory;
