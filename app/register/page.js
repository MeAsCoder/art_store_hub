// pages/register.js
"use client"
import { useState } from 'react'; // Import useState
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast,ToastContainer  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  // State to store form values and errors
  const [formData, setFormData] = useState({
   
    userName: '',
    passWord: '',
    email: '',
    country: '',
    firstName: '',
    newsletter: false,
  });



  const [errors, setErrors] = useState({});
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key.replace(/([A-Z])/g, ' $1')} is required`;
      }
    });
    return newErrors;
  };

  /*
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Handle form submission logic here
      console.log("Form submitted", formData);
    }
  };

*/

const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validateForm();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors); // Set form validation errors
  } else {
    setErrors({}); // Clear errors if validation passes

    try {
      const response = await fetch("https://localhost:9937/api/user/register", {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Specify the request is JSON
        },
        body: JSON.stringify(formData), // Send form data as JSON
      });


      const data = await response.json(); 


      if (!response.ok) {
        // If the username is taken, show the error from the response
        if (response.status == 409) {
          toast.error(data.error || "UserName already taken", {
            position: "top-right",
          });
        } else {
          toast.error(data.error || "An error occurred during registration",{
            position : "top-right",

          });
        
      }
    }

      else {
        console.log("Form submitted successfully", data);
        toast.success("Registered successfully!", {
          position: "top-right", // Use string instead of accessing POSITION
        });
  
        setFormData({
          userName: '',
          passWord: '',
          email: '',
          country: '',
          firstName: '',
          newsletter: false,
        });
      }
    

      // Optionally handle successful registration here (e.g., redirect, display message)
    } catch (error) {
      console.error("Error submitting the form:", error);
      // Optionally set an error state to display in the UI
      toast.error("Registration failed. Please try again.", {
        position: 'top-right',
      });
    }
  }
};



  return (
    <div>
     

      <div className="container mx-auto mt-12 px-4 flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-8 text-red-500 ">Register</h1>

          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            {/* First Name */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                Name
              </label>
              <input
                className={`input input-bordered w-full ${errors.firstName ? 'border-red-500' : ''}`}
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Your First Name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
            </div>

            {/* UserName */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                UserName
              </label>
              <input
                className={`input input-bordered w-full ${errors.userName ? 'border-red-500' : ''}`}
                id="userName"
                name="userName"
                type="text"
                placeholder="Your User Name"
                value={formData.userName}
                onChange={handleChange}
              />
              {errors.userName && <p className="text-red-500 text-xs italic">{errors.userName}</p>}
            </div>

           
                     

            {/* Email */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className={`input input-bordered w-full ${errors.email ? 'border-red-500' : ''}`}
                id="email"
                name="email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            {/*Password field*/}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="passWord">
                Password
              </label>
              <input
                className={`input input-bordered w-full ${errors.passWord ? 'border-red-500' : ''}`}
                id="passWord"
                name="passWord"
                type="passWord"
                placeholder="Your Password"
                value={formData.passWord}
                onChange={handleChange}
              />
              {errors.passWord && <p className="text-red-500 text-xs italic">{errors.passWord}</p>}
            </div>

            {/* Country of Residence */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                Country of Residence
              </label>
              <select
                className={`select select-bordered w-full ${errors.country ? 'border-red-500' : ''}`}
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              >
                <option value="">Select Country</option>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Australia">Australia</option>
                <option value="Canada">Canada</option>
                {/* Add more countries as needed */}
              </select>
              {errors.country && <p className="text-red-500 text-xs italic">{errors.country}</p>}
            </div>

          

            {/* Newsletter Subscription */}
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="newsletter"
                name="newsletter"
                className="mr-2"
                checked={formData.newsletter}
                onChange={handleChange}
              />
              <label htmlFor="newsletter" className="text-gray-700 text-sm">
                I would like to receive email communication and newsletters
              </label>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-gray-700 text-sm">
                I agree to the terms and conditions
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className=" w-full bg-red-500 hover:bg-rose-400 text-white font-bold py-2 px-4 rounded"
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-center text-gray-600">
             Have an account?{' '}
            <a href="/login" className="text-rose-400 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
