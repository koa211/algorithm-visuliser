import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchPage.css";

function SearchPage() {
    const navigate = useNavigate();

    // -------------- LINEAR SEARCH --------------
    const [array] = useState([5, 12, 8, 21, 30]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [foundIndex, setFoundIndex] = useState(null);
    const searchValue = 21;

    const handlePlay = () => {
        if (foundIndex !== null) return;
        if (array[currentIndex] === searchValue) {
            setFoundIndex(currentIndex);
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

    // -------------- BINARY SEARCH --------------
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

    // -------------- JUMP SEARCH --------------
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
            if (jumpIndex >= jumpArray.length || jumpArray[jumpIndex] >= jumpTarget) {
                setInBlockSearch(true);
                setJumpIndex(jumpBlockStart);
            } else {
                setJumpBlockStart(jumpIndex);
                setJumpIndex(jumpIndex + jumpStep);
            }
        } else {
            if (jumpArray[jumpIndex] === jumpTarget) {
                setJumpFoundIndex(jumpIndex);
            } else if (jumpIndex >= jumpArray.length || jumpArray[jumpIndex] > jumpTarget) {
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

    // -------------- BST SEARCH --------------
    const bst = {
        value: 8,
        left: {
            value: 3,
            left: { value: 1, left: null, right: null },
            right: {
                value: 6,
                left: { value: 4, left: null, right: null },
                right: { value: 7, left: null, right: null },
            },
        },
        right: {
            value: 10,
            left: null,
            right: {
                value: 14,
                left: { value: 13, left: null, right: null },
                right: null,
            },
        },
    };

    const [bstPath, setBstPath] = useState([]); // nodes visited
    const [bstCurrentNode, setBstCurrentNode] = useState(bst);
    const [bstFound, setBstFound] = useState(false);

    const bstTarget = 7;

    const handleBstPlay = () => {
        if (bstFound || bstCurrentNode === null) return;

        if (bstCurrentNode.value === bstTarget) {
            setBstFound(true);
        } else if (bstTarget < bstCurrentNode.value) {
            setBstPath(prev => [...prev, bstCurrentNode]);
            setBstCurrentNode(bstCurrentNode.left);
        } else {
            setBstPath(prev => [...prev, bstCurrentNode]);
            setBstCurrentNode(bstCurrentNode.right);
        }
    };

    const handleBstReset = () => {
        setBstPath([]);
        setBstCurrentNode(bst);
        setBstFound(false);
    };

    return (
        <div className="search-container">
            <button className="back-button" onClick={() => navigate("/")}>
                Back to Main Page
            </button>

            <header className="search-header">
                <h1>Searching Algorithms</h1>
                <p>Searching algorithms are used to find an element in a data structure, such as an array or tree.</p>
            </header>

            <section className="algorithm-section">
                {/* LINEAR SEARCH CARD */}
                <div className="algorithm-card">
                    <h2>Linear Search</h2>
                    <p>Simple sequential search checking each element one by one.<br/>
                        Best: O(1), Average/Worst: O(n).
                    </p>
                    <div className="array-container">
                        {array.map((value, index) => (
                            <div key={index} className={`array-box ${
                                index === currentIndex ? "highlight" : ""
                            } ${index === foundIndex ? "found" : ""}`}>
                                {value}
                            </div>
                        ))}
                    </div>
                    <button className="play-button" onClick={handlePlay}>▶ Play</button>
                    <button className="reset-button" onClick={handleReset}>🔄 Reset</button>
                </div>

                {/* BINARY SEARCH CARD */}
                <div className="algorithm-card">
                    <h2>Binary Search</h2>
                    <p>Efficient search by halving the array each time.<br/>
                        Best: O(1), Average/Worst: O(log n).
                    </p>
                    <div className="array-container">
                        {sortedArray.map((value, index) => (
                            <div key={index} className={`array-box ${
                                index === mid ? "highlight" : ""
                            } ${index === foundBinaryIndex ? "found" : ""}`}>
                                {value}
                            </div>
                        ))}
                    </div>
                    <button className="play-button" onClick={handleBinaryPlay}>▶ Play</button>
                    <button className="reset-button" onClick={handleBinaryReset}>🔄 Reset</button>
                </div>

                {/* JUMP SEARCH CARD */}
                <div className="algorithm-card">
                    <h2>Jump Search</h2>
                    <p>Jump by √n blocks and linear search in block.<br/>
                        Best: O(1), Average/Worst: O(√n).
                    </p>
                    <div className="array-container">
                        {jumpArray.map((value, index) => (
                            <div key={index} className={`array-box ${
                                index === jumpIndex ? "highlight" : ""
                            } ${index === jumpFoundIndex ? "found" : ""}`}>
                                {value}
                            </div>
                        ))}
                    </div>
                    <button className="play-button" onClick={handleJumpPlay}>▶ Play</button>
                    <button className="reset-button" onClick={handleJumpReset}>🔄 Reset</button>
                </div>

                {/* BST SEARCH CARD */}
                <div className="algorithm-card">
                    <h2>Binary Search Tree (BST)</h2>
                    <p>Search by navigating left or right children.<br/>
                        Best: O(log n) (balanced), Worst: O(n) (unbalanced).
                    </p>
                    <div className="tree-container">
                        <BSTNode
                            node={bst}
                            target={bstTarget}
                            visitedNodes={bstPath.map(n => n.value)}
                            found={bstFound}
                        />
                    </div>
                    <button className="play-button" onClick={handleBstPlay}>▶ Play</button>
                    <button className="reset-button" onClick={handleBstReset}>🔄 Reset</button>
                </div>
            </section>
        </div>
    );
}

export default SearchPage;


/// 🛠️ Helper Recursive Component for BST
/* eslint-disable react/prop-types */[]
function BSTNode({ node, target, visitedNodes, found }) {
    if (!node) return null;

    const isVisited = visitedNodes.includes(node.value);
    const isCurrent = node.value === (visitedNodes.length > 0 ? visitedNodes[visitedNodes.length - 1] : null);
    const isFound = found && node.value === target;

    return (
        <div className="tree-node-container">
            <div className={`tree-node ${
                isFound ? "found" :
                    isCurrent ? "current" :
                        isVisited ? "visited" : ""
            }`}>
                {node.value}
            </div>

            {(node.left || node.right) && (
                <div className="tree-children">
                    <BSTNode node={node.left} target={target} visitedNodes={visitedNodes} found={found} />
                    <BSTNode node={node.right} target={target} visitedNodes={visitedNodes} found={found} />
                </div>
            )}
        </div>
    );
}
