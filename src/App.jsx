import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import UploadPage from './pages/UploadPage'
import ResultPage from './pages/ResultPage'
import ESGReportPage from './pages/Esgreportpage'
import OJKStatusPage from './pages/Ojkstatuspage'
import NotificationsPage from './pages/Notificationspage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/esg-report" element={<ESGReportPage />} />
        <Route path="/ojk-status" element={<OJKStatusPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App