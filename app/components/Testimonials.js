import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Testimonials = () => {
  const testimonials = [
    { quote: "I recently purchased a beautiful piece of art, and it has transformed my living room! The colors are vibrant and the quality is amazing.", name: "John, Kilimani" },
    { quote: "My bedroom looks so much more lively now with this artwork! It's the best purchase I've made for my home decor.", name: "Monica, Runda" },
    { quote: "The art piece fits perfectly in my office space. It adds a touch of creativity and professionalism to the environment.", name: "Alison, Lavington" },
    { quote: "Absolutely love it! It's now the focal point of my living room, and I get so many compliments from visitors.", name: "Maryline, Loresho" },
    { quote: "This artwork brings such warmth and charm to my hallway. It truly feels like it was made for the space!", name: "Jonathan, Westlands" },
    { quote: "The colors are so vibrant and uplifting. Every morning when I walk into the dining room, it brightens my mood.", name: "Beatrice, Karen" },
    { quote: "The piece adds a unique touch to our home office. We've received numerous compliments during video calls!", name: "David, Riverside" },
    { quote: "Our bedroom has completely transformed with this art. The detail and quality are simply remarkable!", name: "Esther, Kileleshwa" },
    { quote: "This artwork adds life and sophistication to my living room. It's exactly what I needed to complete the space.", name: "Felix, Runda" },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };

  return (
    <div className="bg-cover bg-center py-8" style={{ backgroundImage: "url('https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/1-savannah-song-catherine-hollywood.jpg')" }}>
      <div className="bg-white bg-opacity-80 shadow-md rounded-lg p-4 mx-auto max-w-3xl">
        <h2 className="text-2xl font-bold text-center text-rose-400">Testimonials</h2>
        <div className="mt-4">
          <Slider {...settings}>
            {testimonials.map((item, index) => (
              <div key={index} className="text-center p-4">
                <blockquote className="italic text-gray-700 text-lg">
                  &quot;{item.quote}&quot;
                </blockquote>
                <p className="mt-2 text-sm text-gray-500">— {item.name}</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
