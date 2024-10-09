const ArtistSpotlight = () => {
    const artists = [
      {
        name: "Jane Mwangi",
        description: "Jane Mwangi is a contemporary artist known for her vibrant landscapes that capture the beauty of Africa. Her work blends traditional techniques with modern aesthetics.",
        image: "https://png.pngtree.com/png-vector/20240518/ourlarge/pngtree-african-american-male-avatar-png-image_12480657.png" // Placeholder for the artist's image
      },
      {
        name: "Kofi Aidoo",
        description: "Kofi Aidoo creates stunning abstract pieces that explore themes of identity and belonging. His art is a reflection of his experiences and cultural heritage.",
        image: "/path/to/kofi-image.jpg" // Placeholder for the artist's image
      },
      {
        name: "Fatima Ibrahim",
        description: "Fatima Ibrahim's art is inspired by the rich textiles of her homeland. She uses mixed media to create intricate patterns that tell stories of her culture.",
        image: "/path/to/fatima-image.jpg" // Placeholder for the artist's image
      },
    ];
  
    return (
      <div className="bg-cover bg-center py-8" style={{ backgroundImage: "url('/path/to/your/background-image.jpg')" }}>
        <article className="bg-white bg-opacity-90 shadow-md rounded-lg p-6 mx-auto max-w-3xl">
          <h2 className="text-2xl font-bold text-center text-rose-500">Artist Spotlight</h2>
          <div className="mt-4">
            {artists.map((artist, index) => (
              <div key={index} className="text-center mb-6">
                <img 
                  src={artist.image} 
                  alt={`${artist.name}'s artwork`} 
                  className="rounded-lg w-full h-48 object-cover mb-2" 
                />
                <h3 className="text-xl font-semibold">{artist.name}</h3>
                <p className="text-gray-700">{artist.description}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    );
  };
  
  export default ArtistSpotlight;
  