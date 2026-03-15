import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SIDEBAR_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '📤', label: 'Upload Report', path: '/upload' },
  { icon: '🌿', label: 'ESG Report', path: '/esg-report', active: true },
  { icon: '⚖️', label: 'OJK Status', path: '/ojk-status' },
  { icon: '🔔', label: 'Notifications', path: '/notifications' },
  { icon: '📄', label: 'SDG Reports', path: '/result' },
]

const MONTHLY_DATA = [
  { month: 'Oct', carbon: 520, social: 68, gov: 72 },
  { month: 'Nov', carbon: 498, social: 70, gov: 74 },
  { month: 'Dec', carbon: 510, social: 72, gov: 75 },
  { month: 'Jan', carbon: 480, social: 74, gov: 77 },
  { month: 'Feb', carbon: 460, social: 76, gov: 79 },
  { month: 'Mar', carbon: 450, social: 75, gov: 80 },
]

export default function ESGReportPage() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('ESG Report')
  const [activeTab, setActiveTab] = useState('environmental')

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
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-slate-400 hover:text-red-400 transition-all">
            <span>🚪</span>
            <span className="text-sm font-medium hidden md:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-16 md:ml-64">
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/[0.06]"
          style={{ background: 'rgba(8,12,16,0.8)', backdropFilter: 'blur(12px)' }}>
          <div>
            <h1 className="font-extrabold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>ESG Report</h1>
            <p className="text-slate-500 text-xs mt-0.5">Environmental · Social · Governance</p>
          </div>
          <Link to="/upload" className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black"
            style={{ background: '#00d4aa', boxShadow: '0 0 20px rgba(0,212,170,0.25)' }}>
            📤 Upload Baru
          </Link>
        </header>

        <div className="p-6 space-y-5">

          {/* ESG Score Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Environmental Score', value: '62.5', sub: 'Emisi karbon 450 ton CO₂', color: '#22c55e', icon: '🌱', trend: '▲ 3.2%' },
              { label: 'Social Score', value: '75.0', sub: 'Program sosial aktif', color: '#0ea5e9', icon: '👥', trend: '▲ 1.5%' },
              { label: 'Governance Score', value: '80.0', sub: 'Tata kelola baik', color: '#a78bfa', icon: '🏛️', trend: '▲ 2.1%' },
            ].map(card => (
              <div key={card.label} className="rounded-2xl p-5 border border-white/[0.06] relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 blur-2xl"
                  style={{ background: card.color, transform: 'translate(30%,-30%)' }} />
                <div className="flex justify-between items-start mb-3">
                  <span className="text-slate-400 text-sm">{card.label}</span>
                  <span className="text-xl">{card.icon}</span>
                </div>
                <div className="font-extrabold text-3xl mb-1" style={{ color: card.color, fontFamily: "'Syne', sans-serif" }}>{card.value}</div>
                <p className="text-xs text-slate-500">{card.sub}</p>
                <p className="text-xs font-semibold mt-1" style={{ color: card.color }}>{card.trend} bulan ini</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="rounded-2xl border border-white/[0.06] overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex border-b border-white/[0.06]">
              {[
                { id: 'environmental', label: '🌱 Environmental' },
                { id: 'social', label: '👥 Social' },
                { id: 'governance', label: '🏛️ Governance' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className="flex-1 py-3 text-sm font-medium transition-all"
                  style={{
                    color: activeTab === tab.id ? '#00d4aa' : '#64748b',
                    borderBottom: activeTab === tab.id ? '2px solid #00d4aa' : '2px solid transparent',
                    background: activeTab === tab.id ? 'rgba(0,212,170,0.05)' : 'transparent'
                  }}>
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-5">
              {activeTab === 'environmental' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm mb-3">Tren Emisi Karbon (ton CO₂)</h3>
                  <div className="flex items-end gap-3" style={{ height: '120px' }}>
                    {MONTHLY_DATA.map((d, i) => (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-lg transition-all"
                          style={{
                            height: `${(d.carbon / 600) * 110}px`,
                            background: i === MONTHLY_DATA.length - 1
                              ? 'linear-gradient(180deg, #22c55e, rgba(34,197,94,0.4))'
                              : 'rgba(255,255,255,0.08)'
                          }} />
                        <span className="text-xs text-slate-500">{d.month}</span>
                        <span className="text-xs font-semibold" style={{ color: '#22c55e' }}>{d.carbon}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-xs text-slate-500">Total Emisi (Mar)</p>
                      <p className="font-bold text-lg text-green-400">450 ton</p>
                      <p className="text-xs text-green-400">✅ Di bawah threshold 600 ton</p>
                    </div>
                    <div className="p-3 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-xs text-slate-500">Reduksi vs Okt</p>
                      <p className="font-bold text-lg text-green-400">-13.5%</p>
                      <p className="text-xs text-green-400">↓ 70 ton berkurang</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'social' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm mb-3">Social Score Trend</h3>
                  <div className="flex items-end gap-3" style={{ height: '120px' }}>
                    {MONTHLY_DATA.map((d, i) => (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-lg transition-all"
                          style={{
                            height: `${d.social * 1.2}px`,
                            background: i === MONTHLY_DATA.length - 1
                              ? 'linear-gradient(180deg, #0ea5e9, rgba(14,165,233,0.4))'
                              : 'rgba(255,255,255,0.08)'
                          }} />
                        <span className="text-xs text-slate-500">{d.month}</span>
                        <span className="text-xs font-semibold" style={{ color: '#0ea5e9' }}>{d.social}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-xs text-slate-500">Social Score (Mar)</p>
                      <p className="font-bold text-lg text-blue-400">75.0</p>
                      <p className="text-xs text-blue-400">✅ Di atas threshold 60</p>
                    </div>
                    <div className="p-3 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-xs text-slate-500">Program Sosial Aktif</p>
                      <p className="font-bold text-lg text-blue-400">12</p>
                      <p className="text-xs text-blue-400">↑ 3 program baru</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'governance' && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm mb-3">Governance Score Trend</h3>
                  <div className="flex items-end gap-3" style={{ height: '120px' }}>
                    {MONTHLY_DATA.map((d, i) => (
                      <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t-lg transition-all"
                          style={{
                            height: `${d.gov * 1.2}px`,
                            background: i === MONTHLY_DATA.length - 1
                              ? 'linear-gradient(180deg, #a78bfa, rgba(167,139,250,0.4))'
                              : 'rgba(255,255,255,0.08)'
                          }} />
                        <span className="text-xs text-slate-500">{d.month}</span>
                        <span className="text-xs font-semibold" style={{ color: '#a78bfa' }}>{d.gov}</span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    <div className="p-3 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-xs text-slate-500">Governance Score (Mar)</p>
                      <p className="font-bold text-lg text-purple-400">80.0</p>
                      <p className="text-xs text-purple-400">✅ Di atas threshold 65</p>
                    </div>
                    <div className="p-3 rounded-xl border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-xs text-slate-500">Kebijakan Tata Kelola</p>
                      <p className="font-bold text-lg text-purple-400">8/10</p>
                      <p className="text-xs text-purple-400">↑ Meningkat dari 7/10</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ESG Summary Table */}
          <div className="rounded-2xl p-5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <h3 className="font-semibold text-sm mb-4">📋 Ringkasan ESG 6 Bulan Terakhir</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.06]">
                    {['Bulan', 'Emisi Karbon', 'Social Score', 'Gov Score', 'ESG Total'].map(h => (
                      <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {MONTHLY_DATA.map((d, i) => {
                    const envScore = Math.max(0, 100 - (d.carbon / 600) * 50)
                    const esg = ((envScore * 0.3) + (d.social * 0.35) + (d.gov * 0.35)).toFixed(1)
                    return (
                      <tr key={d.month} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors">
                        <td className="py-2.5 px-3 font-medium">{d.month} 2024{i >= 3 ? '/25' : ''}</td>
                        <td className="py-2.5 px-3" style={{ color: d.carbon > 500 ? '#f59e0b' : '#22c55e' }}>{d.carbon} ton</td>
                        <td className="py-2.5 px-3" style={{ color: '#0ea5e9' }}>{d.social}</td>
                        <td className="py-2.5 px-3" style={{ color: '#a78bfa' }}>{d.gov}</td>
                        <td className="py-2.5 px-3 font-bold" style={{ color: parseFloat(esg) >= 75 ? '#00d4aa' : '#f59e0b' }}>{esg}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}