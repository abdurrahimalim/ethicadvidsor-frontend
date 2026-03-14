import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NAV_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard', active: true },
  { icon: '📤', label: 'Upload Report', path: '/upload' },
  { icon: '🌿', label: 'ESG Report', path: '/dashboard' },
  { icon: '⚖️', label: 'OJK Status', path: '/dashboard' },
  { icon: '🔔', label: 'Notifications', path: '/dashboard' },
  { icon: '📄', label: 'SDG Reports', path: '/result' },
]

const COMPLIANCE_DATA = [
  { name: 'POJK No. 77/2016', status: 'Compliant', color: '#00d4aa' },
  { name: 'BI Regulation', status: 'Compliant', color: '#00d4aa' },
  { name: 'SLIK Reporting', status: 'Warning', color: '#f59e0b' },
  { name: 'ESG Disclosure', status: 'Compliant', color: '#00d4aa' },
]

const NOTIFICATIONS = [
  { type: 'warning', msg: 'Carbon emission threshold approaching limit', time: '2h ago' },
  { type: 'ok', msg: 'OJK quarterly report submitted successfully', time: '5h ago' },
  { type: 'danger', msg: 'SLIK reporting deadline in 3 days', time: '1d ago' },
]

const ESG_BARS = [
  { month: 'Oct', val: 55 },
  { month: 'Nov', val: 68 },
  { month: 'Dec', val: 78 },
  { month: 'Jan', val: 72 },
  { month: 'Feb', val: 88 },
  { month: 'Mar', val: 110 },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const [sidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Dashboard')

  return (
    <div className="min-h-screen flex" style={{ background: '#080c10', color: '#e8edf2', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full z-40 flex flex-col
        transition-all duration-300
        ${sidebarOpen ? 'w-64' : 'w-16 md:w-64'}
        bg-white/[0.03] border-r border-white/[0.06]
      `}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-6 border-b border-white/[0.06]">
          <div className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: '#00d4aa', boxShadow: '0 0 10px #00d4aa' }} />
          <span className="font-extrabold text-lg hidden md:block whitespace-nowrap"
            style={{ fontFamily: "'Syne', sans-serif" }}>
            EthicAdvidsor
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 flex flex-col gap-1 px-2">
          {NAV_ITEMS.map(item => (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setActiveNav(item.label)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${activeNav === item.label
                  ? 'bg-primary/10 text-primary'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'}
              `}
              style={{ color: activeNav === item.label ? '#00d4aa' : undefined }}>
              <span className="text-base flex-shrink-0">{item.icon}</span>
              <span className="text-sm font-medium hidden md:block whitespace-nowrap">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-white/[0.06]">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full text-slate-400 hover:text-red-400 hover:bg-red-400/5 transition-all">
            <span className="flex-shrink-0">🚪</span>
            <span className="text-sm font-medium hidden md:block">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 ml-16 md:ml-64 min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 border-b border-white/[0.06]"
          style={{ background: 'rgba(8,12,16,0.8)', backdropFilter: 'blur(12px)' }}>
          <div>
            <h1 className="font-extrabold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>
              Compliance Dashboard
            </h1>
            <p className="text-slate-500 text-xs mt-0.5">Last updated: March 2025 · Q1 Report</p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/upload"
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black transition-all hover:opacity-90"
              style={{ background: '#00d4aa', boxShadow: '0 0 20px rgba(0,212,170,0.25)' }}>
              <span>📤</span>
              <span className="hidden sm:block">Upload Report</span>
            </Link>
          </div>
        </header>

        <div className="p-6 space-y-6">

          {/* KPI Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'ESG Score', value: '87.4', sub: '▲ 4.2% this quarter', subColor: '#00d4aa', color: '#00d4aa', icon: '🌿' },
              { label: 'OJK Compliance', value: '94%', sub: '▲ 2.1% this month', subColor: '#22c55e', color: '#22c55e', icon: '⚖️' },
              { label: 'Carbon Emission', value: '512t', sub: '▼ 8% vs last year', subColor: '#f59e0b', color: '#f59e0b', icon: '🌍' },
            ].map(kpi => (
              <div key={kpi.label}
                className="rounded-2xl p-5 border border-white/[0.06] relative overflow-hidden"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="absolute top-0 right-0 w-20 h-20 rounded-full opacity-10 blur-2xl"
                  style={{ background: kpi.color, transform: 'translate(30%, -30%)' }} />
                <div className="flex items-start justify-between mb-3">
                  <span className="text-slate-400 text-sm">{kpi.label}</span>
                  <span className="text-xl">{kpi.icon}</span>
                </div>
                <div className="font-extrabold text-3xl mb-1" style={{ color: kpi.color, fontFamily: "'Syne', sans-serif" }}>
                  {kpi.value}
                </div>
                <div className="text-xs font-medium" style={{ color: kpi.subColor }}>{kpi.sub}</div>
              </div>
            ))}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* ESG Bar Chart */}
            <div className="rounded-2xl p-5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">ESG Score Trend (6 months)</h3>
                <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-lg">2024 – 2025</span>
              </div>
              <div className="flex gap-2" style={{ height: '110px', alignItems: 'flex-end', display: 'flex' }}>
                {ESG_BARS.map((bar, i) => (
                  <div key={bar.month} className="flex-1 flex flex-col items-center gap-1">
                    <div className="w-full rounded-t-lg"
                      style={{
                        height: `${bar.val}px`,
                        background: i === ESG_BARS.length - 1
                          ? 'linear-gradient(180deg, #00d4aa, rgba(0,212,170,0.4))'
                          : 'rgba(255,255,255,0.08)',
                        boxShadow: i === ESG_BARS.length - 1 ? '0 0 12px rgba(0,212,170,0.3)' : 'none'
                      }} />
                    <span className="text-xs text-slate-500">{bar.month}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulation Status */}
            <div className="rounded-2xl p-5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="font-semibold text-sm mb-4">Regulation Status</h3>
              <div className="space-y-3">
                {COMPLIANCE_DATA.map(item => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <span className="text-sm text-slate-300">{item.name}</span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        color: item.color,
                        background: `${item.color}15`,
                        border: `1px solid ${item.color}30`
                      }}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance Progress + Notifications */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Compliance Progress */}
            <div className="rounded-2xl p-5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="font-semibold text-sm mb-4">Compliance Overview</h3>
              <div className="space-y-4">
                {[
                  { name: 'OJK Regulation (POJK)', pct: 94, color: '#00d4aa' },
                  { name: 'Bank Indonesia Standards', pct: 88, color: '#0ea5e9' },
                  { name: 'ESG Disclosure Standards', pct: 76, color: '#f59e0b' },
                  { name: 'SDG 12 & 16 Alignment', pct: 82, color: '#22c55e' },
                ].map(item => (
                  <div key={item.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-slate-300">{item.name}</span>
                      <span className="text-sm font-bold" style={{ color: item.color }}>{item.pct}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${item.pct}%`, background: item.color, boxShadow: `0 0 6px ${item.color}60` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notifications */}
            <div className="rounded-2xl p-5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Ethics & ESG Notifications</h3>
                <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full border border-red-500/30">
                  {NOTIFICATIONS.length} alerts
                </span>
              </div>
              <div className="space-y-3">
                {NOTIFICATIONS.map((notif, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-white/[0.04]"
                    style={{ background: 'rgba(255,255,255,0.02)' }}>
                    <span className="text-lg flex-shrink-0 mt-0.5">
                      {notif.type === 'warning' ? '⚠️' : notif.type === 'ok' ? '✅' : '❌'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-300 leading-snug">{notif.msg}</p>
                      <p className="text-xs text-slate-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="rounded-2xl p-5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <h3 className="font-semibold text-sm mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: '📤', label: 'Upload Report', path: '/upload', color: '#00d4aa' },
                { icon: '📊', label: 'View Results', path: '/result', color: '#0ea5e9' },
                { icon: '📄', label: 'SDG Report', path: '/result', color: '#22c55e' },
                { icon: '⚖️', label: 'OJK Check', path: '/dashboard', color: '#f59e0b' },
              ].map(action => (
                <Link key={action.label} to={action.path}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl border border-white/[0.06] hover:border-white/20 transition-all hover:-translate-y-0.5 text-center"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-2xl">{action.icon}</span>
                  <span className="text-xs font-medium text-slate-400">{action.label}</span>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}