"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

// Helper function to validate email format
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    secret: "",
  });

  const [errors, setErrors] = useState({});
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, secret } = formData;

    // Reset errors and confirmation message
    setErrors({});
    setConfirmationMessage("");

    // Validate email
    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      return;
    }

    try {
      const res = await signIn("credentials", {
        redirect: true,
        redirectTo: "/",
        email,
        password,
      });
      if (res.ok) {
        redirect("/");
      }

      // Reset form after successful registration
      setFormData({ email: "", password: "", secret: "" });
    } catch (error) {
      // setErrors((prevErrors) => ({
      //   ...prevErrors,
      //   general: "An error occurred during registration.",
      // }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center text-white mb-8">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm text-gray-400">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 mt-2 text-white bg-gray-700 border ${
                errors.email ? "border-red-600" : "border-gray-600"
              } rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300"
              placeholder="Enter your password"
            />
          </div>

          {/* Secret Field */}
          <div>
            <label htmlFor="secret" className="block text-sm text-gray-400">
              Secret
            </label>
            <input
              type="text"
              id="secret"
              name="secret"
              value={formData.secret}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 mt-2 text-white bg-gray-700 border border-gray-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition duration-300"
              placeholder="Enter the secret"
            />
          </div>

          {/* General Errors */}
          {errors.general && (
            <p className="text-red-500 text-sm text-center">{errors.general}</p>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 transition duration-300"
            >
              Sign In
            </button>
          </div>
        </form>

        {/* Confirmation Message */}
        {confirmationMessage && (
          <p className="text-green-500 text-sm text-center mt-6">
            {confirmationMessage}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
