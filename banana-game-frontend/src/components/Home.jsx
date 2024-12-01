import React from "react";
import BackImg from "../assest/3.png";
import { useNavigate } from "react-router-dom";
import UserAuth from "../utils/UserAuth";
import Navigation from "../utils/Navigation";

const Home = () => {
  const navigate = useNavigate();
  const nav = new Navigation(navigate);

  const handleStartClick = () => {
    if (UserAuth.isLoggedIn()) {
      nav.navigateToGame();
    } else {
      nav.navigateToLogin();
    }
  };

  const handleProfileClick = () => {
    nav.navigateToProfile();
  };

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
            Welcome to Banana 🍌
          </h1>

          <div className="md:flex-row p-16 shadow-[#6d325c] shadow-xl hover:drop-shadow-2xl rounded-lg overflow-hidden bg-[#fadcd5] w-full max-w-lg">
            <button
              type="submit"
              className="w-full mb-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-[#011222] transition duration-300"
              onClick={handleStartClick}
            >
              Start New Game 🍌
            </button>
            <button
              type="submit"
              className="w-full mb-4 bg-gray-800 text-white py-2 rounded-lg hover:bg-[#011222] transition duration-300"
              onClick={handleProfileClick}
            >
              Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
