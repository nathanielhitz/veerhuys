import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import TerrasPage from './pages/TerrasPage'
import AgendaPage from './pages/AgendaPage'
import NKSprietlopenPage from './pages/NKSprietlopenPage'
import HuisregelsPage from './pages/HuisregelsPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/"                   element={<HomePage />} />
            <Route path="/terras"             element={<TerrasPage />} />
            <Route path="/agenda"             element={<AgendaPage />} />
            <Route path="/nk-sprietlopen"     element={<NKSprietlopenPage />} />
            <Route path="/huisregels"         element={<HuisregelsPage />} />
            <Route path="/contact"            element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
