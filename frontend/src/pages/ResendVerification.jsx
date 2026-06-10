import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const ResendVerification = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        "/auth/resend-verification",
        { email }
      );

      toast.success(data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Resend Verification
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="bg-blue-600 text-white w-full py-3 rounded">
          Resend Email
        </button>
      </form>
    </div>
  );
};

export default ResendVerification;