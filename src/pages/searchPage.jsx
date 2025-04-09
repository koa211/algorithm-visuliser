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
                        Linear Search is a simple searching algorithm that checks each element in an array sequentially
                        until
                        the target value is found or the end of the array is reached. It is useful for small or unsorted
                        datasets.
                        <br/><br/>
                        In this example, we are searching for the value <strong>21</strong> in the array <code>[5, 12,
                        8, 21, 30]</code>.
                        <br/><br/>
                        <strong>How it works:</strong> Start at index 0, and move one-by-one to the next index
                        comparing each element to the target.
                        <br/>
                        <strong>Time Complexity:</strong>
                        - Best Case: O(1) (first element)
                        - Average/Worst Case: O(n)
                        <br/>
                        This algorithm doesn’t require sorting but becomes inefficient as array size grows.
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
                        Binary Search is a powerful algorithm used on sorted arrays. It repeatedly divides the array into halves
                        to narrow down the search range until the target value is found or the range is empty.
                        <br /><br />
                        In this example, we are searching for the value <strong>14</strong> in the sorted array <code>[2, 4, 6, 8, 10, 12, 14, 16]</code>.
                        <br /><br />
                        <strong>How it works:</strong>
                        - Calculate the middle index: <code>mid = Math.floor((low + high) / 2)</code>
                        - Compare the middle value to the target
                        - If it’s less, search the right half; if more, search the left half
                        - Repeat until found or bounds cross
                        <br />
                        <strong>Time Complexity:</strong>
                        - Best Case: O(1)
                        - Average/Worst Case: O(log n)
                        <br />
                        Much more efficient than Linear Search for large, sorted datasets.
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
                        Jump Search combines the speed of Binary Search with the simplicity of Linear Search. It is used on sorted arrays
                        and works by jumping ahead in fixed intervals (blocks), then performing a linear search within that block.
                        <br /><br />
                        In this example, we are searching for the value <strong>11</strong> in the sorted array <code>[1, 3, 5, 7, 9, 11, 13, 15]</code>.
                        <br /><br />
                        <strong>How it works:</strong>
                        - Determine a jump step size, usually √n
                        - Jump ahead in blocks: index 0 → 3 → 6... until overshooting or reaching the block containing the target
                        - Do a linear scan within that block
                        <br />
                        For this array, jump step = <code>Math.floor(√8) = 2</code>
                        <br />
                        <strong>Time Complexity:</strong>
                        - Best Case: O(1)
                        - Average/Worst Case: O(√n)
                        <br />
                        Useful when random access is cheap (like in arrays) and binary search isn’t optimal for all values.
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
