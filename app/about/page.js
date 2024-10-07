// app/about/page.js
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPalette, faUsers,faStar,faCheckCircle, faHandshake } from '@fortawesome/free-solid-svg-icons';
import Footer from '../components/Footer';



const About = () => {
  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://i.ebayimg.com/images/g/jLgAAOSw6Ptl95ow/s-l960.jpg')",
          backgroundAttachment: 'fixed',
        }}
      />
      {/* Content Over Background */}
      <div className="relative z-10 bg-black bg-opacity-50 p-8 text-white min-h-screen flex flex-col justify-center">
        <article className="container mx-auto px-4 lg:px-8">
          {/* Heading Section */}
          <section className="text-center py-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-rose-300">About ArtGalleryHub</h1>
            <p className="text-xl lg:text-2xl mb-6">
              Discover the world&apos;s finest original art paintings from talented artists.
            </p>
            <p className="text-lg max-w-3xl mx-auto">
              At ArtGalleryHub, we believe in connecting art lovers with unique, inspiring creations from artists worldwide. Each piece tells a story, captures emotions, and brings color and creativity into your life.
            </p>
          </section>

          {/* Icons Section */}
          <section className="flex flex-wrap justify-center gap-8 py-12">
            <article className="flex flex-col items-center text-center p-4">
            <FontAwesomeIcon icon={faPalette} className="text-rose-300 text-4xl mb-4" />


              <h2 className="text-xl font-semibold text-rose-300">Exclusive Art Pieces</h2>
              <p className="max-w-xs">
                We offer a wide selection of original paintings, from abstract to realistic, carefully curated for their unique quality.
              </p>
            </article>

            <article className="flex flex-col items-center text-center p-4">
              <FontAwesomeIcon icon={faUsers} className="text-4xl mb-4 text-rose-300" />
              <h2 className="text-xl font-semibold text-rose-300">Support Local Artists</h2>
              <p className="max-w-xs">
                We are proud to promote the work of both emerging and established artists, giving them a platform to showcase their talent.
              </p>
            </article>

            <article className="flex flex-col items-center text-center p-4">
              <FontAwesomeIcon icon={faHandshake} className="text-4xl mb-4 text-rose-300" />
              <h2 className="text-xl font-semibold text-rose-300">Customer Satisfaction</h2>
              <p className="max-w-xs">
                We are dedicated to offering exceptional customer service, ensuring a smooth buying experience from start to finish.
              </p>
            </article>
          </section>






  {/* Art Sampling Process */}
  <div className="mb-10">
      <div className='flex justify-center items-center mb-4'>
      <FontAwesomeIcon icon={faStar} className="text-rose-300 text-4xl mb-4 flex" />
      <h3 className="text-2xl font-semibold mb-4 text-center">Our Art Sampling Process</h3>
      <FontAwesomeIcon icon={faStar} className="text-rose-300 text-4xl mb-4 flex" />
      </div>
      <p className="text-lg mb-4">To ensure that every piece of art in our gallery reflects the highest quality and creativity, we have implemented a rigorous sampling process. Here&apos;s how we ensure only the best pieces are displayed:</p>
     
      {/* Step 1 */}
      <div className="flex items-center mb-6">
        <FontAwesomeIcon icon={faCheckCircle} className="text-rose-300 text-3xl mr-4" />
        <div>
          <h4 className="text-xl font-bold">Step 1: Initial Submission</h4>
          <p className="text-md">Artists submit their artwork through our secure portal. Each piece is carefully reviewed for its originality, style, and craftsmanship.</p>
        </div>
      </div>

      {/* Step 2 */}
      <div className="flex items-center mb-6">
        <FontAwesomeIcon icon={faCheckCircle} className="text-rose-300 text-3xl mr-4" />
        <div>
          <h4 className="text-xl font-bold">Step 2: Quality Assessment</h4>
          <p className="text-md">Our team of art curators conducts a detailed quality check, ensuring the piece meets our standards for material, technique, and durability.</p>
        </div>
      </div>

      {/* Step 3 */}
      <div className="flex items-center mb-6">
        <FontAwesomeIcon icon={faCheckCircle} className="text-rose-300 text-3xl mr-4" />
        <div>
          <h4 className="text-xl font-bold">Step 3: Audience Appeal Review</h4>
          <p className="text-md">We evaluate how well each artwork aligns with current trends and customer preferences, ensuring that the piece appeals to our clientele.</p>
        </div>
      </div>

      {/* Step 4 */}
      <div className="flex items-center mb-6">
        <FontAwesomeIcon icon={faCheckCircle} className="text-rose-300 text-3xl mr-4" />
        <div>
          <h4 className="text-xl font-bold">Step 4: Final Approval</h4>
          <p className="text-md">Once a piece passes all checks, it is listed on our platform. We provide the artist with full credit, giving them the exposure they deserve.</p>
        </div>
      </div>

      {/* Conclusion */}
      <p className="text-lg">With our comprehensive process, we ensure that the art featured on our platform is not only visually stunning but also crafted to perfection, making your investment in art worthwhile.</p>
    </div>







          {/* Mission Statement Section */}
          <section className="py-12 text-center">
            <h2 className="text-3xl font-bold mb-6 text-rose-300">Our Mission</h2>
            <p className="text-lg max-w-4xl mx-auto">
              Our mission is to make high-quality, original art accessible to everyone. Whether You&apos;re an art collector or simply looking to decorate your space, we’re here to help you find the perfect piece.
            </p>
          </section>

          {/* Vision Section */}
          <section className="flex flex-col lg:flex-row items-center justify-between gap-12 py-12">
            <article className="flex-1">
              <h2 className="text-3xl font-bold mb-4 text-rose-300">Our Vision</h2>
              <p className="text-lg">
                We envision a world where art is an integral part of every home, inspiring creativity and connection. By providing a platform for artists and art lovers to connect, we aim to foster a global art community.
              </p>
            </article>
            <article className="flex-1">
              <img
                src="https://i.ebayimg.com/images/g/OxgAAMXQoYJSKTU-/s-l1600.webp"
                alt="Vision Image"
                className="rounded-sm shadow-lg object-cover"
              />
            </article>
          </section>

          {/* Call to Action Section */}
          <section className="py-12 text-center bg-gray-900 bg-opacity-80 rounded-lg">
            <h2 className="text-3xl font-bold mb-4">Ready to Bring Art Into Your Home?</h2>
            <p className="text-lg max-w-2xl mx-auto mb-6">
              Browse our collection of beautiful, one-of-a-kind pieces that will transform your living space and support artists worldwide.
            </p>
            <a href="/" className="btn bg-rose-400 hover:bg-rose-200 text-white px-8 py-3">
              Start Shopping
            </a>
          </section>
        </article>
      </div>
      
    </div>
  );
};

export default About;
