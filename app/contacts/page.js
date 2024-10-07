// pages/contact.js

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <div>
      
      <div className="container mx-auto mt-12 px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-rose-400">Contact Us</h1>

        <div className="flex flex-col md:flex-row">
          {/* Contact Form */}
          <div className="md:w-1/2">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <h2 className="text-2xl font-bold mb-4 text-center">We&apos;d Love to Hear From You!</h2>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  className="input input-bordered w-full"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="input input-bordered w-full"
                  id="email"
                  type="email"
                  placeholder="Your Email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  id="message"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-between">
                <button className="btn bg-rose-400" type="submit">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Contact Information */}
          <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
            <h2 className="text-2xl font-bold mb-4">Get in Touch with Us</h2>
            <p className="mb-4">
              Email: <a href="mailto:info@yourartgallery.com" className="text-blue-600">info@yourartgallery.com</a>
            </p>
            <p className="mb-4">
              Phone: <a href="tel:+1234567890" className="text-blue-600">+1 234 567 890</a>
            </p>
            <p className="mb-4">Address: 456 Art Avenue, City, State, ZIP</p>
            <p className="mb-4">Visit us for gallery exhibitions, workshops, and more!</p>
            <p className="mb-4">Follow us on social media to stay updated with our latest collections:</p>
            <div className="flex space-x-4 mt-2">
              <a href="https://facebook.com" className="text-gray-700 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor">
                  {/* Facebook Icon SVG */}
                  <path d="M... (your SVG path here)" />
                </svg>
              </a>
              <a href="https://instagram.com" className="text-gray-700 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor">
                  {/* Instagram Icon SVG */}
                  <path d="M... (your SVG path here)" />
                </svg>
              </a>
              <a href="https://twitter.com" className="text-gray-700 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                <svg className="w-6 h-6" fill="currentColor">
                  {/* Twitter Icon SVG */}
                  <path d="M... (your SVG path here)" />
                </svg>
              </a>
              {/* Add more social media links if needed */}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Contact;
