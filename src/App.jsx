import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import TechNews from './pages/TechNews'
import BusinessNews from './pages/BusinessNews'
import Stocks from './pages/Stocks'
import Crypto from './pages/Crypto'
import Profile from './pages/Profile'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import './styles/App.css'
function App() {

  return (
    <div className='app-wrapper'>
      <BrowserRouter>
        <Navbar/>
        <main className='main-content'>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/technology" element={<TechNews/>}/>
            <Route path="/business" element={<BusinessNews/>}/>
            <Route path="/stocks" element={<Stocks/>}/>
            <Route path="/crypto" element={<Crypto/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
        </main>
        <Footer/>
      </BrowserRouter>
    </div>
  )
}

export default App
