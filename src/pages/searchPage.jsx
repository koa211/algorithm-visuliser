import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchPage.css";

function SearchPage() {
    const navigate = useNavigate();

    // LINEAR SEARCH
    const [array] = useState([5, 12, 8, 21, 30]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [foundIndex, setFoundIndex] = useState(null);
    const searchValue = 21;

    //-------------- LINEAR SEARCH --------------
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

    //-------------- BINARY SEARCH --------------
    const [sortedArray] = useState([2, 4, 6, 8, 10, 12, 14, 16]);
    const [low, setLow] = useState(0);
    const [high, setHigh] = useState(sortedArray.length - 1);
    const [mid, setMid] = useState(Math.floor((sortedArray.length - 1) / 2));
    const [foundBinaryIndex, setFoundBinaryIndex] = useState(null);
    const binaryTarget = 14;

    const handleBinaryPlay = () => {
        if (foundBinaryIndex !== null || low > high) return;

        const currentMid = Math.floor((low + high) / 2);
        setMid(currentMid);

        if (sortedArray[currentMid] === binaryTarget) {
            setFoundBinaryIndex(currentMid);
        } else if (sortedArray[currentMid] < binaryTarget) {
            setLow(currentMid + 1);
        } else {
            setHigh(currentMid - 1);
        }
    };

    const handleBinaryReset = () => {
        setLow(0);
        setHigh(sortedArray.length - 1);
        setMid(Math.floor((sortedArray.length - 1) / 2));
        setFoundBinaryIndex(null);
    };

    //-------------- JUMP SEARCH --------------
    const [jumpArray] = useState([1, 3, 5, 7, 9, 11, 13, 15]);
    const [jumpIndex, setJumpIndex] = useState(0);
    const [jumpBlockStart, setJumpBlockStart] = useState(0);
    const [jumpFoundIndex, setJumpFoundIndex] = useState(null);
    const jumpTarget = 11;
    const jumpStep = Math.floor(Math.sqrt(jumpArray.length));
    const [inBlockSearch, setInBlockSearch] = useState(false);

    const handleJumpPlay = () => {
        if (jumpFoundIndex !== null) return;

        if (!inBlockSearch) {
            // Jump step phase
            if (jumpIndex >= jumpArray.length || jumpArray[jumpIndex] >= jumpTarget) {
                setInBlockSearch(true); // Switch to block scan
                setJumpIndex(jumpBlockStart);
            } else {
                setJumpBlockStart(jumpIndex);
                setJumpIndex(jumpIndex + jumpStep);
            }
        } else {
            // Linear scan in block
            if (jumpArray[jumpIndex] === jumpTarget) {
                setJumpFoundIndex(jumpIndex);
            } else if (jumpIndex >= jumpArray.length || jumpArray[jumpIndex] > jumpTarget) {
                // Stop search if exceeded target
                setJumpFoundIndex(-1);
            } else {
                setJumpIndex(jumpIndex + 1);
            }
        }
    };

    const handleJumpReset = () => {
        setJumpIndex(0);
        setJumpBlockStart(0);
        setJumpFoundIndex(null);
        setInBlockSearch(false);
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
                        until the target value is found or the list ends. In this example, we are searching
                        for the value <strong>21</strong> in the array <code>[5, 12, 8, 21, 30]</code>.
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

                <div className="algorithm-card">
                    <h2>Binary Search</h2>
                    <p>
                        Binary Search works by repeatedly dividing the search interval in half. In this example, we are
                        searching
                        for the value <strong>14</strong> in the sorted array <code>[2, 4, 6, 8, 10, 12, 14, 16]</code>.
                    </p>

                    {/* Visual array */}
                    <div className="array-container">
                        {sortedArray.map((value, index) => (
                            <div
                                key={index}
                                className={`array-box ${
                                    index === mid ? "highlight" : ""
                                } ${index === foundBinaryIndex ? "found" : ""}`}
                            >
                                {value}
                            </div>
                        ))}
                    </div>

                    {/* Play + Reset */}
                    <button className="play-button" onClick={handleBinaryPlay}>▶ Play</button>
                    <button className="reset-button" onClick={handleBinaryReset}>🔄 Reset</button>
                </div>

                <div className="algorithm-card">
                    <h2>Jump Search</h2>
                    <p>
                        Jump Search works by jumping ahead fixed steps in a sorted array and then performing
                        a linear search within a block. In this example, we are searching
                        for <strong>{jumpTarget}</strong> in the array <code>[1, 3, 5, 7, 9, 11, 13, 15]</code>.
                    </p>

                    <div className="array-container">
                        {jumpArray.map((value, index) => (
                            <div
                                key={index}
                                className={`array-box ${
                                    index === jumpIndex ? "highlight" : ""
                                } ${index === jumpFoundIndex ? "found" : ""}`}
                            >
                                {value}
                            </div>
                        ))}
                    </div>

                    <button className="play-button" onClick={handleJumpPlay}>▶ Play</button>
                    <button className="reset-button" onClick={handleJumpReset}>🔄 Reset</button>
                </div>

            </section>
        </div>
    );
}

export default SearchPage;
