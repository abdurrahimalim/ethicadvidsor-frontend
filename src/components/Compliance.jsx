const items = [
    { icon: '📜', label: 'OJK Regulation (POJK)', pct: 94, color: '#00d4aa' },
    { icon: '🏦', label: 'Bank Indonesia Standards', pct: 88, color: '#0ea5e9' },
    { icon: '🌿', label: 'ESG Disclosure Standards', pct: 76, color: '#f59e0b' },
    { icon: '🌍', label: 'SDG 12 & 16 Alignment', pct: 82, color: '#22c55e' },
  ]
  
  const Compliance = () => {
    return (
      <section id="compliance" className="max-w-6xl mx-auto px-12 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
  
          {/* Left — Text */}
          <div>
            <p className="text-primary text-xs font-bold tracking-widest uppercase mb-4">
              Compliance Engine
            </p>
            <h2 className="font-syne font-extrabold text-4xl tracking-tight max-w-md">
              Built on real regulatory standards
            </h2>
            <p className="text-slate-400 mt-4 leading-relaxed max-w-md">
              EthicAdvisor checks your reports against actual frameworks — 
              OJK, BI, IFRS, and international ESG standards.
            </p>
          </div>
  
          {/* Right — Progress bars */}
          <div className="bg-white/[0.02] border border-white/7 rounded-2xl p-9">
            <p className="text-slate-400 text-xs font-bold tracking-widest uppercase mb-6">
              Compliance Overview
            </p>
  
            <div className="flex flex-col gap-5">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                    style={{ background: `${item.color}20` }}>
                    {item.icon}
                  </div>
  
                  {/* Bar + Label */}
                  <div className="flex-1">
                    <div className="text-sm font-medium mb-2">{item.label}</div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${item.pct}%`, background: item.color }} />
                    </div>
                  </div>
  
                  {/* Percentage */}
                  <div className="text-sm font-bold min-w-[36px] text-right"
                    style={{ color: item.color }}>
                    {item.pct}%
                  </div>
  
                </div>
              ))}
            </div>
          </div>
  
        </div>
      </section>
    )
  }
  
  export default Compliance