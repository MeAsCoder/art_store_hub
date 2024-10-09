import React from 'react';
import { FaRegLightbulb, FaCheckCircle } from 'react-icons/fa';

const WhyChooseUs = () => {
  return (
    <div 
      className="bg-fixed bg-center bg-cover h-[calc(100vh-4rem)] overflow-y-auto flex items-center justify-center text-white py-10"  
      style={{ backgroundImage: 'url(https://upload.wikimedia.org/wikipedia/commons/5/5c/Kenyan_oil_painting_01.jpg)' }}
    >
      <article>
        <div className="bg-black bg-opacity-50 p-6 rounded-md">
          <h2 className="text-3xl font-bold mb-4 text-rose-200 mt-10">Why Choose Our Art?</h2>
          <p className="text-lg text-white mb-6 flex items-start">
            <FaRegLightbulb className="text-yellow-400 mr-1" />
            We specialize in high-quality oil hand paintings, crafted with care both locally and internationally. 
            Our artworks are tailored to suit your needs, ensuring that each piece resonates with your personal style. 
            Additionally, we take orders to customize art according to your specific preferences, making each 
            creation uniquely yours.
          </p>

          <h3 className="text-2xl font-semibold mb-4 text-rose-200 mt-10">Our Process</h3>
          <ol className="list-decimal list-inside mb-6">
            <li className="flex items-center mb-2">
              <FaCheckCircle className="text-green-400 mr-2" />
              <span>Collaborate with Professional Artists: We work with talented artists who pour their creativity and skill into every piece.</span>
            </li>
            <li className="flex items-center mb-2">
              <FaCheckCircle className="text-green-400 mr-2" />
              Select the Best Art: Our team curates a selection of artworks that meet our high standards of quality and originality.
            </li>
            <li className="flex items-center mb-2">
              <FaCheckCircle className="text-green-400 mr-2" />
              Customize to Your Liking: We tailor each artwork to meet your specific requirements and preferences, ensuring a perfect match for your space.
            </li>
            <li className="flex items-center mb-2">
              <FaCheckCircle className="text-green-400 mr-2" />
              Timely Delivery: We ensure that your chosen artwork is delivered to you safely and on time.
            </li>
          </ol>

          <p className="text-lg text-white mb-6 flex items-start">
            <FaRegLightbulb className="text-yellow-400 mr-2" />
            Our commitment to quality doesn&apos;t end with the selection process. We provide ongoing support to ensure that you are satisfied 
            with your purchase, and we are always available to assist you with any customizations or questions you may have.
          </p>

          <button className="bg-rose-400 text-white py-2 px-4 rounded hover:bg-rose-500 transition duration-300 mt-10">
            Order a Customized Art
          </button>
        </div>
      </article>
    </div>
  );
};

export default WhyChooseUs;
