import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../Providers/AuthProvider";
import { ThemeContext } from "../Providers/ThemeProvider";
import logo from "../assets/logo/logo.png";

const Navbar = () => {
  const { user, handleLogout } = useContext(authContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate("/login");
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/allFoods", label: "All Foods" },
    { path: "/gallery", label: "Gallery" },
  ];

  return (
    <div
      className={`sticky top-0 z-50 shadow-lg ${theme === "dark" ? "bg-gray-900 text-white" : "bg-green-800 text-white"
        } transition-all duration-300 ease-in-out`}
    >
      <div className="navbar container mx-auto p-4">
        
        <div className="navbar-start flex items-center gap-2">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn btn-ghost lg:hidden"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className={`menu menu-sm dropdown-content mt-3 z-[1] shadow ${theme === "dark" ? "bg-gray-800" : "bg-green-50"} rounded-box w-52`}
            >
              {navLinks.map(({ path, label }, index) => (
                <li key={index}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-white font-semibold"
                        : "hover:text-green-100"
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <NavLink to="/" className="flex items-center gap-2">
            <img
              className="h-12 transition-transform duration-300 transform hover:scale-110"
              src={logo}
              alt="Website Logo"
            />
            <span className="font-bold text-2xl"></span>
          </NavLink>
        </div>

        {/* Navigation Links (Large screens) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-8">
            {navLinks.map(({ path, label }, index) => (
              <li key={index}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-green-600 font-semibold border-b-2 border-green-600"
                      : "hover:text-green-600 hover:border-b-2 hover:border-green-600 transition-all"
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Section: Theme Toggle + User Profile */}
        <div className="navbar-end flex items-center gap-6">
          {/* Theme Toggle Button */}
          <label className="flex cursor-pointer gap-2 items-center">
            <input
              type="checkbox"
              checked={theme === "dark"}
              onChange={toggleTheme}
              className="toggle theme-controller"
              aria-label="Toggle Theme"
            />
            <span className="sr-only">Toggle Theme</span>
          </label>

          {/* Conditional Login/Logout */}
          {user ? (
            <div className="dropdown dropdown-end font-semibold">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar tooltip tooltip-bottom"
                data-tip={user.displayName || "User"}
              >
                <img
                  className="w-12 h-12 rounded-full transition-all duration-200 ease-in-out transform hover:scale-110"
                  src={user.photoURL || "https://via.placeholder.com/150"}
                  alt="User Avatar"
                />
              </label>
              <ul
                tabIndex={0}
                className={`menu menu-sm dropdown-content mt-3 shadow ${theme === "dark" ? "bg-gray-800 text-white" : "bg-green-100 text-gray-800"} rounded-box w-52`}
              >
                <li>
                  <NavLink to="/myFoods" className="block py-2 px-4 hover:bg-gray-200">
                    My Foods
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/addFood" className="block py-2 px-4 hover:bg-gray-200">
                    Add Food
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/myOrders" className="block py-2 px-4 hover:bg-gray-200">
                    My Orders
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block py-2 px-4 text-red-600 hover:bg-gray-200 w-full text-left"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login">
              <button className="btn btn-neutral text-lg px-6 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-green-600 hover:text-white">
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
