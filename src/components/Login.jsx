/* eslint-disable jsx-a11y/heading-has-content */
import React, { useState, useRef } from "react";

import Header from "./Header";
import { validateSignUpData, validateSignInData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  // References for form fields
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // State to track if the form is for signing in or signing up
  const [isSignInForm, setIsSignInForm] = useState(true);
  // State for error messages
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Firebase errors
  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        return "This email is already in use.";
      case "auth/invalid-email":
        return "Invalid email address format.";
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/user-not-found":
        return "No user found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      default:
        return "An unexpected error occurred. Please try again.";
    }
  };

  // Handle form submission for Sign Up
  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = userCredential.user;

      if (nameRef.current) {
        await updateProfile(user, { displayName: nameRef.current.value });
      }
      const { uid, email, displayName } = auth.currentUser;
      dispatch(addUser({ uid, email, displayName }));

      alert("Sign-Up successful!");
    } catch (error) {
      setErrorMessage(handleFirebaseError(error));
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for Sign In
  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      );
      const user = userCredential.user;

      alert("Sign-In successful!");
    } catch (error) {
      setErrorMessage(handleFirebaseError(error));
    } finally {
      setLoading(false);
    }
  };

  // Handle button click for form submission
  const handleButtonClick = async () => {
    setLoading(true);
    let msg;

    if (isSignInForm) {
      msg = validateSignInData(
        emailRef.current.value,
        passwordRef.current.value
      );
      if (msg) {
        setErrorMessage(msg);
        setLoading(false);
        return;
      }
      await handleSignIn();
    } else {
      msg = validateSignUpData(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value
      );
      if (msg) {
        setErrorMessage(msg);
        setLoading(false);
        return;
      }
      await handleSignUp();
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
      <div className="absolute inset-0">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/a56dc29b-a0ec-4f6f-85fb-50df0680f80f/ed3169bc-bae8-4c49-80ed-bab82d071166/CA-en-20240617-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="bg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 max-w-md mx-auto absolute bg-black bg-opacity-80 my-36 right-0 left-0 rounded-lg shadow-lg text-white"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            ref={nameRef}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
            aria-label="Full Name"
          />
        )}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          aria-label="Email"
        />
        <input
          ref={passwordRef}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          aria-label="Password"
        />
        {errorMessage && (
          <p
            className="text-red-600 font-bold text-lg py-2"
            aria-live="assertive"
          >
            {errorMessage}
          </p>
        )}
        <button
          className={`p-4 my-4 w-full bg-red-600 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleButtonClick}
          disabled={loading}
        >
          {loading ? "Processing..." : isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already subscribed? Sign In now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
