import './App.scss'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { About } from './pages/About/About'
import { Contact } from './pages/Contact/Contact'
import { Category } from './pages/Category/Category'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category" element={<Category />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
