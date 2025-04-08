import newsLogo from '../assets/newsLogo.png'
import profileLogo from '../assets/profileicon.jpg'
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
            <div className='nav-left'>
                <img className='news-logo' src={newsLogo} alt="news logo" onChange={goHome}/>
                <ul className = "nav-links">
                    <li>Tech</li>
                    <li>Business</li>
                </ul>
            </div>
            
            <div className='nav-center'>
                <input className="search-bar"
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleChange}
                />
            </div>

            <div className='nav-right'>
                <img className='profile-logo' src={profileLogo} />
            </div>
        </div>
    )
}

export default Navbar