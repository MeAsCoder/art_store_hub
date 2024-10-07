// app/shop-by-category/page.js

import { useEffect, useState } from 'react';
import Link from 'next/link';

const ShopByCategory = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://localhost:9937/api/product/allCategories'); // Update this with your API endpoint
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
      <h1 className="text-3xl font-bold text-center mb-8">Shop by Category</h1>
      <div className="flex overflow-x-auto space-x-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <Link key={category.categoryId} href={`/products/${category.categoryId}`}>
              <div className="flex-shrink-0 w-64 p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300">
                <img
                  src={category.imageUrl} // Assuming category has an image URL
                  alt={category.categoryName}
                  className="h-40 w-full object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold text-gray-800">{category.categoryName}</h2>
                <p className="text-gray-600 mt-1">{category.categoryDescription}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No categories available.</p>
        )}
      </div>
    </div>
  );
};

export default ShopByCategory;
