import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email for password reset instructions.");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        {message && <p className="text-blue-600 text-center">{message}</p>}
        <form onSubmit={handleReset}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="w-full bg-orange-600 text-white p-3 rounded">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
