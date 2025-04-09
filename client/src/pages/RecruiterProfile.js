import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const RecruiterProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
          setFormData({
            name: docSnap.data().name || "",
            email: docSnap.data().email || "",
            company: docSnap.data().company || "",
          });
        }
      } catch (err) {
        console.error("Error fetching recruiter profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateDoc(doc(db, "users", user.uid), formData);
      setProfile(formData);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) return <p className="p-4">Loading profile...</p>;
  if (!profile) return <p className="p-4 text-red-600">No profile data found.</p>;

  return (
    <div className="max-w-2xl mx-auto mt-8 bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Recruiter Profile</h2>

      {editing ? (
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Your Name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Your Email"
            disabled
          />
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Company Name"
          />
          <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
          <p><strong>Company:</strong> {profile.company || "Not specified"}</p>
          <button onClick={() => setEditing(true)} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default RecruiterProfile;
