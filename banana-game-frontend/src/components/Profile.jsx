import React, { useEffect, useState } from "react";
import BackImg from "../assest/3.png";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [user, setUser] = useState(null); // To hold user data
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token"); // Retrieve the token from local storage

            if (!token) {
                navigate("/login"); // Redirect to login if no token is found
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data); // Set the user data in state
                } else {
                    console.error("Failed to fetch profile");
                    navigate("/login"); // Redirect to login on error
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
                navigate("/login"); // Redirect to login on error
            }
        };

        fetchProfile();
    }, [navigate]);

    return (
        <div>
            <div
                className="flex items-center justify-center min-h-screen p-4"
                style={{
                    backgroundImage: `url(${BackImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="flex flex-col text-white p-4 rounded-lg space-y-16">
                    <h1
                        className="text-5xl font-bold text-center my-4"
                        style={{
                            fontFamily: "cursive",
                            textDecoration: "none",
                        }}
                    >
                        Welcome to Kera 🍌
                    </h1>

                    <div className="flex justify-center items-center p-16 shadow-[#6d325c] shadow-xl hover:drop-shadow-2xl rounded-lg overflow-hidden bg-[#fadcd5] w-full max-w-lg">
                        {user ? (
                            <div>
                                <h2 className="text-3xl font-bold mb-4">Hello, {user.username}</h2>
                                <p className="text-lg">User ID: {user.username}</p>
                                {/* Display more user info if available */}
                            </div>
                        ) : (
                            <p>Loading...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
