import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchPage.css";

function SearchPage() {
    const navigate = useNavigate();

    const [array] = useState([5, 12, 8, 21, 30]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [foundIndex, setFoundIndex] = useState(null);

    const searchValue = 21;

    const handlePlay = () => {
        if (foundIndex !== null) return; // Stop if already found

        if (array[currentIndex] === searchValue) {
            setFoundIndex(currentIndex); // found!
        } else {
            setCurrentIndex((prev) =>
                prev + 1 < array.length ? prev + 1 : prev
            );
        }
    };

    const handleReset = () => {
        setCurrentIndex(0);
        setFoundIndex(null);
    };

    return (
        <div className="search-container">
            <button className="back-button" onClick={() => navigate("/")}>
                Back to Main Page
            </button>

            <header className="search-header">
                <h1>Searching Algorithms</h1>
                <p>
                    Searching algorithms are used to find an element in a data structure, such as an array or list.
                </p>
            </header>

            <section className="algorithm-section">
                <div className="algorithm-card">
                    <h2>Linear Search</h2>
                    <p>
                        Linear Search is a simple searching algorithm that checks each element one by one
                        until the target value is found or the list ends.
                    </p>

                    {/* Visual array */}
                    <div className="array-container">
                        {array.map((value, index) => (
                            <div
                                key={index}
                                className={`array-box ${
                                    index === currentIndex ? "highlight" : ""
                                } ${index === foundIndex ? "found" : ""}`}
                            >
                                {value}
                            </div>
                        ))}
                    </div>

                    {/* Play Button */}
                    <button className="play-button" onClick={handlePlay}>
                        ▶ Play
                    </button>
                    <button className="reset-button" onClick={handleReset}>
                        🔄 Reset
                    </button>
                </div>
            </section>
        </div>
    );
}

export default SearchPage;
