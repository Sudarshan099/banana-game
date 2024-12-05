import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackImg from "../assest/3.png";

const Profile = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            try {
                const response = await fetch("http://localhost:5000/api/auth/profile", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser(data);
                } else {
                    console.error("Failed to fetch user data");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                navigate("/login");
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
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
                            <h2 className="text-black text-xl font-bold mb-4">Username: {user.username}</h2>
                            <p className="text-black text-xl font-bold mb-4">Full Name: {user.fullname}</p>
                            <p className="text-black text-xl font-bold mb-4">Email: {user.email}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
