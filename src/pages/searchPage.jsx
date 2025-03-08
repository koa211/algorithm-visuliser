import React from "react"
import { useNavigate  } from "react-router-dom"
import "./searchPage.css";

function SearchPage() {
    const navigate = useNavigate();

    return (
        <div className="search-container">
            {/* Back Button */}
            <button className="back-button" onClick={() => navigate("/")}>
                Back to Main Page
            </button>

            {/* Page Title */}
            <header className="search-header">
                <h1>Searching Algorithms</h1>
                <p>Searching algorithms are used to find an element in a data structure, such as an array or list.</p>
            </header>

            {/* Algorithms Section */}
            <section className="algorithm-section">
                <div className="algorithm-card">
                    <h2>Linear Search</h2>
                    <p>
                        Linear Search is a simple searching algorithm that checks each element one by one
                        until the target value is found or the list ends.
                    </p>
                </div>

                {/* More algorithms can be added here */}
            </section>
        </div>
    );
}

export default SearchPage;

