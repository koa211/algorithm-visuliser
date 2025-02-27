import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import BruteforcePage from './pages/BruteForce';

function HomePage() {
    return (
        <div>
            <h1>Algorithm Visualiser</h1>

            {/* Navigation */}
            <nav>
                <Link to="/bruteforce">
                    <button>Bruteforce Algorithm</button>
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

            {/* Bruteforce Algorithm Page Route */}
            <Route path="/bruteforce" element={<BruteforcePage />} />
        </Routes>
    );
}

export default App;
