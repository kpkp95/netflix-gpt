import React, { useState, useRef, useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { LOGO, PROFILE_LOGO } from "../utils/constant";

import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        alert("Failed to sign out. Please try again.");
        console.error("Sign out error:", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");

        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b w-full from-black z-10 flex justify-between items-center">
      {/* Netflix Logo */}
      <img className="w-44" src={LOGO} alt="logo" />

      {/* Profile Section */}
      {user && (
        <div className="relative" ref={dropdownRef}>
          <div className="flex items-center space-x-2">
            {/* Profile Icon */}

            <button
              onClick={handleDropdownToggle}
              aria-haspopup="true"
              aria-expanded={isDropdownOpen}
              className="flex items-center justify-center"
            >
              <img
                className="w-8 h-8 rounded-full cursor-pointer"
                alt="user icon"
                src={PROFILE_LOGO}
              />
            </button>
            {/* Sign Out Button */}
            <button
              className="text-white hidden md:block"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg transition duration-300 transform origin-top opacity-100">
              <ul className="py-1 text-gray-700" role="menu">
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    role="menuitem"
                  >
                    Settings
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
                    onClick={handleSignOut}
                    role="menuitem"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
