import './App.scss'
import { Header } from './components/Header/Header'
import { Footer } from './components/Footer/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { About } from './pages/About/About'
import { Contact } from './pages/Contact/Contact'
import { Category } from './pages/Category/Category'
import { Admin } from './pages/Admin/Admin'
import { AdminLogin } from './pages/Admin/pages/Login/Login'
import { ScrollToTop } from './components/ScrollToTop'
import { ProtectedRoute } from './pages/Admin/components/ProtectedRoute'

function App() {
  const isAdminSubdomain = window.location.hostname.startsWith('admin')

  return (
    <Router>
      <ScrollToTop />
      {isAdminSubdomain ? (
        <>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>} />
            <Route path="/login" element={<AdminLogin />} />
          </Routes>
        </>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/category" element={<Category />} />
          </Routes>
          <Footer />
        </>
      )}
    </Router>
  )
}

export default App
