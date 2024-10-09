import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const BestSellers = () => {
  // Mock data for sellers with African names and locations, including placeholder for images and descriptions
  const sellers = [
    { 
      id: 1, 
      name: 'Kwame Adom', 
      location: 'Accra, Ghana', 
      sales: 120, 
      imageUrl: 'https://png.pngtree.com/png-vector/20240518/ourlarge/pngtree-african-american-male-avatar-png-image_12480657.png',
      description: "Kwame Adom is a visionary artist known for his intricate sculptures that reflect the rich cultural heritage of Ghana." 
    },
    { 
      id: 2, 
      name: 'Fatou Diarra', 
      location: 'Dakar, Senegal', 
      sales: 200, 
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8jAR9SpBv7lrUuS1qqJazZPqjUms2rAzDYHyO1sW-yVuLdIQsy5Gftnn-ZW0qa1KPyd0&usqp=CAU',
      description: "Fatou Diarra is a contemporary painter whose vibrant canvases explore themes of identity and resilience within African communities."
    },
    { 
      id: 3, 
      name: 'Nuru Kamau', 
      location: 'Nairobi, Kenya', 
      sales: 150, 
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/018/880/408/non_2x/3d-flag-of-kenya-on-a-avatar-circle-png.png',
      description: "Nuru Kamau is celebrated for his bold use of colors and unique blend of traditional and modern art styles." 
    },
    { 
      id: 4, 
      name: 'Amina Bassey', 
      location: 'Lagos, Nigeria', 
      sales: 300, 
      imageUrl: 'https://static.vecteezy.com/system/resources/previews/002/002/263/non_2x/black-man-with-beard-avatar-character-free-vector.jpg',
      description: "Amina Bassey specializes in mixed media art that often tells stories of women in African societies."
    },
    { 
      id: 5, 
      name: 'Abdul Sesay', 
      location: 'Freetown, Sierra Leone', 
      sales: 90, 
      imageUrl: 'https://www.iexploreafrica.com/wp-content/uploads/2022/08/nilotics-people-.jpeg',
      description: "Abdul Sesay creates powerful visual narratives that reflect the struggles and triumphs of his community."
    },
    { 
      id: 6, 
      name: 'Zuri Okeke', 
      location: 'Kampala, Uganda', 
      sales: 180, 
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNgOXuegB_tk7ndj7NwEVudCTKew0AQcqcrA&s',
      description: "Zuri Okeke is known for her stunning photography that captures the natural beauty and spirit of Uganda."
    },
  ];

  // State to manage showing all or limited sellers
  const [showAll, setShowAll] = useState(false);

  // Toggle the view of all sellers
  const toggleShowAll = () => setShowAll(!showAll);

  // Determine how many sellers to display
  const displayedSellers = showAll ? sellers : sellers.slice(0, 3);

  return (
    <div className="my-8 p-4 bg-white shadow-md">
      <h2 className="text-2xl font-bold text-rose-400">Best Sellers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {displayedSellers.map((seller) => (
          <div key={seller.id} className="border p-4 text-center hover:shadow-lg transition duration-300">
            {/* Image Placeholder */}
            <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
              {seller.imageUrl ? (
                <img src={seller.imageUrl} alt={seller.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-gray-500 flex items-center justify-center h-full">No Image</span>
              )}
            </div>
            
            <h3 className="font-semibold text-lg text-gray-600 mb-2">
              {seller.name}
            </h3>
            <p className="text-gray-500 mb-1">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="text-rose-400 mr-2" /> {seller.location}
            </p>
            <p className="text-gray-600 font-semibold">
              <FontAwesomeIcon icon={faShoppingCart} className="text-rose-400 mr-2" /> {seller.sales} Sales
            </p>
            {/* Description */}
            <p className="text-gray-500 mt-2">{seller.description}</p>
          </div>
        ))}
      </div>
      {/* Toggle Button */}
      <div className="text-center mt-4">
        <button
          onClick={toggleShowAll}
          className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600 transition duration-300"
        >
          {showAll ? 'View Less' : 'View All Sellers'}
        </button>
      </div>
    </div>
  );
};

export default BestSellers;
