import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import UserContext from "../context/auth/UserContext";

const Login = ({ setIsLoggedIn }) => {
  const { authUser } = useContext(UserContext);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authUser(userData.email, userData.password);
      if (result?.token) {
        if (rememberMe) {
          localStorage.setItem("token", result.token);
        } else {
          sessionStorage.setItem("token", result.token);
        }
        setUserData({ email: "", password: "" });
        setIsLoggedIn(true);
        navigate("/");
      } else {
        alert("Invalid Email or Password");
      }
    } catch (error) {
      console.error("Login Error:", error.message);
      alert("An error occurred. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div className="bg-cloudybook-dark-grey min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={userData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={handleRememberMeChange}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <NavLink
              to="/forgot-password"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </NavLink>
          </div>
          <button
            type="submit"
            className="w-full bg-sky-500 text-white py-2 rounded-lg hover:bg-sky-600"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <NavLink
            to="/signup"
            className="text-sky-500 hover:text-sky-600 font-medium"
          >
            Sign up
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
