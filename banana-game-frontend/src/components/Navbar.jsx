import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // Check if the user is logged in by checking the presence of a token
    const token = localStorage.getItem("token");

    // Handle logout by removing token from localStorage and redirecting to home/login page
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username"); // Remove username as well
        navigate("/"); // Redirect to home or login page after logging out
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="flex justify-between items-center max-w-6xl mx-auto text-white">
                <Link to="/" className="text-2xl font-bold">Banana 🍌</Link>
                <div className="space-x-4">
                    {token ? (
                        <>
                            <span className="text-xl">Hello, {localStorage.getItem("username")}</span> {/* Display username */}
                            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
