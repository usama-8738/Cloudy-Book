import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";

const changeAppTitle = (appTitle) => {
  document.title = appTitle;
};

const PrimaryNav = ({ setIsLoggedIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="max-md:h-auto">
      <nav className="bg-cloudybook-dark-grey font-semibold text-white navbar rounded-box shadow">
        {/* Navbar Start */}
        <div className="navbar-start">
          <NavLink
            className="link text-base-content link-neutral text-xl font-semibold no-underline"
            to="/"
            onClick={() => changeAppTitle("Cloudy Book | Home")}
          >
            Cloudy Book
          </NavLink>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden md:flex justify-center">
          <ul className="gap-2 py-2 text-base flex flex-row rounded">
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-sky-500 text-white px-3 py-2 rounded"
                    : "hover:bg-sky-600 hover:text-white px-3 py-2 rounded"
                }
                to="/"
                onClick={() => changeAppTitle("Cloudy Book | Home")}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-sky-500 text-white px-3 py-2 rounded"
                    : "hover:bg-sky-600 hover:text-white px-3 py-2 rounded"
                }
                to="/about"
                onClick={() => changeAppTitle("Cloudy Book | About US")}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "bg-sky-500 text-white px-3 py-2 rounded"
                    : "hover:bg-sky-600 hover:text-white px-3 py-2 rounded"
                }
                to="/contact"
                onClick={() => changeAppTitle("Cloudy Book | Contact US")}
              >
                Contact Us
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden navbar-end">
          <button
            className="btn btn-ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="icon-[tabler--menu-2] size-6"></span>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 w-full z-50 md:hidden">
            <ul className="bg-cloudybook-grey menu menu-vertical p-2 gap-2">
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-sky-500 text-white px-3 py-2 rounded"
                      : "hover:bg-sky-500 hover:text-white px-3 py-2 rounded"
                  }
                  to="/"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-sky-500 text-white px-3 py-2 rounded"
                      : "hover:bg-sky-500 hover:text-white px-3 py-2 rounded"
                  }
                  to="/about"
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "bg-sky-500 text-white px-3 py-2 rounded"
                      : "hover:bg-sky-500 hover:text-white px-3 py-2 rounded"
                  }
                  to="/contact"
                >
                  Contact Us
                </NavLink>
              </li>

              {!localStorage.getItem("token") ? (
                <ul>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sky-500 text-white px-3 py-2 rounded"
                          : "hover:bg-sky-500 hover:text-white px-3 py-2 rounded"
                      }
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className={({ isActive }) =>
                        isActive
                          ? "bg-sky-500 text-white px-3 py-2 rounded"
                          : "hover:bg-sky-500 hover:text-white px-3 py-2 rounded"
                      }
                      to="/signup"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </ul>
              ) : (
                <li
                  className="text-white px-3 py-2 rounded hover:bg-sky-500 cursor-pointer"
                  onClick={handleLogout}
                >
                  Log Out
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Navbar End for Larger Screens */}
        {!localStorage.getItem("token") ? (
          <div className="navbar-end hidden md:flex items-center gap-4">
            <NavLink className="btn btn-info" to="/login">
              Login
            </NavLink>
            <NavLink className="btn btn-info" to="/signup">
              Sign Up
            </NavLink>
          </div>
        ) : (
          <div className="navbar-end hidden md:flex items-center gap-4">
            <button onClick={handleLogout} className="btn btn-info">
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
};

export default PrimaryNav;
