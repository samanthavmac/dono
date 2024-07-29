"use client"; // Sign in from client side

import { signIn } from 'next-auth/react';

const GoogleSignInButton = () => {
  const handleSignIn = () => {
    signIn('google'); // For Google OAuth sign-in process
  };

  return (
    <button onClick={handleSignIn} className="google-signin-button">
      Sign in with Google
    </button>
  );
};

export default GoogleSignInButton;
