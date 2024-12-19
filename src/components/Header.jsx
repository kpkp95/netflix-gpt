import React, { useState, useRef, useEffect } from "react";
import { auth } from "../utils/firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { LOGO, PROFILE_LOGO } from "../utils/constant";

import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { SUPPORTED_LANGUAGES } from "../utils/constant";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleLogoClick = () => {
    if (showGptSearch) {
      dispatch(toggleGptSearchView());
    }
    navigate("/browse");
  };
  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  const handleSignOutClick = () => {
    setIsDropdownOpen(false);
    handleSignOut();
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => console.log("Successfully signed out"))
      .catch((error) => {
        alert("Failed to sign out. Please try again.");
        console.error(`Sign-out error [${error.code}]:`, error.message);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        if (window.location.pathname !== "/browse") {
          navigate("/browse");
        }

        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

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
    <div className="absolute px-8 xl:px-8 py-2 bg-gradient-to-b w-full from-black z-10 flex flex-col items-center md:flex-row md:justify-between ">
      {/* Netflix Logo */}
      <img
        className="w-32 xs:w-36  md:w-44 mx-auto md:mx-0"
        src={LOGO}
        alt="Netflix logo"
        onClick={handleLogoClick}
      />

      {/* Profile Section */}
      {user && (
        <div className="relative md:mt-0 " ref={dropdownRef}>
          <div className="flex items-center justify-center space-x-2">
            {showGptSearch && (
              <select
                className="p-2 bg-gray-800 text-white rounded-lg"
                onChange={handleLanguageChange}
              >
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <option
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 transition-colors"
                    key={lang.identifier}
                    value={lang.identifier}
                  >
                    {lang.name}
                  </option>
                ))}
              </select>
            )}
            <button
              className="py-1 px-1 m-1 xs:py-2 xs:px-2  xs:m-2 bg-red-600 text-white  rounded-lg hover:bg-red-700 transition-colors"
              onClick={handleGptSearchClick}
            >
              {showGptSearch ? "Home Page" : "GPT Search"}
            </button>

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
              className="text-white hidden md:block hover:text-gray-300 transition-colors"
              onClick={handleSignOut}
            >
              Sign Out
            </button>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg transition-all duration-300 transform origin-top opacity-100"
              aria-label="User Menu"
            >
              <ul className="py-1 text-gray-700" role="menu">
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 transition-colors"
                    role="menuitem"
                  >
                    Settings
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200 transition-colors"
                    onClick={handleSignOutClick}
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
