import React from "react";
import UserContext from "./UserContext";

const host = "http://localhost:5000";

const UserState = ({ children }) => {
  // Function to authenticate a user (login)
  const authUser = async (email, password) => {
    const url = `${host}/api/auth/login`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorMessage = `Login failed with status ${response.status}`;
        console.error(errorMessage);
        return { success: false, error: errorMessage };
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);
      return { success: true, token: result.token, data: result };
    } catch (error) {
      console.error("Error Authenticating User:", error.message);
      return { success: false, error: error.message };
    }
  };

  // Function to register a new user (signup)
  const registerUser = async (name, email, password) => {
    const url = `${host}/api/auth/register`;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const errorMessage = `Registration failed with status ${response.status}`;
        console.error(errorMessage);
        return { success: false, error: errorMessage };
      }
      const result = await response.json();
      localStorage.setItem("token", result.token);
      console.log("User Registered Successfully:", result);
      return { success: true, data: result };
    } catch (error) {
      console.error("Error Registering User:", error.message);
      return { success: false, error: error.message };
    }
  };

  // Context provider
  return (
    <UserContext.Provider value={{ authUser, registerUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserState;
