import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Auth({ setUser, setSelectedPage }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      toast.error("Please fill all fields!");
      return;
    }

    try {
      if (isLogin) {
        // ✅ LOGIN
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
          email: form.email,
          password: form.password,
        });
        setUser(res.data.user);
        toast.success("Logged in successfully! 🎉");
        setSelectedPage("home");
      } else {
        // ✅ REGISTER
        if (!form.name) {
          toast.error("Please enter your name!");
          return;
        }
        await axios.post(`${import.meta.env.VITE_API_URL}/register`, {
          name: form.name,
          email: form.email,
          password: form.password,
        });
        toast.success("Registered! Please login now 🎉");
        setIsLogin(true);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex justify-center items-center">
      <div className="bg-gray-900 p-8 rounded-lg w-80">
        <h2 className="text-xl mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Show name field only on Sign Up */}
        {!isLogin && (
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-3 p-2 bg-black border"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 bg-black border"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 bg-black border"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-yellow-500 text-black py-2 rounded"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p
          className="text-sm mt-4 text-center cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have account? Sign Up"
            : "Already have account? Login"}
        </p>
      </div>
    </div>
  );
}

export default Auth;