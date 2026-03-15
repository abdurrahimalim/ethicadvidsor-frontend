import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SIDEBAR_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/dashboard' },
  { icon: '📤', label: 'Upload Report', path: '/upload' },
  { icon: '🌿', label: 'ESG Report', path: '/esg-report' },
  { icon: '⚖️', label: 'OJK Status', path: '/ojk-status' },
  { icon: '🔔', label: 'Notifications', path: '/notifications', active: true },
  { icon: '📄', label: 'SDG Reports', path: '/result' },
]

const ALL_NOTIFICATIONS = [
  { id: 1, type: 'danger', category: 'ESG', title: 'Pelanggaran Threshold Emisi Karbon', desc: 'Emisi karbon bulan November mencapai 620 ton, melebihi batas maksimum 600 ton yang ditetapkan.', time: '2 jam lalu', date: '15 Mar 2025', read: false },
  { id: 2, type: 'warning', category: 'OJK', title: 'Deadline SLIK Reporting Mendekat', desc: 'Pelaporan SLIK untuk periode Maret 2025 jatuh tempo dalam 3 hari. Segera lengkapi data peminjam.', time: '5 jam lalu', date: '15 Mar 2025', read: false },
  { id: 3, type: 'ok', category: 'OJK', title: 'Laporan OJK Q1 Berhasil Dikirim', desc: 'Laporan keuangan kuartal pertama 2025 telah berhasil dikirimkan ke OJK dan diterima.', time: '1 hari lalu', date: '14 Mar 2025', read: true },
  { id: 4, type: 'warning', category: 'ESG', title: 'Social Score Mendekati Batas Minimum', desc: 'Social score bulan ini 62, mendekati batas minimum 60. Tingkatkan program sosial perusahaan.', time: '2 hari lalu', date: '13 Mar 2025', read: true },
  { id: 5, type: 'danger', category: 'OJK', title: 'POJK No. 18/2025 Belum Terpenuhi', desc: 'Laporan keuangan Q4 2024 belum dipublikasikan sesuai format POJK No. 18/2025. Segera lakukan publikasi.', time: '3 hari lalu', date: '12 Mar 2025', read: false },
  { id: 6, type: 'ok', category: 'ESG', title: 'ESG Score Meningkat', desc: 'ESG Score bulan Maret mencapai 87.4, meningkat 4.2% dari bulan sebelumnya. Pertahankan performa ini!', time: '5 hari lalu', date: '10 Mar 2025', read: true },
  { id: 7, type: 'warning', category: 'SDG', title: 'SDG 12 Alignment Perlu Ditingkatkan', desc: 'Alignment dengan SDG 12 saat ini 68.8%, masih di bawah target 75%. Review praktik keberlanjutan.', time: '1 minggu lalu', date: '8 Mar 2025', read: true },
  { id: 8, type: 'ok', category: 'OJK', title: 'e-KYC Compliance Terpenuhi', desc: 'Sistem verifikasi identitas digital telah memenuhi standar e-KYC OJK dengan score 96%.', time: '2 minggu lalu', date: '1 Mar 2025', read: true },
]

function typeColor(type) {
  if (type === 'ok') return '#00d4aa'
  if (type === 'warning') return '#f59e0b'
  return '#ef4444'
}

function typeIcon(type) {
  if (type === 'ok') return '✅'
  if (type === 'warning') return '⚠️'
  return '❌'
}

export default function NotificationsPage() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('Notifications')
  const [filter, setFilter] = useState('all')
  const [notifications, setNotifications] = useState(ALL_NOTIFICATIONS)

  const filtered = filter === 'all' ? notifications
    : filter === 'unread' ? notifications.filter(n => !n.read)
    : notifications.filter(n => n.type === filter)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const markRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

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
          <div className="flex items-center gap-3">
            <div>
              <h1 className="font-extrabold text-lg" style={{ fontFamily: "'Syne', sans-serif" }}>Notifications</h1>
              <p className="text-slate-500 text-xs mt-0.5">Ethics & ESG alerts</p>
            </div>
            {unreadCount > 0 && (
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                {unreadCount} baru
              </span>
            )}
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead}
              className="text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg border border-white/10 hover:border-white/20">
              Tandai semua dibaca
            </button>
          )}
        </header>

        <div className="p-6 space-y-5">

          {/* Summary */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Kritis', count: notifications.filter(n => n.type === 'danger').length, color: '#ef4444', icon: '❌' },
              { label: 'Peringatan', count: notifications.filter(n => n.type === 'warning').length, color: '#f59e0b', icon: '⚠️' },
              { label: 'Info', count: notifications.filter(n => n.type === 'ok').length, color: '#00d4aa', icon: '✅' },
            ].map(item => (
              <div key={item.label} className="rounded-2xl p-4 border border-white/[0.06] text-center"
                style={{ background: 'rgba(255,255,255,0.02)' }}>
                <div className="text-xl mb-1">{item.icon}</div>
                <div className="font-bold text-2xl" style={{ color: item.color }}>{item.count}</div>
                <div className="text-xs text-slate-500">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex gap-2 flex-wrap">
            {[
              { id: 'all', label: 'Semua' },
              { id: 'unread', label: `Belum Dibaca (${unreadCount})` },
              { id: 'danger', label: '❌ Kritis' },
              { id: 'warning', label: '⚠️ Peringatan' },
              { id: 'ok', label: '✅ Info' },
            ].map(tab => (
              <button key={tab.id} onClick={() => setFilter(tab.id)}
                className="px-3 py-1.5 rounded-xl text-xs font-medium transition-all"
                style={{
                  background: filter === tab.id ? 'rgba(0,212,170,0.1)' : 'rgba(255,255,255,0.03)',
                  color: filter === tab.id ? '#00d4aa' : '#64748b',
                  border: filter === tab.id ? '1px solid rgba(0,212,170,0.3)' : '1px solid rgba(255,255,255,0.06)'
                }}>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Notification List */}
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 text-slate-500">
                <div className="text-4xl mb-3">🎉</div>
                <p>Tidak ada notifikasi</p>
              </div>
            ) : (
              filtered.map(notif => (
                <div key={notif.id}
                  className="rounded-2xl p-4 border transition-all cursor-pointer"
                  style={{
                    background: notif.read ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
                    borderColor: notif.read ? 'rgba(255,255,255,0.06)' : `${typeColor(notif.type)}30`
                  }}
                  onClick={() => markRead(notif.id)}>
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0 mt-0.5">{typeIcon(notif.type)}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ color: typeColor(notif.type), background: `${typeColor(notif.type)}15` }}>
                              {notif.category}
                            </span>
                            {!notif.read && (
                              <span className="w-2 h-2 rounded-full flex-shrink-0"
                                style={{ background: typeColor(notif.type) }} />
                            )}
                          </div>
                          <p className="font-semibold text-sm">{notif.title}</p>
                        </div>
                        <span className="text-xs text-slate-500 flex-shrink-0">{notif.time}</span>
                      </div>
                      <p className="text-sm text-slate-400 mt-1 leading-relaxed">{notif.desc}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </main>
    </div>
  )
}