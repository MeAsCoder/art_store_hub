import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-500 text-white p-8">
      <div className="container mx-auto">
        {/* Main Content Flexbox */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Supported Countries */}
          <div className="mb-8 md:mb-0 flex flex-col">
            <h3 className="text-lg font-bold mb-4">Company</h3>
            <ul className="list-none space-y-2">
              <li className="hover:translate-x-1 transition-transform">
                <a href="/about">About us</a>
              </li>
              <li className="hover:translate-x-1 transition-transform">
                <a href="/contacts">Contact Us</a>
              </li>
              <li className="hover:translate-x-1 transition-transform">
                <a href="#">Our services</a>
              </li>
              <li className="hover:translate-x-1 transition-transform">
                <a href="#">Privacy policy</a>
              </li>
             
            </ul>
          </div>
          {/* Our Services */}
          <div className="mb-8 md:mb-0 flex flex-col">
            <h3 className="text-lg font-bold mb-4">Get Help</h3>
            <ul className="list-none space-y-2">
              <li className="hover:translate-x-1 transition-transform">
                <a href="#">FAQ</a>
              </li>
              <li className="hover:translate-x-1 transition-transform">
                <a href="#">Shipping</a>
              </li>
              <li className="hover:translate-x-1 transition-transform">
                <a href="#">Returns</a>
              </li>
              <li className="hover:translate-x-1 transition-transform">
                <a href="#">Order status</a>
              </li>
              <li className="hover:translate-x-1 transition-transform">
                <a href="#">Payment options</a>
              </li>
            </ul>
          </div>
          {/* Online Shop */}
          <div className="mb-8 md:mb-0 flex flex-col">
            <h3 className="text-lg font-bold mb-4">Online Shop</h3>
            <ul className="list-none space-y-2">
              <li className="hover:translate-x-1 transition-transform">
                <a href="#">Download</a>
              </li>
              <li className="hover:translate-x-1 transition-transform">
                <a href="#">Changelog</a>
              </li>
              <li className="hover:translate-x-1 transition-transform">
                <a href="#">GitHub</a>
              </li>
              <li className="hover:translate-x-1 transition-transform">
                <a href="#">All version</a>
              </li>
            </ul>
          </div>

          {/* Social Media Icons */}
          <div className="mb-8 md:mb-0 flex flex-col">
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook className="text-2xl hover:text-blue-400 transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <FaTwitter className="text-2xl hover:text-blue-300 transition-colors" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl hover:text-blue-500 transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 text-center">
  <p>&copy; 2024 ArtGalleryHub. All rights reserved.</p>
 
</div>



      </div>
    </footer>
  );
};

export default Footer;
