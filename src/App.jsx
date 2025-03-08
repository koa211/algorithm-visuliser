import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SearchPage from './pages/searchPage.jsx';

function HomePage() {
    return (
        <div>
            <h1>Algorithm Visualiser</h1>

            {/* Navigation */}
            <nav>
                <Link to="/search">
                    <button>Searching Algorithms</button>
                </Link>
            </nav>
        </div>
    );
}

function App() {
    return (
        <Routes>
            {/* Home Page Route */}
            <Route path="/" element={<HomePage />} />

            {/* Searching Algorithm Page Route */}
            <Route path="/search" element={<SearchPage />} />
        </Routes>
    );
}

export default App;
