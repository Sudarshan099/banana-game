import React, { useState } from "react";
import BackImg from "../assest/3.png";
import { useNavigate } from "react-router-dom";
import UserAuth from "../utils/UserAuth";
import Navigation from "../utils/Navigation";

const Home = () => {
  const navigate = useNavigate();
  const nav = new Navigation(navigate);

  const [showLevels, setShowLevels] = useState(false);

  const handleStartClick = () => {
    if (UserAuth.isLoggedIn()) {
      setShowLevels(true);
    } else {
      nav.navigateToLogin();
    }
  };

  const handleProfileClick = () => {
    nav.navigateToProfile();
  };

  const startGameWithLevel = (level) => {
    console.log(`Starting game with difficulty: ${level}`); // Debugging
    nav.navigateToGame({ difficulty: level, startNewGame: true }); // Ensure `difficulty` and `startNewGame` are passed
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

      {/* Modal for selecting difficulty */}
      {showLevels && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center space-y-4">
            <h2 className="text-xl font-bold">Select Difficulty</h2>
            <button
              className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
              onClick={() => startGameWithLevel("easy")}
            >
              Easy 🍌
            </button>
            <button
              className="w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
              onClick={() => startGameWithLevel("medium")}
            >
              Medium 🍌
            </button>
            <button
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => startGameWithLevel("hard")}
            >
              Hard 🍌
            </button>
            <button
              className="w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition duration-300"
              onClick={() => setShowLevels(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
