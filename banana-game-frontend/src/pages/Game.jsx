import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import BackImg from "../assest/3.png";

const Game = () => {
    const [number, setNumber] = useState('');
    const [gameData, setGameData] = useState(null);
    const [error, setError] = useState(null);
    const [gameOver, setGameOver] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(null); // Timer state
    const [score, setScore] = useState(0); // Score state
    const location = useLocation();
    const navigate = useNavigate();

    // Check if the user is logged in
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
    }, [navigate]);

    // Start a new game with difficulty settings
    const startGame = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/game/start');
            setGameData(response.data.data);
            setError(null);
            setGameOver(false);
            setShowResult(false);
            setScore(0);  // Reset score when starting a new game
            setLoading(false);

            // Get the difficulty level
            const difficulty = location.state?.difficulty || "easy";
            console.log("Game difficulty: ", difficulty);  // Debugging

            // Set timer based on difficulty
            if (difficulty === "medium") {
                setTimeLeft(30);  // 30 seconds for medium difficulty
            } else if (difficulty === "hard") {
                setTimeLeft(10);  // 10 seconds for hard difficulty
            } else {
                setTimeLeft(60);  // 60 seconds for easy difficulty (default)
            }
        } catch (err) {
            setError('Error starting the game.');
            console.error(err);
            setLoading(false);
        }
    }, [location.state?.difficulty]);

    // Auto-start game if redirected with a flag
    useEffect(() => {
        if (location.state?.startNewGame) {
            startGame();
        }
    }, [location.state, startGame]);

    // Timer logic for medium and hard difficulties
    useEffect(() => {
        if (timeLeft === null || timeLeft <= 0 || gameOver) return;
        const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        return () => clearInterval(timer);  // Clear interval on cleanup
    }, [timeLeft, gameOver]);

    // End the game when time runs out
    useEffect(() => {
        if (timeLeft === 0) {
            setGameOver(true);
            setError("Time's up! Game Over.");
        }
    }, [timeLeft, navigate]);

    // Make a move and check the solution
    const enter = async () => {
        if (!number) return setError('Please enter a number.');

        const selectedNumber = parseInt(number, 10);
        if (isNaN(selectedNumber) || selectedNumber < 0 || selectedNumber > 9) {
            setError('Please enter a valid number between 0 and 9.');
            return;
        }

        if (gameData) {
            const solution = gameData.solution;
            console.log(`Checking: ${selectedNumber} vs ${solution}`);

            if (selectedNumber === solution) {
                setScore((prevScore) => prevScore + 1);  // Increment score when correct
                setShowResult(true);
                setError(null);

                // Fetch the next question after a correct answer
                try {
                    const response = await axios.get('http://localhost:5000/api/game/start');
                    setGameData(response.data.data);
                } catch (err) {
                    setError('Error fetching new question.');
                }
            } else {
                setError(`Oops! ${selectedNumber} is incorrect. Try again!`);
                setShowResult(false);
            }
        }
        setNumber('');
    };

    const handleChange = (e) => {
        setNumber(e.target.value);
    };

    const handlePlayAgain = () => {
        setNumber('');
        setGameData(null);
        setGameOver(false);
        setShowResult(false);
        setTimeLeft(null);
        setScore(0); // Reset score when playing again
        startGame();
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4"
            style={{
                backgroundImage: `url(${BackImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
            <div className="flex w-full h-full justify-center items-center">
                <div className="game-container p-4 w-full max-w-xl h-full mt-6 bg-[#fadcd5] rounded-xl shadow-2xl">
                    <h1 className="text-3xl font-bold text-center mb-4 text-black">Banana Game</h1>

                    {loading ? (
                        <div className="text-center text-xl text-black">Starting game...</div>
                    ) : gameData ? (
                        <div className="game-content text-center">
                            <div className="image-container mb-4">
                                <img src={gameData.question} alt="Game Question" className="mx-auto mb-4 border-4 border-white rounded-lg shadow-lg" />
                            </div>

                            {timeLeft !== null && (
                                <p className="text-lg font-bold text-red-600 mb-2">Time Left: {timeLeft}s</p>
                            )}
                            <p className="text-lg font-bold">Your score: {score}</p> {/* Show score */}

                            <div className="move flex justify-center space-x-4 mb-4">
                                <input
                                    type="number"
                                    placeholder="Enter a number"
                                    value={number}
                                    onChange={handleChange}
                                    className="border-2 border-gray-300 p-2 rounded w-40 text-center"
                                    disabled={gameOver || timeLeft === 0}
                                />
                                <button
                                    className="bg-gray-800 text-white rounded-lg hover:bg-[#011222] transition duration-300 py-2 px-2 w-40 h-11 shadow-md"
                                    onClick={enter}
                                    disabled={gameOver || timeLeft === 0}
                                >
                                    OK
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button
                            className="bg-gray-800 text-white rounded-lg hover:bg-[#011222] transition duration-300 py-2 px-6 shadow-lg w-full"
                            onClick={startGame}
                        >
                            Start Game
                        </button>
                    )}

                    {error && <p className="text-xl text-red-500 text-center">{error}</p>}
                    {showResult && !gameOver && (
                        <div className="result mt-4 text-center">
                            <p className="text-xl text-green-500 font-bold">Correct answer🎉!</p>

                        </div>
                    )}

                    {gameOver && (
                        <div className="mt-4 text-center">
                            <button
                                className="bg-gray-800 text-white hover:bg-[#011222] transition duration-300 py-2 px-6 rounded-full w-full shadow-lg"
                                onClick={handlePlayAgain}
                            >
                                Play Again
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Game;
