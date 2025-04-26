import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import '../styles/App.css';

export const metadata = {
    title: 'News Website',
    description: 'Stay up to date with the latest news, crypto, and stocks',
  };
  
  export default function RootLayout({ children }) {
    return (
      <html lang="en">
        <body>
            <div className="app-wrapper">
                <Navbar />
                <main className="main-content">{children}</main>
                <Footer />
            </div>
        </body>
      </html>
    );
  }