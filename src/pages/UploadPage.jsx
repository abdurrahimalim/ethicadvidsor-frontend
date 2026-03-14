import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SIDEBAR_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '📤', label: 'Upload Report', path: '/upload', active: true },
  { icon: '🌿', label: 'ESG Report', path: '/dashboard' },
  { icon: '⚖️', label: 'OJK Status', path: '/dashboard' },
  { icon: '🔔', label: 'Notifications', path: '/dashboard' },
  { icon: '📄', label: 'SDG Reports', path: '/result' },
]

export default function UploadPage() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('Upload Report')
  const [step, setStep] = useState(1) // 1: input form, 2: processing, 3: done

  const [formData, setFormData] = useState({
    companyName: '',
    reportYear: '2024',
    carbonEmission: '',
    socialScore: '',
    governanceScore: '',
    revenue: '',
    netProfit: '',
    totalAssets: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    // Simpan data ke localStorage supaya ResultPage bisa baca
    localStorage.setItem('esgData', JSON.stringify(formData))
    setStep(2)
    setTimeout(() => {
      setStep(3)
      setTimeout(() => navigate('/result'), 1000)
    }, 2000)
  }

  const isFormValid = formData.companyName && formData.carbonEmission &&
    formData.socialScore && formData.governanceScore &&
    formData.revenue && formData.netProfit && formData.totalAssets

  return (
    <div className="min-h-screen flex" style={{ background: '#080c10', color: '#e8edf2', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Sidebar */}
      <aside className="fixed top-0 left-0 h-full z-40 w-16 md:w-64 flex flex-col bg-white/[0.03] border-r border-white/[0.06]">
        <div className="flex items-center gap-3 px-4 py-6 border-b border-white/[0.06]">
          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#00d4aa', boxShadow: '0 0 10px #00d4aa' }} />
          <span className="font-extrabold text-lg hidden md:block" style={{ fontFamily: "'Syne', sans-serif" }}>EthicAdvidsor</span>
        </div>
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {SIDEBAR_ITEMS.map(item => (
            <Link key={item.label} to={item.path} onClick={() => setActiveNav(item.label)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
              style={{ color: activeNav === item.label ? '#00d4aa' : '#94a3b8', background: activeNav === item.label ? 'rgba(0,212,170,0.08)' : 'transparent' }}>
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="text-sm font-medium hidden md:block">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/[0.06]">
          <button onClick={() => navigate('/login')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all">
            <span>🚪</span>
            <span className="text-sm font-medium hidden md:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-16 md:ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/[0.06]"
          style={{ background: 'rgba(8,12,16,0.8)', backdropFilter: 'blur(12px)' }}>
          <div>
            <h1 className="font-extrabold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>Upload Report</h1>
            <p className="text-slate-500 text-xs mt-0.5">Input data keuangan & ESG perusahaan</p>
          </div>
          <Link to="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">← Back to Dashboard</Link>
        </header>

        <div className="p-6 max-w-3xl mx-auto">

          {/* Step indicator */}
          <div className="flex items-center gap-3 mb-8">
            {['Input Data', 'Processing', 'Done'].map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all"
                  style={{
                    background: step > i ? '#00d4aa' : step === i + 1 ? 'rgba(0,212,170,0.2)' : 'rgba(255,255,255,0.05)',
                    color: step > i ? '#000' : step === i + 1 ? '#00d4aa' : '#64748b',
                    border: step === i + 1 ? '1px solid #00d4aa' : '1px solid transparent'
                  }}>
                  {step > i ? '✓' : i + 1}
                </div>
                <span className="text-sm hidden sm:block" style={{ color: step === i + 1 ? '#00d4aa' : '#64748b' }}>{s}</span>
                {i < 2 && <div className="w-8 h-px bg-white/10 hidden sm:block" />}
              </div>
            ))}
          </div>

          {/* Processing overlay */}
          {step === 2 && (
            <div className="rounded-2xl p-12 border border-white/[0.06] text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-4xl mb-4 animate-spin inline-block">⚙️</div>
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Menganalisis Data...</h3>
              <p className="text-slate-400 text-sm">Sistem sedang menghitung ESG score dan status kepatuhan OJK</p>
              <div className="mt-6 h-1.5 rounded-full bg-white/5 overflow-hidden max-w-xs mx-auto">
                <div className="h-full rounded-full animate-pulse" style={{ width: '70%', background: '#00d4aa' }} />
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="rounded-2xl p-12 border border-white/[0.06] text-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>Analisis Selesai!</h3>
              <p className="text-slate-400 text-sm">Mengarahkan ke halaman hasil...</p>
            </div>
          )}

          {/* Form */}
          {step === 1 && (
            <div className="space-y-5">

              {/* Company Info */}
              <div className="rounded-2xl p-6 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
                  <span>🏢</span> Informasi Perusahaan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">Nama Perusahaan</label>
                    <input name="companyName" value={formData.companyName} onChange={handleChange}
                      placeholder="PT. Contoh FinTech Indonesia"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-primary/50 transition-colors"
                      style={{ '--tw-border-opacity': 1 }} />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">Tahun Laporan</label>
                    <select name="reportYear" value={formData.reportYear} onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)' }}>
                      <option value="2024" style={{ background: '#0d1117' }}>2024</option>
                      <option value="2023" style={{ background: '#0d1117' }}>2023</option>
                      <option value="2022" style={{ background: '#0d1117' }}>2022</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* ESG Data */}
              <div className="rounded-2xl p-6 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <span>🌿</span> Data ESG
                </h3>
                <p className="text-xs text-slate-500 mb-4">Environmental, Social & Governance indicators</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Emisi Karbon (ton CO₂)
                    </label>
                    <input name="carbonEmission" value={formData.carbonEmission} onChange={handleChange}
                      type="number" placeholder="contoh: 450"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none" />
                    <p className="text-xs text-slate-600 mt-1">Threshold: &lt; 600 ton</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Social Score (0–100)
                    </label>
                    <input name="socialScore" value={formData.socialScore} onChange={handleChange}
                      type="number" min="0" max="100" placeholder="contoh: 75"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none" />
                    <p className="text-xs text-slate-600 mt-1">Threshold: &gt; 60 poin</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">
                      Governance Score (0–100)
                    </label>
                    <input name="governanceScore" value={formData.governanceScore} onChange={handleChange}
                      type="number" min="0" max="100" placeholder="contoh: 80"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none" />
                    <p className="text-xs text-slate-600 mt-1">Threshold: &gt; 65 poin</p>
                  </div>
                </div>
              </div>

              {/* Financial Data */}
              <div className="rounded-2xl p-6 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="font-semibold text-sm mb-1 flex items-center gap-2">
                  <span>💰</span> Data Keuangan
                </h3>
                <p className="text-xs text-slate-500 mb-4">Dalam jutaan rupiah (Rp juta)</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: 'revenue', label: 'Total Pendapatan', placeholder: 'contoh: 50000' },
                    { name: 'netProfit', label: 'Laba Bersih', placeholder: 'contoh: 8000' },
                    { name: 'totalAssets', label: 'Total Aset', placeholder: 'contoh: 150000' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5 block">{field.label}</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">Rp</span>
                        <input name={field.name} value={formData[field.name]} onChange={handleChange}
                          type="number" placeholder={field.placeholder}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <button onClick={handleSubmit} disabled={!isFormValid}
                className="w-full py-4 rounded-xl font-bold text-sm transition-all"
                style={{
                  background: isFormValid ? '#00d4aa' : 'rgba(255,255,255,0.05)',
                  color: isFormValid ? '#000' : '#475569',
                  boxShadow: isFormValid ? '0 0 24px rgba(0,212,170,0.25)' : 'none',
                  cursor: isFormValid ? 'pointer' : 'not-allowed'
                }}>
                {isFormValid ? '🚀 Analisis Data & Lihat Hasil' : 'Lengkapi semua field untuk melanjutkan'}
              </button>

            </div>
          )}
        </div>
      </main>
    </div>
  )
}