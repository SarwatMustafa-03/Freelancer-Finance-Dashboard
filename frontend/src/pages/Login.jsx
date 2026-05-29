import { useState } from "react";
import axios from "../api/axios";

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post("/auth/login", formData);

            // token store
            localStorage.setItem("token", res.data.token);

            alert("Login successful");

            console.log(res.data);

        } catch (error) {

            console.log(error.response?.data);

            alert(
                error.response?.data?.message || "Login failed"
            );
        }
    };

    return (
        <div>

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <br /><br />

                <button type="submit">
                    Login
                </button>

            </form>

        </div>
    );
};

export default Login;