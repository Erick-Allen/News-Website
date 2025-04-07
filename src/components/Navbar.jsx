import newsLogo from '../assets/newsLogo.png'
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'


import { useState } from 'react';

function Navbar({ onSearch }) {
const [query, setQuery] = useState('');
const navigate = useNavigate();

const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

const goHome = () => {
    navigate('/');
}

    return(
        <div className="navbar">
            <img
            className='news-logo'
            src={newsLogo} 
            alt="news logo"
            onChange={goHome}

            />
            <input className="search-bar"
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleChange}
            />
        </div>
    )
}

export default Navbar