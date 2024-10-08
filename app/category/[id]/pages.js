import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';

const CategoryDetails = ({ params }) => {
  const router = useRouter();
  const { id } = params; // Get the category ID from the URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (id) {
      // Fetch products for the selected category
      const fetchProductsByCategory = async () => {
        try {
          const response = await fetch(`https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/product/category/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch products');
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      };
      fetchProductsByCategory();
    }
  }, [id]);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Category: {id}</h1>

      {products.length > 0 ? (
        <Swiper
          spaceBetween={20}
          slidesPerView={3}
          className="swiper-container"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <article className="p-4 bg-white shadow rounded-lg">
                <img
                  src={product.productImageUrl}
                  alt={product.productName}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h2 className="text-lg font-semibold mt-4">{product.productName}</h2>
                <p className="text-gray-600 mt-2">${product.productPrice}</p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-center text-gray-500">No products available for this category.</p>
      )}
    </div>
  );
};

export default CategoryDetails;
