import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SIDEBAR_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '📤', label: 'Upload Report', path: '/upload' },
  { icon: '🌿', label: 'ESG Report', path: '/dashboard' },
  { icon: '⚖️', label: 'OJK Status', path: '/dashboard' },
  { icon: '🔔', label: 'Notifications', path: '/dashboard' },
  { icon: '📄', label: 'SDG Reports', path: '/result', active: true },
]

// ─── Rumus kalkulasi ESG ───────────────────────────────────────────────
function calculateESG(data) {
  const carbon = parseFloat(data.carbonEmission) || 0
  const social = parseFloat(data.socialScore) || 0
  const gov    = parseFloat(data.governanceScore) || 0

  // Environmental score: makin rendah emisi makin bagus
  // Threshold: 600 ton = score 50, 0 ton = score 100
  const envScore = Math.max(0, Math.min(100, 100 - (carbon / 600) * 50))

  // ESG Score = rata-rata tertimbang (E:30%, S:35%, G:35%)
  const esgScore = (envScore * 0.30) + (social * 0.35) + (gov * 0.35)

  // OJK Compliance (berdasarkan governance + social)
  const ojkScore = Math.min(100, (gov * 0.6) + (social * 0.4))

  // SDG 12 (sustainability) = env + social
  const sdg12 = Math.min(100, (envScore * 0.5) + (social * 0.5))

  // SDG 16 (governance) = governance score langsung
  const sdg16 = Math.min(100, gov)

  // Financial ratios
  const revenue    = parseFloat(data.revenue) || 1
  const netProfit  = parseFloat(data.netProfit) || 0
  const totalAssets= parseFloat(data.totalAssets) || 1
  const profitMargin = ((netProfit / revenue) * 100).toFixed(1)
  const roa          = ((netProfit / totalAssets) * 100).toFixed(1)

  // Notifikasi
  const notifications = []
  if (carbon > 600) notifications.push({ type: 'danger', msg: `Emisi karbon ${carbon} ton melebihi threshold 600 ton` })
  if (social < 60)  notifications.push({ type: 'danger', msg: `Social score ${social} di bawah threshold minimum 60` })
  if (gov < 65)     notifications.push({ type: 'danger', msg: `Governance score ${gov} di bawah threshold minimum 65` })
  if (carbon > 400 && carbon <= 600) notifications.push({ type: 'warning', msg: `Emisi karbon ${carbon} ton mendekati batas maksimum` })
  if (social >= 60 && social < 75)   notifications.push({ type: 'warning', msg: 'Social score cukup baik, masih bisa ditingkatkan' })
  if (notifications.length === 0)    notifications.push({ type: 'ok', msg: 'Semua indikator ESG dalam kondisi baik ✅' })

  // Status kepatuhan per regulasi
  const compliance = [
    { name: 'POJK No. 77/2016', score: ojkScore, status: ojkScore >= 80 ? 'Compliant' : ojkScore >= 60 ? 'Warning' : 'Non-Compliant' },
    { name: 'BI Regulation',    score: Math.min(100, gov * 0.8 + social * 0.2), status: gov >= 65 ? 'Compliant' : 'Warning' },
    { name: 'SLIK Reporting',   score: Math.min(100, ojkScore * 0.9), status: ojkScore >= 75 ? 'Compliant' : 'Warning' },
    { name: 'ESG Disclosure',   score: esgScore, status: esgScore >= 70 ? 'Compliant' : esgScore >= 50 ? 'Warning' : 'Non-Compliant' },
  ]

  return {
    esgScore: esgScore.toFixed(1),
    envScore: envScore.toFixed(1),
    ojkScore: ojkScore.toFixed(1),
    sdg12: sdg12.toFixed(1),
    sdg16: sdg16.toFixed(1),
    profitMargin,
    roa,
    notifications,
    compliance,
    carbonEmission: carbon,
    socialScore: social,
    governanceScore: gov,
  }
}

function statusColor(status) {
  if (status === 'Compliant')     return '#00d4aa'
  if (status === 'Warning')       return '#f59e0b'
  return '#ef4444'
}

function statusIcon(status) {
  if (status === 'Compliant')     return '✅'
  if (status === 'Warning')       return '⚠️'
  return '❌'
}

export default function ResultPage() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('SDG Reports')
  const [result, setResult] = useState(null)
  const [rawData, setRawData] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('esgData')
    if (stored) {
      const data = JSON.parse(stored)
      setRawData(data)
      setResult(calculateESG(data))
    }
  }, [])

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#080c10', color: '#e8edf2' }}>
        <div className="text-center">
          <p className="text-slate-400 mb-4">Belum ada data untuk ditampilkan.</p>
          <Link to="/upload" className="px-6 py-3 rounded-xl font-bold text-black text-sm"
            style={{ background: '#00d4aa' }}>
            Upload Data Dulu
          </Link>
        </div>
      </div>
    )
  }

  const esgNum = parseFloat(result.esgScore)
  const esgColor = esgNum >= 75 ? '#00d4aa' : esgNum >= 50 ? '#f59e0b' : '#ef4444'
  const esgLabel = esgNum >= 75 ? 'BAIK' : esgNum >= 50 ? 'CUKUP' : 'PERLU PERBAIKAN'

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
            <h1 className="font-extrabold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>Hasil Analisis</h1>
            <p className="text-slate-500 text-xs mt-0.5">
              {rawData?.companyName || 'Perusahaan'} · Tahun {rawData?.reportYear || '2024'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/upload" className="text-sm text-slate-400 hover:text-white transition-colors">← Upload Ulang</Link>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-black transition-all hover:opacity-90"
              style={{ background: '#00d4aa', boxShadow: '0 0 20px rgba(0,212,170,0.25)' }}>
              📄 Export PDF
            </button>
          </div>
        </header>

        <div className="p-6 space-y-5">

          {/* ESG Score Hero */}
          <div className="rounded-2xl p-6 border relative overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.02)', borderColor: `${esgColor}30` }}>
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 blur-3xl"
              style={{ background: esgColor, transform: 'translate(30%, -30%)' }} />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-slate-400 text-sm mb-1">Overall ESG Score</p>
                <div className="font-extrabold text-6xl mb-2" style={{ color: esgColor, fontFamily: "'Syne', sans-serif" }}>
                  {result.esgScore}
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full"
                  style={{ color: esgColor, background: `${esgColor}15`, border: `1px solid ${esgColor}30` }}>
                  {esgLabel}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full sm:w-auto">
                {[
                  { label: 'Environmental', val: result.envScore, color: '#22c55e' },
                  { label: 'Social', val: result.socialScore, color: '#0ea5e9' },
                  { label: 'Governance', val: result.governanceScore, color: '#a78bfa' },
                  { label: 'OJK Score', val: result.ojkScore, color: '#00d4aa' },
                ].map(item => (
                  <div key={item.label} className="rounded-xl p-3 text-center border border-white/[0.06]"
                    style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <div className="font-bold text-xl" style={{ color: item.color }}>{item.val}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Compliance + SDG */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Compliance Status */}
            <div className="rounded-2xl p-5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="font-semibold text-sm mb-4">⚖️ Status Kepatuhan Regulasi</h3>
              <div className="space-y-3">
                {result.compliance.map(item => (
                  <div key={item.name} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                    <div>
                      <p className="text-sm text-slate-200">{item.name}</p>
                      <div className="h-1 w-24 rounded-full bg-white/5 mt-1.5 overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${item.score}%`, background: statusColor(item.status) }} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{statusIcon(item.status)}</span>
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ color: statusColor(item.status), background: `${statusColor(item.status)}15`, border: `1px solid ${statusColor(item.status)}30` }}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SDG Report */}
            <div className="rounded-2xl p-5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
              <h3 className="font-semibold text-sm mb-4">🌍 SDG 12 & 16 Alignment</h3>
              <div className="space-y-5">
                {[
                  { label: 'SDG 12 — Konsumsi & Produksi Berkelanjutan', val: parseFloat(result.sdg12), color: '#22c55e' },
                  { label: 'SDG 16 — Tata Kelola yang Baik', val: parseFloat(result.sdg16), color: '#0ea5e9' },
                ].map(sdg => (
                  <div key={sdg.label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-300">{sdg.label}</span>
                      <span className="font-bold text-sm" style={{ color: sdg.color }}>{sdg.val.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full transition-all" style={{ width: `${sdg.val}%`, background: sdg.color }} />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {sdg.val >= 75 ? '✅ Alignment baik' : sdg.val >= 50 ? '⚠️ Perlu peningkatan' : '❌ Alignment rendah'}
                    </p>
                  </div>
                ))}

                {/* Financial Summary */}
                <div className="pt-3 border-t border-white/[0.06]">
                  <p className="text-xs text-slate-500 mb-3 font-semibold uppercase tracking-wider">Ringkasan Keuangan</p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl p-3 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-xs text-slate-500">Profit Margin</p>
                      <p className="font-bold text-lg" style={{ color: parseFloat(result.profitMargin) > 0 ? '#00d4aa' : '#ef4444' }}>
                        {result.profitMargin}%
                      </p>
                    </div>
                    <div className="rounded-xl p-3 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
                      <p className="text-xs text-slate-500">Return on Assets</p>
                      <p className="font-bold text-lg" style={{ color: parseFloat(result.roa) > 0 ? '#00d4aa' : '#ef4444' }}>
                        {result.roa}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-2xl p-5 border border-white/[0.06]" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <h3 className="font-semibold text-sm mb-4">🔔 Notifikasi & Rekomendasi ESG</h3>
            <div className="space-y-3">
              {result.notifications.map((notif, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl border border-white/[0.04]"
                  style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <span className="text-lg flex-shrink-0 mt-0.5">
                    {notif.type === 'ok' ? '✅' : notif.type === 'warning' ? '⚠️' : '❌'}
                  </span>
                  <p className="text-sm text-slate-300">{notif.msg}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link to="/dashboard"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition-all">
              📊 Kembali ke Dashboard
            </Link>
            <Link to="/upload"
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-white/10 text-sm font-medium text-slate-300 hover:text-white hover:border-white/20 transition-all">
              📤 Upload Laporan Baru
            </Link>
            <button onClick={() => window.print()}
              className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-black transition-all hover:opacity-90"
              style={{ background: '#00d4aa', boxShadow: '0 0 20px rgba(0,212,170,0.2)' }}>
              📄 Download Laporan PDF
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}