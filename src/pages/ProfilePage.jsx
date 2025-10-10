import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateUserProfile } from "../lib/auth";

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
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      <div className="bg-white shadow-md rounded-md p-6 space-y-4">
        {!isEditing ? (
          <>
            <div>
              <label className="block font-medium">Full Name</label>
              <p className="text-gray-700">{profile?.fullname || "—"}</p>
            </div>

            <div>
              <label className="block font-medium">Email</label>
              <p className="text-gray-700">{user?.email}</p>
            </div>

            <div>
              <label className="block font-medium">Role</label>
              <p className="text-gray-700">{profile?.role}</p>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border w-full p-2 rounded-md outline-none focus:ring-2 focus:ring-primary-light"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded-md hover:bg-gray-400"
            >
              Cancel
            </button>
          </form>
        )}

        {message && <p className="text-sm mt-2">{message}</p>}
      </div>
    </div>
  );
};

export default ProfilePage;
