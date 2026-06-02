import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Registration Successful! Please Login.");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleRegister} className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Create Account</h2>
        <input type="text" placeholder="Full Name" className="w-full p-3 mb-4 border rounded-lg outline-indigo-500" onChange={(e) => setForm({...form, name: e.target.value})} required />
        <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-lg outline-indigo-500" onChange={(e) => setForm({...form, email: e.target.value})} required />
        <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-lg outline-indigo-500" onChange={(e) => setForm({...form, password: e.target.value})} required />
        <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition">Register</button>
        <p className="mt-4 text-center text-gray-600 text-sm">Already have an account? <span onClick={() => navigate("/login")} className="text-indigo-600 cursor-pointer">Login</span></p>
      </form>
    </div>
  );
};

export default Register;