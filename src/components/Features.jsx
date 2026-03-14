const features = [
    {
      icon: '📊',
      color: 'rgba(0,212,170,0.1)',
      accent: '#00d4aa',
      title: 'Transparency Dashboard',
      desc: 'Real-time summary of financial performance, OJK compliance status, and ESG indicators in one unified view.'
    },
    {
      icon: '🌿',
      color: 'rgba(14,165,233,0.1)',
      accent: '#0ea5e9',
      title: 'ESG Report Graphics',
      desc: 'Visualize carbon emissions, social activities, and governance data with interactive charts and trend analysis.'
    },
    {
      icon: '📋',
      color: 'rgba(245,158,11,0.1)',
      accent: '#f59e0b',
      title: 'Digital Financial Reporting',
      desc: 'Upload financial reports in IFRS or OJK format. System auto-integrates and validates against compliance standards.'
    },
    {
      icon: '⚖️',
      color: 'rgba(34,197,94,0.1)',
      accent: '#22c55e',
      title: 'OJK Compliance Status',
      desc: 'Color-coded indicators — green, yellow, red — showing compliance with POJK and Bank Indonesia regulations.'
    },
    {
      icon: '🔔',
      color: 'rgba(239,68,68,0.1)',
      accent: '#ef4444',
      title: 'Ethics & ESG Notifications',
      desc: 'Automatic alerts when data or transactions potentially violate ethical principles or ESG compliance criteria.'
    },
    {
      icon: '🌍',
      color: 'rgba(0,212,170,0.1)',
      accent: '#00d4aa',
      title: 'SDG 12 & 16 Auto Reports',
      desc: 'Auto-generate contribution reports aligned with SDG 12 (sustainability) and SDG 16 (good governance).'
    },
  ]
  
  const Features = () => {
    return (
      <section id="features" className="max-w-6xl mx-auto px-12 py-24">
  
        {/* Header */}
        <p className="text-primary text-xs font-bold tracking-widest uppercase mb-4">Features</p>
        <h2 className="font-syne font-extrabold text-4xl tracking-tight max-w-xl">
          Everything you need for ethical FinTech reporting
        </h2>
  
        {/* Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((f, i) => (
            <div key={i}
              className="group relative bg-white/[0.02] border border-white/7 rounded-2xl p-8 hover:border-white/15 hover:-translate-y-1 transition-all duration-200 overflow-hidden">
              
              {/* Top accent line — muncul saat hover */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, transparent, ${f.accent}, transparent)` }} />
  
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ background: f.color }}>
                {f.icon}
              </div>
  
              {/* Content */}
              <h3 className="font-syne font-bold text-base mb-3">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
  
      </section>
    )
  }
  
  export default Features