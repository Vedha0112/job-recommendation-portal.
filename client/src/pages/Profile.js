import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const Profile = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    name: "",
    email: user?.email || "",
    phone: "",
    techSkills: "",
    softSkills: "",
    sscScore: "",
    score12th: "",
    experience: "",
  });
  const [savedProfile, setSavedProfile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.uid) {
      console.error("User not authenticated");
      return;
    }

    try {
      const profileRef = doc(db, "profiles", user.uid);
      await setDoc(profileRef, {
        ...profileData,
        sscScore: parseFloat(profileData.sscScore),
        score12th: parseFloat(profileData.score12th),
        uid: user.uid,
        createdAt: new Date().toISOString()
      });

      alert("✅ Profile saved successfully.");
      // Fetch saved profile to display
      const docSnap = await getDoc(profileRef);
      if (docSnap.exists()) {
        setSavedProfile(docSnap.data());
      }
    } catch (error) {
      console.error("❌ Error saving profile:", error);
      alert("Failed to save profile.");
    }
  };

  // Fetch profile on mount if exists
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;
      const profileRef = doc(db, "profiles", user.uid);
      const docSnap = await getDoc(profileRef);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
        setSavedProfile(docSnap.data());
      }
    };
    fetchProfile();
  }, [user]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 py-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-2/4 mb-6">
        <h2 className="text-2xl font-bold text-center mb-6">Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input fields here */}
          {[
            { name: "name", type: "text", placeholder: "Full Name" },
            { name: "email", type: "email", placeholder: "Email", readOnly: true },
            { name: "phone", type: "text", placeholder: "Phone" },
            { name: "softSkills", type: "textarea", placeholder: "Soft Skills" },
            { name: "techSkills", type: "textarea", placeholder: "Technical Skills" },
            { name: "sscScore", type: "number", placeholder: "SSC Score" },
            { name: "score12th", type: "number", placeholder: "12th Score" },
            { name: "experience", type: "text", placeholder: "Experience" },
          ].map((field) => (
            <div key={field.name}>
              {field.type === "textarea" ? (
                <textarea
                  name={field.name}
                  placeholder={field.placeholder}
                  value={profileData[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={profileData[field.name]}
                  onChange={handleChange}
                  readOnly={field.readOnly}
                  step={field.type === "number" ? "0.01" : undefined}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
          >
            Save Profile
          </button>
        </form>
      </div>

      {savedProfile && (
        <div className="bg-white p-6 rounded shadow w-2/4">
          <h3 className="text-xl font-semibold mb-4">Saved Profile Data</h3>
          <div className="space-y-2 text-left">
  <p><strong>Name:</strong> {savedProfile.name}</p>
  <p><strong>Email:</strong> {savedProfile.email}</p>
  <p><strong>Phone:</strong> {savedProfile.phone}</p>
  <p><strong>Technical Skills:</strong> {savedProfile.techSkills}</p>
  <p><strong>Soft Skills:</strong> {savedProfile.softSkills}</p>
  <p><strong>SSC Score:</strong> {savedProfile.sscScore}</p>
  <p><strong>12th Score:</strong> {savedProfile.score12th}</p>
  <p><strong>Experience:</strong> {savedProfile.experience}</p>
  <p><strong>Created At:</strong> {new Date(savedProfile.createdAt).toLocaleString()}</p>
</div>

        </div>
      )}
    </div>
  );
};

export default Profile;
