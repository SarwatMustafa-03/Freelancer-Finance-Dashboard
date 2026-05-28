import { useState } from "react";
import API from "../api/axios";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", form);//req backend ko bhjty

      alert("Registered Successfully");

      window.location.href = "/login";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <h1>Register</h1>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })//values save krta =>1
        }
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({ ...form, password: e.target.value })
        }
      />

      <button>Register</button>
    </form>
  );
};

export default Register;