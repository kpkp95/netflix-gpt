/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";

const Login = () => {
  // References for form fields
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  // State to track if the form is for signing in or signing up
  const [isSignInForm, setIsSignInForm] = useState(true);
  // State for error messages
  const [errorMessage, setErrorMessage] = useState(null);

  // Handle form submission
  const handleButtonClick = async () => {
    const msg = checkValidData(
      email.current.value,
      password.current.value,
      name.current.value,
      isSignInForm
    );
    setErrorMessage(msg);

    if (msg) return; // if msg is true then return

    if (!isSignInForm) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        const user = userCredential.user;
        if (name.current) {
          await updateProfile(user, {
            displayName: name.current.value,
          });
        }
        alert("Sign-Up successful!");
      } catch (error) {
        setErrorMessage(error.code + +error.message);
      }
    } else {
      //signin
      try {
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
        alert("Sign-In successful!");
      } catch (error) {
        setErrorMessage(error.code + +error.message);
      }
    }
  };

  // Toggle between sign-in and sign-up forms

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null); // Clear error message when toggling
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/ed3169bc-bae8-4c49-80ed-bab82d071166/CA-en-20240617-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()} // Prevent default form submission
        className="p-12 w-3/12 absolute bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm ? (
          <input
            ref={name}
            type="Name"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          />
        ) : null}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg "
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        {errorMessage && (
          <p className="text-red-600 font-bold text-lg py-2">{errorMessage}</p>
        )}
        <button
          className="p-4 my-4 w-full bg-red-600 rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already suscribed? Sign In now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
