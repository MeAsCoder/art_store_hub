
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/navigation';


const NewArrivals = ({ products }) => {
    return (
      <div className="my-8 p-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-rose-400">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="border p-4 text-center  transition-transform transform hover:scale-105">
                <img
                  src={product.productImageUrl}
                  alt={product.productName}
                  className="w-full h-40 object-cover mb-2"
                />
                <a href={`/product/${product.id}`} className="font-semibold text-rose-500 hover:underline">
                {product.productName}
              </a>
              
                
                <p className="text-gray-600">${product.productPrice.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-center">
            <FontAwesomeIcon icon={faFrown} className="mr-2 text-rose-400" /> {/* Add icon here */}
            No new arrivals today!
          </p>
          )}
        </div>
      </div>
    );
  };
  
  export default NewArrivals;
  