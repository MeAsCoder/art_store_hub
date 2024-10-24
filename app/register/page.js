"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhoneAlt, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [userType, setUserType] = useState("client");
  const [registerMethod, setRegisterMethod] = useState("phone");
  const [formData, setFormData] = useState({
    phoneOrEmail: "",
    passWord: "",
    agreeToPolicy: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleRegisterMethodChange = (method) => {
    setRegisterMethod(method);
    setFormData({ ...formData, phoneOrEmail: "", passWord: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Prepare the data to send
    const userDetailsDto = {
      userName: formData.phoneOrEmail, // Use phoneOrEmail as userName
      passWord: formData.passWord,
    };
  
    try {
      const response = await fetch("https://spring-boot-art-store-hub-f1791b81256c.herokuapp.com/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userDetailsDto),
      });
  
      // Check the response status
      if (response.status === 201) {
        // Successful registration
        const data = await response.json();
        toast.success("User registered successfully!");
        console.log(data);
        // Optionally redirect the user or perform other actions
      } else if (response.status === 400) {
        // Bad request - handle the error response from the backend
        const errorData = await response.json();
        toast.error("Error registering user: " + (errorData.error || "Unknown error occurred"));
      } else {
        // Handle other status codes (e.g., 500, 404, etc.)
        throw new Error("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      toast.error("Error registering user: " + error.message);
      console.error(error);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
        <h1 className="text-lg font-bold text-center mb-8 text-red-500">
          Register with verification code
        </h1>

        {/* User Type Selection */}
        <div className="mb-6">
          <p className="text-center text-sm font-semibold">
            Join as a Buyer or a Seller Artist?
          </p>
          <div className="flex justify-center gap-4">
            <button
              type="button"
              className={`${
                userType === "client" ? "bg-red-500" : "bg-gray-300"
              } text-white font-semibold py-2 px-4 rounded`}
              onClick={() => setUserType("client")}
            >
              I'm a Buyer, looking for an Art
            </button>
            <button
              type="button"
              className={`${
                userType === "artist" ? "bg-red-500" : "bg-gray-300"
              } text-white font-semibold py-2 px-4 rounded`}
              onClick={() => setUserType("artist")}
            >
              I'm an Artist, looking for Buyers
            </button>
          </div>
        </div>

        {/* Toggle between Phone and Email Registration */}
        <div className="flex justify-between mb-4">
          <button
            className={`flex items-center px-4 py-2 mr-2 rounded ${
              registerMethod === "phone"
                ? "text-red-500 underline"
                : "text-gray-500"
            }`}
            onClick={() => handleRegisterMethodChange("phone")}
          >
            <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
            Phone
          </button>
          <button
            className={`flex items-center px-4 py-2 rounded ${
              registerMethod === "email"
                ? "text-red-500 underline"
                : "text-gray-500"
            }`}
            onClick={() => handleRegisterMethodChange("email")}
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
            Email
          </button>
        </div>

        {/* Input for Phone or Email */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex items-center">
            <input
              type={registerMethod === "phone" ? "tel" : "email"}
              name="phoneOrEmail"
              placeholder={
                registerMethod === "phone"
                  ? "+254 Phone Number"
                  : "Email Address"
              }
              value={formData.phoneOrEmail}
              onChange={handleInputChange}
              className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
            <button
              className="ml-2 text-sm bg-red-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              Send
            </button>
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              name="passWord"
              placeholder="Password"
              value={formData.passWord}
              onChange={handleInputChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-red-400"
              required
            />
          </div>

          {/* Policy Checkbox */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              name="agreeToPolicy"
              checked={formData.agreeToPolicy}
              onChange={handleInputChange}
              className="mr-2"
              required
            />
            <label className="text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-red-500 hover:underline">
                terms and conditions
              </a>
              .
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </form>

        {/* Login Options */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">Or</p>
          <a href="/login" className="text-red-500 hover:underline mb-2">
            Login with Password
          </a>
          <div className="mt-4">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded mb-2">
              Login Via Google
            </button>
            <button className="w-full bg-blue-800 text-white py-2 px-4 rounded">
              Login Via Facebook
            </button>
          </div>
        </div>

        <ToastContainer />
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Register;
