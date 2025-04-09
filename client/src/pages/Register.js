import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/firebaseConfig"; // ✅ Firestore setup
import { doc, setDoc } from "firebase/firestore";       // ✅ Firestore API

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "job_seeker",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password, role } = formData;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      console.log("✅ Firebase user created:", user.uid);

      // ✅ Save additional user info (name, role) to Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name,
        email,
        role,
        company: role === "recruiter" ? "Your Company Name" : "",
        createdAt: new Date(),
      });

      // ✅ Redirect based on role
      navigate(role === "recruiter" ? "/recruiter-dashboard" : "/dashboard");
    } catch (error) {
      console.error("❌ Firebase registration error:", error.code);
      if (error.code === "auth/email-already-in-use") {
        setError("This email is already registered. Try logging in.");
      } else {
        setError("Registration failed: " + error.message);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-4 text-center">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg"
        />

        <label className="block font-semibold">Sign up as:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
        >
          <option value="job_seeker">Job Seeker</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg"
        >
          Register
        </button>

        {error && <p className="text-red-600 mt-2">{error}</p>}

        <div className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
