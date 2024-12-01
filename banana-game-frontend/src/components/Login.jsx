import React, { useState } from 'react';
import BackImg from "../assest/2.png";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(""); // Error message for login failure
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.username) tempErrors.username = "Username is required";
        if (!formData.password) tempErrors.password = "Password is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await fetch("http://localhost:5000/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const data = await response.json();

                if (response.ok) {
                    setError("");
                    // Save the token and username to localStorage
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("username", formData.username); // Save the username
                    navigate("/"); // Redirect to home page on successful login
                    alert("Login successful"); // Display success message
                } else {
                    setError(data.message || "Login failed.");
                }
            } catch (error) {
                setError("Server error. Please try again later.");
            }
        }
    };

    return (
        <div>
            <div className="flex items-center justify-center min-h-screen p-4"
                style={{
                    backgroundImage: `url(${BackImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className="flex flex-col md:flex-row shadow-[#6d325c] shadow-xl hover:drop-shadow-2xl rounded-lg overflow-hidden bg-[#fadcd5] w-full max-w-lg">
                    <div className="w-full md:w-full p-8 md:p-16 flex flex-col justify-center">
                        <h2 className="flex justify-center text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Log In to Banana 🍌</h2>

                        {/* Display login error message */}
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Username</label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder='Enter your username.'
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                                />
                                {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                            </div>
                            <div className="mb-5">
                                <label className="block text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder='Enter your password.'
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                                />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                            </div>
                            <button type="submit" className="w-full mb-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-[#011222] transition duration-300">
                                LOG IN
                            </button>
                            <hr className='bg-gray-500 w-full h-[2px]' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
