import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Profile({ user, setUser, setSelectedPage, cart = [], wishlist = [] }) {
  
  // ✅ SAFETY CHECK
  const cartCount = Array.isArray(cart) ? cart.length : 0;
  const wishlistCount = Array.isArray(wishlist) ? wishlist.length : 0;

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
  });

  const handleSave = async () => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_URL}/user/update`, {
        email: user?.email,
        name: form.name,
        phone: form.phone,
        address: form.address,
      });
      setUser(res.data.user);
      toast.success("Profile updated! ✅");
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update profile!");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen pt-32 px-6">
      <div className="max-w-2xl mx-auto">

        {/* HEADER */}
        <h1 className="text-3xl text-center mb-10 tracking-widest">
          MY PROFILE
        </h1>

        {/* PROFILE CARD */}
        <div className="bg-gray-900 rounded-lg p-8 mb-6">

          {/* AVATAR */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 rounded-full bg-yellow-500 flex items-center justify-center text-black text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
          </div>

          {/* USER INFO */}
          <div className="space-y-4">

            {/* NAME */}
            <div className="flex justify-between border-b border-gray-700 pb-3">
              <span className="text-gray-400">Name</span>
              {isEditing ? (
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-black border border-gray-600 rounded px-2 py-1 text-sm w-48"
                />
              ) : (
                <span>{user?.name || "N/A"}</span>
              )}
            </div>

            {/* EMAIL */}
            <div className="flex justify-between border-b border-gray-700 pb-3">
              <span className="text-gray-400">Email</span>
              <span>{user?.email || user}</span>
            </div>

            {/* PHONE */}
            <div className="flex justify-between border-b border-gray-700 pb-3">
              <span className="text-gray-400">Phone</span>
              {isEditing ? (
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="Enter phone number"
                  className="bg-black border border-gray-600 rounded px-2 py-1 text-sm w-48"
                />
              ) : (
                <span>{user?.phone || "Not set"}</span>
              )}
            </div>

            {/* ADDRESS */}
            <div className="flex justify-between border-b border-gray-700 pb-3">
              <span className="text-gray-400">Address</span>
              {isEditing ? (
                <textarea
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="Enter address"
                  className="bg-black border border-gray-600 rounded px-2 py-1 text-sm w-48 h-20 resize-none"
                />
              ) : (
                <span className="text-right max-w-xs">
                  {user?.address || "Not set"}
                </span>
              )}
            </div>

            {/* CART COUNT */}
            <div className="flex justify-between border-b border-gray-700 pb-3">
              <span className="text-gray-400">Cart Items</span>
              <span className="text-yellow-400">{cartCount}</span>
            </div>

            {/* WISHLIST COUNT */}
            <div className="flex justify-between border-b border-gray-700 pb-3">
              <span className="text-gray-400">Wishlist Items</span>
              <span className="text-yellow-400">{wishlistCount}</span>
            </div>

          </div>

          {/* EDIT / SAVE BUTTONS */}
          <div className="mt-6 flex gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="flex-1 bg-yellow-500 text-black py-2 rounded hover:bg-yellow-400"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border border-gray-600 py-2 rounded hover:bg-gray-800"
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="w-full border border-yellow-500 text-yellow-500 py-2 rounded hover:bg-yellow-500 hover:text-black"
              >
                Edit Profile
              </button>
            )}
          </div>

        </div>

        {/* QUICK LINKS */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setSelectedPage("orders")}
            className="bg-gray-900 p-4 rounded-lg text-center hover:bg-gray-800"
          >
            <p className="text-yellow-400 text-2xl mb-2">📦</p>
            <p>My Orders</p>
          </button>
          <button
            onClick={() => setSelectedPage("wishlist")}
            className="bg-gray-900 p-4 rounded-lg text-center hover:bg-gray-800"
          >
            <p className="text-yellow-400 text-2xl mb-2">❤️</p>
            <p>My Wishlist</p>
          </button>
          <button
            onClick={() => setSelectedPage("cart")}
            className="bg-gray-900 p-4 rounded-lg text-center hover:bg-gray-800"
          >
            <p className="text-yellow-400 text-2xl mb-2">🛒</p>
            <p>My Cart</p>
          </button>
          <button
            onClick={() => setSelectedPage("shop")}
            className="bg-gray-900 p-4 rounded-lg text-center hover:bg-gray-800"
          >
            <p className="text-yellow-400 text-2xl mb-2">🛍️</p>
            <p>Shop Now</p>
          </button>
        </div>

        {/* LOGOUT */}
        <button
          onClick={() => {
            setUser(null);
            setSelectedPage("home");
          }}
          className="w-full border border-red-500 text-red-500 py-3 rounded-lg hover:bg-red-500 hover:text-black transition"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Profile;