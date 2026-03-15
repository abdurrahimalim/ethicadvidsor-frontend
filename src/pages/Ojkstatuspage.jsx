import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SIDEBAR_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '📤', label: 'Upload Report', path: '/upload' },
  { icon: '🌿', label: 'ESG Report', path: '/esg-report' },
  { icon: '⚖️', label: 'OJK Status', path: '/ojk-status', active: true },
  { icon: '🔔', label: 'Notifications', path: '/notifications' },
  { icon: '📄', label: 'SDG Reports', path: '/result' },
]

const REGULATIONS = [
  {
    code: 'POJK No. 77/2016',
    name: 'Layanan Pinjam Meminjam Uang Berbasis Teknologi',
    status: 'Compliant',
    score: 94,
    lastCheck: '15 Mar 2025',
    details: 'Transparansi biaya, perlindungan data, dan pelaporan berkala terpenuhi.',
    color: '#00d4aa',
  },
  {
    code: 'POJK No. 13/2018',
    name: 'Inovasi Keuangan Digital di Sektor Jasa Keuangan',
    status: 'Compliant',
    score: 88,
    lastCheck: '15 Mar 2025',
    details: 'Sandbox regulasi dan pelaporan inovasi digital sudah sesuai ketentuan.',
    color: '#00d4aa',
  },
  {
    code: 'SLIK Reporting',
    name: 'Sistem Layanan Informasi Keuangan',
    status: 'Warning',
    score: 72,
    lastCheck: '10 Mar 2025',
    details: 'Pelaporan data peminjam terlambat 3 hari dari deadline yang ditetapkan.',
    color: '#f59e0b',
  },
  {
    code: 'BI Regulation',
    name: 'Peraturan Bank Indonesia tentang Pembayaran Digital',
    status: 'Compliant',
    score: 91,
    lastCheck: '15 Mar 2025',
    details: 'Sistem pembayaran digital memenuhi standar keamanan dan interoperabilitas.',
    color: '#00d4aa',
  },
  {
    code: 'POJK No. 18/2025',
    name: 'Transparansi dan Publikasi Laporan Keuangan',
    status: 'Non-Compliant',
    score: 45,
    lastCheck: '12 Mar 2025',
    details: 'Laporan keuangan Q4 2024 belum dipublikasikan sesuai format yang diwajibkan.',
    color: '#ef4444',
  },
  {
    code: 'e-KYC Standard',
    name: 'Know Your Customer Elektronik',
    status: 'Compliant',
    score: 96,
    lastCheck: '15 Mar 2025',
    details: 'Proses verifikasi identitas digital memenuhi standar keamanan OJK.',
    color: '#00d4aa',
  },
]

function statusIcon(status) {
  if (status === 'Compliant') return '✅'
  if (status === 'Warning') return '⚠️'
  return '❌'
}

export default function OJKStatusPage() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('OJK Status')
  const [expanded, setExpanded] = useState(null)

  const compliant = REGULATIONS.filter(r => r.status === 'Compliant').length
  const warning = REGULATIONS.filter(r => r.status === 'Warning').length
  const nonCompliant = REGULATIONS.filter(r => r.status === 'Non-Compliant').length

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
            <h1 className="font-extrabold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>OJK Compliance Status</h1>
            <p className="text-slate-500 text-xs mt-0.5">Status kepatuhan regulasi OJK & Bank Indonesia</p>
          </div>
          <span className="text-xs text-slate-500 bg-white/5 px-3 py-1.5 rounded-lg">
            Last updated: 15 Mar 2025
          </span>
        </header>

        <div className="p-6 space-y-5">

          {/* Summary Cards */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Compliant', count: compliant, color: '#00d4aa', icon: '✅' },
              { label: 'Warning', count: warning, color: '#f59e0b', icon: '⚠️' },
              { label: 'Non-Compliant', count: nonCompliant, color: '#ef4444', icon: '❌' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl p-5 border border-white/[0.06] text-center relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="absolute inset-0 opacity-5 blur-xl rounded-2xl"
                  style={{ background: item.color }} />
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="font-extrabold text-3xl mb-1" style={{ color: item.color, fontFamily: "'Syne', sans-serif" }}>
                  {item.count}
                </div>
                <div className="text-xs text-slate-400">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Overall Progress */}
          <div className="rounded-2xl p-5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-sm">Overall Compliance Rate</h3>
              <span className="font-bold text-lg" style={{ color: '#00d4aa' }}>
                {Math.round((compliant / REGULATIONS.length) * 100)}%
              </span>
            </div>
            <div className="h-3 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full rounded-full transition-all"
                style={{
                  width: `${(compliant / REGULATIONS.length) * 100}%`,
                  background: 'linear-gradient(90deg, #00d4aa, #0ea5e9)'
                }} />
            </div>
            <p className="text-xs text-slate-500 mt-2">{compliant} dari {REGULATIONS.length} regulasi terpenuhi</p>
          </div>

          {/* Regulation List */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm px-1">Detail Kepatuhan Regulasi</h3>
            {REGULATIONS.map((reg, i) => (
              <div key={reg.code}
                className="rounded-2xl border border-white/[0.06] overflow-hidden cursor-pointer transition-all hover:border-white/10"
                style={{ background: 'rgba(255,255,255,0.02)' }}
                onClick={() => setExpanded(expanded === i ? null : i)}>
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-xl flex-shrink-0">{statusIcon(reg.status)}</span>
                    <div className="min-w-0">
                      <p className="font-semibold text-sm">{reg.code}</p>
                      <p className="text-xs text-slate-500 truncate">{reg.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-slate-500">Score</p>
                      <p className="font-bold text-sm" style={{ color: reg.color }}>{reg.score}%</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ color: reg.color, background: `${reg.color}15`, border: `1px solid ${reg.color}30` }}>
                      {reg.status}
                    </span>
                    <span className="text-slate-500 text-sm">{expanded === i ? '▲' : '▼'}</span>
                  </div>
                </div>

                {expanded === i && (
                  <div className="px-4 pb-4 pt-0 border-t border-white/[0.06]">
                    <div className="pt-3 space-y-3">
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${reg.score}%`, background: reg.color }} />
                      </div>
                      <p className="text-sm text-slate-300">{reg.details}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>📅 Terakhir dicek: {reg.lastCheck}</span>
                        {reg.status !== 'Compliant' && (
                          <span style={{ color: '#f59e0b' }}>⚡ Perlu tindakan segera</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}