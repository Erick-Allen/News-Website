import newsLogo from '../assets/newsLogo.png'
import profileLogo from '../assets/usericon.png'
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

const goTechNews = () => {
    navigate('/technology');
}

const goBusinessNews = () => {
    navigate('/business');
}

const goStocks = () => {
    navigate('/stocks');
}

const goCrypto = () => {
    navigate('/crypto');
}

const goProfile = () => {
    navigate('/profile');
}
    return(
        <div className="navbar">
            <div className='nav-left'>
                <img className='news-logo' src={newsLogo} alt="news logo" onClick={goHome}/>
                <ul className = "nav-news-links">
                    <li onClick={goTechNews}>Tech</li>
                    <li onClick={goBusinessNews}>Business</li>
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
                <ul className="nav-market-links">
                    <li onClick={goStocks}>Stocks</li>
                    <li onClick={goCrypto}>Crypto</li>
                </ul>
                <img className='profile-logo' src={profileLogo} onClick={goProfile}/>
            </div>
        </div>
    )
}

export default Navbar