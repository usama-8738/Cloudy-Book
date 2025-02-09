import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import UserContext from "../context/auth/UserContext";

const SignUp = () => {
  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [isVerificationPending, setIsVerificationPending] = useState(false);

  const trustedDomains = [
    "gmail.com",
    "hotmail.com",
    "outlook.com",
    "yahoo.com",
    "icloud.com",
    "live.com",
  ];

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "name":
        if (value.length < 3) {
          error = "Name must be at least 3 characters long.";
        }
        break;
      case "email":
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const domain = value.split("@")[1];
        if (!emailPattern.test(value)) {
          error = "Please enter a valid email.";
        } else if (!trustedDomains.includes(domain)) {
          error = `The email provider '${domain}' is not supported.`;
        }
        break;
      case "password":
        if (value.length < 8) {
          error = "Password must be at least 8 characters long.";
        } else if (!/\d/.test(value)) {
          error = "Password must contain at least one number.";
        } else if (!/[A-Z]/.test(value)) {
          error = "Password must contain at least one uppercase letter.";
        } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
          error = "Password must contain at least one special character.";
        }
        break;

      case "checkPassword":
        if (value !== userData.password) {
          error = "Passwords do not match.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isFormValid = () => {
    return (
      userData.name &&
      userData.email &&
      userData.password &&
      userData.checkPassword &&
      !errors.name &&
      !errors.email &&
      !errors.password &&
      !errors.checkPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      setIsVerificationPending(true);
      const result = await registerUser(
        userData.name,
        userData.email,
        userData.password
      );
      if (result?.success) {
        navigate("/verify-email", { state: { email: userData.email } });
        setSuccessMessage(result.data.message);
      } else if (result?.message === "Email already in use.") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email:
            "This email is already registered. Please use a different one.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: result?.error || "Registration failed. Please try again.",
        }));
      }
      setIsVerificationPending(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-100 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Sign Up
        </h2>
        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 rounded-md mb-4">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.name ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="Enter your name"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="Enter your email"
              required
            />
            {errors.email && (
              <div className="bg-red-100 text-red-700 p-2 rounded-md mt-2">
                {errors.email}
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={userData.password}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="Enter your password"
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              name="checkPassword"
              value={userData.checkPassword}
              onChange={handleChange}
              className={`w-full px-4 py-2 border ${
                errors.checkPassword ? "border-red-500" : "border-gray-300"
              } rounded-lg`}
              placeholder="Re-enter your password"
              required
            />
            {errors.checkPassword && (
              <p className="text-red-500 text-sm">{errors.checkPassword}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={!isFormValid() || isVerificationPending}
            className={`w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600 ${
              isFormValid() && !isVerificationPending
                ? "opacity-100"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            {isVerificationPending ? "Processing..." : "Sign Up"}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <NavLink
            to="/login"
            className="text-sky-500 hover:text-sky-600 font-medium"
          >
            Sign in
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
