import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post(
        `/auth/reset-password/${token}`,
        { password }
      );

      toast.success(data.message);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Reset Failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>

        <input
          type="password"
          placeholder="New Password"
          className="border p-3 w-full mb-4 rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-green-600 text-white w-full py-3 rounded">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;