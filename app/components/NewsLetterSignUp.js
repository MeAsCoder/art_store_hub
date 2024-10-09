const NewsletterSignUp = () => {
    return (
      <div className="my-8 p-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up for Our Newsletter</h2>
        <form className="mt-4">
          <input type="email" placeholder="Enter your email" className="p-2 border rounded w-1/2" required />
          <button type="submit" className="ml-2 p-2 bg-rose-500 text-white rounded">Subscribe</button>
        </form>
      </div>
    );
  };
  
  export default NewsletterSignUp;
  