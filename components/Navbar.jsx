'use client';
import profileLogo from '../public/user.png';
import { useRouter } from 'next/navigation';
import '../styles/Navbar.css'


import { useState } from 'react';

function Navbar({ onSearch }) {
const [query, setQuery] = useState('');
const router = useRouter();

const handleChange = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

const goHome = () => {
    router.push('/');
}

const goTechNews = () => {
    router.push('/tech-news');
}

const goBusinessNews = () => {
    router.push('/business-news');
}

const goStocks = () => {
    router.push('/stocks');
}

const goCrypto = () => {
    router.push('/crypto');
}

const goProfile = () => {
    router.push('/profile');
}
    return(
        <div className="navbar">
            <div className='nav-left'>
                <img className='news-logo' src="/newsLogo.png" alt="news logo" onClick={goHome}/>
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
                <img className='profile-logo' src="/user.png" onClick={goProfile}/>
            </div>
        </div>
    )
}

export default Navbar