import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../lib/auth";
import { BsPerson, BsEnvelope, BsBriefcase } from "react-icons/bs";

const ProfilePage = () => {
  const { profile, user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile?.fullname || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUserProfile(user.id, { full_name: name });
      setMessage("Profile updated successfully ✅");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("Failed to update profile ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Card */}
      <div className="bg-gradient-to-r from-[#15045A] to-[#7BC5FF] text-white rounded-3xl p-8 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar */}
          <div className="w-32 h-32 rounded-full bg-white flex items-center justify-center text-6xl font-bold text-blue-600">
            {profile?.fullname?.[0] || "U"}
          </div>

          {/* Info */}
          <div>
            <h2 className="text-3xl font-bold">{profile?.fullname || "User Name"}</h2>
            <p className="text-gray-200">{profile?.role?.toUpperCase() || "STUDENT"}</p>
            <p className="text-gray-200 mt-1">{user?.email}</p>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-white text-blue-700 font-semibold px-6 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats / Info Cards */}
      <div className="grid md:grid-cols-2  gap-6 mt-10">
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <BsPerson size={30} className="text-blue-600 mb-2" />
          <p className="text-2xl font-bold">{profile?.fullname}</p>
          <p className="text-gray-500 text-sm">Full Name</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <BsEnvelope size={30} className="text-purple-600 mb-2" />
          <p className="text-2xl font-bold">{user?.email}</p>
          <p className="text-gray-500 text-sm">Email</p>
        </div>
        <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center">
          <BsBriefcase size={30} className="text-green-600 mb-2" />
          <p className="text-2xl font-bold">{profile?.role}</p>
          <p className="text-gray-500 text-sm">Role</p>
        </div>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <form
          onSubmit={handleUpdate}
          className="bg-white shadow-lg rounded-2xl p-6 mt-10 space-y-4"
        >
          <h3 className="text-xl font-semibold mb-4">Edit Profile</h3>
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border w-full p-3 rounded-md outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex-1"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400 transition flex-1"
            >
              Cancel
            </button>
          </div>

          {message && <p className="text-sm mt-2 text-center">{message}</p>}
        </form>
      )}
    </div>
  );
};

export default ProfilePage;
