import { useState } from "react";
import { GoMoon } from "react-icons/go";
import { RiCloseLine, RiMenu3Line } from "react-icons/ri";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

const navLinks = [
  { to: "/", name: "Home" },
  { to: "/courses", name: "Courses" },
  { to: "#", name: "About" },
  { to: "#", name: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { profile, isLoggedIn, logout } = useAuth();

  const dashboardPath =
    profile?.role === "teacher" ? "/dashboard/teacher" : "/dashboard/student";

  // Get first letter of fullname
  const getInitials = () => {
    if (profile?.fullname) {
      return profile.fullname[0].toUpperCase();
    }
    return "U";
  };

  return (
    <header className="sticky top-0 left-0 z-20 border-b-2 border-gray-300 bg-white p-2 transition duration-300">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between">
        {/* Logo */}
        <Link to="/">
          <img className="w-40" src={logo} alt="Logo" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden space-x-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="text-base text-text-color transition duration-200 hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="relative flex items-center space-x-6 transition duration-300">
          <GoMoon className="cursor-pointer text-xl" />

          {/* If logged in */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="flex items-center justify-center h-8 w-8 rounded-full bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent cursor-pointer"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                {getInitials()}
              </button>

              {/* Dropdown */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-32 rounded-md border bg-white border-gray-300 shadow-md"
                  >
                    <Link
                      onClick={() => setDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      to={dashboardPath}
                    >
                      Dashboard
                    </Link>
                    <Link
                      onClick={() => setDropdownOpen(false)}
                      className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
                      to={`${dashboardPath}/profile`}
                    >
                      Profile
                    </Link>

                    <button
                      onClick={logout}
                      className="block bg-red-500 w-full px-4 py-2 text-left text-sm hover:bg-red-600 text-white cursor-pointer"
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            // If not logged in
            <Link
              to="/login"
              className="rounded-md bg-primary px-4 py-2 text-white transition duration-200 hover:bg-primary-dark"
            >
              Login
            </Link>
          )}

          {/* Hamburger for mobile */}
          <div className="block lg:hidden">
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="cursor-pointer"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <RiCloseLine size={24} /> : <RiMenu3Line size={24} />}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Links */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6 bg-footer py-6 text-lg font-medium capitalize text-end"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="block pr-8 text-text-color transition duration-300 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {!isLoggedIn && (
              <Link
                to="/signup"
                className="block mr-5 text-text-color transition duration-300 hover:text-primary bg-primary px-4 py-2 text-white rounded-md w-max ml-auto"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
