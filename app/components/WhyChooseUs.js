import React from 'react';
import { FaRegLightbulb, FaCheckCircle } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <div 
      className="bg-fixed bg-center bg-cover h-[calc(100vh-4rem)] overflow-y-auto flex items-center justify-center text-white py-10"  
      style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/5/5c/Kenyan_oil_painting_01.jpg)' }}
    >
      <article className="bg-black bg-opacity-50 p-8 rounded-md w-full max-w-6xl">
        <h2 className="text-3xl font-bold mb-6 text-rose-200">Why Choose Our Art?</h2>
        <p className="text-lg text-white mb-8 flex items-start">
          <FaRegLightbulb className="text-yellow-400 mr-2" />
          We specialize in high-quality oil hand paintings, crafted with care both locally and internationally. 
          Our artworks are tailored to suit your needs, ensuring that each piece resonates with your personal style. 
          Additionally, we take orders to customize art according to your specific preferences, making each 
          creation uniquely yours.
        </p>

        <h3 className="text-2xl font-semibold mb-6 text-rose-200 flex justify-center items-center mt-5">Our Art Process</h3>

        {/* Card layout for the process steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="bg-gray-800 p-6 rounded-md shadow-md text-left flex flex-col items-start">
            <FaCheckCircle className="text-green-400 mb-3 text-2xl" />
            <h4 className="text-xl font-semibold mb-2">Collaborate with Professional Artists</h4>
            <p>We work with talented artists who pour their creativity and skill into every piece.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-800 p-6 rounded-md shadow-md text-left flex flex-col items-start">
            <FaCheckCircle className="text-green-400 mb-3 text-2xl" />
            <h4 className="text-xl font-semibold mb-2">Select the Best Art</h4>
            <p>Our team curates a selection of artworks that meet our high standards of quality and originality.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-gray-800 p-6 rounded-md shadow-md text-left flex flex-col items-start">
            <FaCheckCircle className="text-green-400 mb-3 text-2xl" />
            <h4 className="text-xl font-semibold mb-2">Customize to Your Liking</h4>
            <p>We tailor each artwork to meet your specific requirements and preferences.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-gray-800 p-6 rounded-md shadow-md text-left flex flex-col items-start">
            <FaCheckCircle className="text-green-400 mb-3 text-2xl" />
            <h4 className="text-xl font-semibold mb-2">Timely Delivery</h4>
            <p>We ensure that your chosen artwork is delivered to you safely and on time.</p>
          </div>

          {/* Card 5 */}
          <div className="bg-gray-800 p-6 rounded-md shadow-md text-left flex flex-col items-start">
            <FaCheckCircle className="text-green-400 mb-3 text-2xl" />
            <h4 className="text-xl font-semibold mb-2">Ongoing Support</h4>
            <p>We provide continued support to ensure you are happy with your art purchase.</p>
          </div>

          {/* Card 6 */}
          <div className="bg-gray-800 p-6 rounded-md shadow-md text-left flex flex-col items-start">
            <FaCheckCircle className="text-green-400 mb-3 text-2xl" />
            <h4 className="text-xl font-semibold mb-2">Custom Requests</h4>
            <p>We take special orders to tailor art based on your individual preferences.</p>
          </div>
        </div>

        <p className="text-lg text-white mt-8 flex items-start">
          <FaRegLightbulb className="text-yellow-400 mr-2" />
          Our commitment to quality doesn&apos;t end with the selection process. We provide ongoing support to ensure that you are satisfied 
          with your purchase, and we are always available to assist you with any customizations or questions you may have.
        </p>

        <div className="flex justify-center items-center mt-10">
        <button className="bg-rose-400 text-white py-3 px-6 rounded hover:bg-rose-500 transition duration-300 mt-10 flex justify-center items-center">
          Order a Customized Art
        </button>

        </div>

      </article>
    </div>
  );
};

export default WhyChooseUs;
