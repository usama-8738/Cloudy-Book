import "./App.css";
import React, { useEffect } from "react";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import About from "./Components/About";
import Contact from "./Components/ContactUs";
import PrimaryNav from "./Components/PrimaryNav";
import NoteState from "./context/note/NoteState";
import UserState from "./context/auth/UserState";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router";
import AlertState from "./context/uiContexts/AlertState";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import VerifyEmail from "./Components/VerifyEmail";
import ForgotPassword from "./Components/ForgetPassword";
import LandingPage from "./Components/LandingPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = React.useState(
    !!localStorage.getItem("token")
  );
  useEffect(() => {
    // Monitor token changes for updates in login state
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  return (
    <NoteState>
      <AlertState>
        <UserState>
          <Router>
            <div className="min-h-screen flex flex-col">
              {isLoggedIn && <PrimaryNav setIsLoggedIn={setIsLoggedIn} />}
              <Routes>
                <Route
                  path="/"
                  element={isLoggedIn ? <Home /> : <Navigate to="/landing" />}
                />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/login"
                  element={<Login setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/signup" element={<SignUp />} />
                <Route
                  path="/verify-email"
                  element={<VerifyEmail setIsLoggedIn={setIsLoggedIn} />}
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
              {isLoggedIn && <Footer />}
            </div>
          </Router>
        </UserState>
      </AlertState>
    </NoteState>
  );
}

export default App;
