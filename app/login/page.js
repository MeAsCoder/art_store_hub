"use client"
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { toast } from 'react-toastify'; // Ensure react-toastify is installed

const Login = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: ''
  }); // Initialize formData state

  const [errors, setErrors] = useState({}); // State for form validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); // Update formData state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("https://localhost:9937/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        const responseData = await response.json(); // Parse the response

        // Check if the response contains a token
        if (response.ok && responseData.token) {
            // If login is successful, show success message
            toast.success("Login successful!", {
                position: "top-right",
            });

            // Handle successful login (e.g., store token, redirect, etc.)
            // Example: localStorage.setItem('token', responseData.token);

        } else {
            // If login failed or token is missing, show error message
            toast.error(responseData.error || "Login failed. Please check your credentials.", {
                position: "top-right",
            });
        }
    } catch (error) {
        console.error("Error logging in:", error);
        // Show error toast notification for network errors or other issues
        toast.error("Login failed. Please try again.", {
            position: "top-right",
        });
    }
};


  return (
    <div>
      
      <div className="container mx-auto mt-12 px-4 flex justify-center">
        <div className="w-full max-w-md">
          <h1 className="text-4xl font-bold text-center mb-8">Login</h1>

          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                User Name
              </label>
              <input
                className="input input-bordered w-full"
                id="userName"
                name="userName" // Set name attribute for handling state
                type="text"
                placeholder="Your User Name"
                value={formData.userName} // Set value from state
                onChange={handleChange} // Update state on change
                required // Optional: Make the field required
              />
              {errors.userName && <p className="text-red-500 text-xs italic">{errors.userName}</p>} {/* Error message */}
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="input input-bordered w-full"
                id="password"
                name="password" // Set name attribute for handling state
                type="password"
                placeholder="********"
                value={formData.password} // Set value from state
                onChange={handleChange} // Update state on change
                required // Optional: Make the field required
              />
              {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>} {/* Error message */}
            </div>

            {/* Login Button */}
            <div className="flex items-center justify-between">
              <button className="btn bg-rose-400 w-full" type="submit">
                Login
              </button>
            </div>
          </form>

          <p className="text-center text-gray-600">
          Don&apos;t have an account?{' '}
            <a href="/register" className="text-rose-400 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </div>
      
    </div>
  );
};

export default Login;
