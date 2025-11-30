import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import ThankYouDownload from './pages/ThankYouDownload'
import ThankYouConsultation from './pages/ThankYouConsultation'
import Privacy from './pages/Privacy'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank-you-download" element={<ThankYouDownload />} />
        <Route path="/thank-you-consultation" element={<ThankYouConsultation />} />
        <Route path="/privacy-policy" element={<Privacy />} />
      </Routes>
    </Layout>
  )
}

export default App
