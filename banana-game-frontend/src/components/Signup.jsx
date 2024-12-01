import React, { useState } from 'react';
import BackImg from "../assest/2.png";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        fullname: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState(''); // Error message for form validation or server issues
    const navigate = useNavigate();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, fullname, email, password } = formData;

        // Basic client-side validation
        if (!username || !fullname || !email || !password) {
            setError("Please fill out all fields.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            // Send data to backend for registration
            const response = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, fullname, email, password })
            });

            const data = await response.json();

            if (response.ok) {
                setError("");
                navigate("/login"); // Redirect to login page upon successful registration
            } else {
                setError(data.message || "Registration failed.");
            }
        } catch (error) {
            setError("Server error. Please try again later.");
        }
    };

    const handleLogClick = () => {
        navigate('/');
    };

    return (
        <div>
            {/* <Navbar /> */}
            <div className="flex items-center justify-center min-h-screen p-4"
                style={{
                    backgroundImage: `url(${BackImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}>
                <div className="flex flex-col md:flex-row shadow-[#6d325c] shadow-xl hover:drop-shadow-2xl rounded-lg overflow-hidden bg-[#fadcd5] w-full max-w-lg">
                    <div className="w-full md:w-full p-8 md:p-12 flex flex-col justify-center">
                        <h2 className="flex justify-center text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">Register to Banana 🍌</h2>

                        {/* Error message display */}
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
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder='Enter your fullname.'
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder='Enter your email.'
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="mt-2 px-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-gray-800"
                                />
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
                            </div>
                            <button type="submit" className="w-full mb-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-[#011222] transition duration-300">
                                SIGN UP
                            </button>
                            <hr className='bg-gray-500 w-full h-[2px]' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;
