'use client';
import '../styles/Footer.css';
function Footer() {
    
    return (
        <div className="footer">
            <p>
            &copy; {new Date().getFullYear()} My News Website
            </p>
        </div>
    )
}

export default Footer