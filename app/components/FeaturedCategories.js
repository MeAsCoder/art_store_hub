import { useState } from 'react';

const FeaturedCategories = ({ categories }) => {
  const [showAll, setShowAll] = useState(false); // State to track whether to show all categories

  // Function to toggle showing all categories
  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  // Determine the categories to display
  const displayedCategories = showAll ? categories : categories.slice(0, 3);

  return (
    <div className="my-8 p-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold text-rose-400">Featured Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {displayedCategories.map((category) => (
          <div key={category.categoryId} className="border p-4 text-center transition-transform transform hover:scale-105">
            <img
              src={category.imageUrl} // Use the imageUrl for category image
              alt={category.categoryName} // Alt text for the image
              className="w-full h-40 object-cover mb-2" // Styling for the image
            />
            <h3 className="font-semibold">{category.categoryName}</h3> {/* Display category name */}
          </div>
        ))}
      </div>
      <button
        onClick={toggleShowAll}
        className="mt-4 py-2 px-4 bg-rose-400 text-white font-bold rounded hover:bg-rose-300 transition"
      >
        {showAll ? 'Show Less' : 'Show All Categories'}
      </button>
    </div>
  );
};

export default FeaturedCategories;
