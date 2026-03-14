const steps = [
    {
      num: '01',
      icon: '📤',
      color: 'rgba(0,212,170,0.1)',
      title: 'Upload Report',
      desc: 'Upload financial reports or sustainability data in PDF or Excel format.'
    },
    {
      num: '02',
      icon: '🔍',
      color: 'rgba(14,165,233,0.1)',
      title: 'System Reads',
      desc: 'System extracts key data — P&L, balance sheet, ESG indicators.'
    },
    {
      num: '03',
      icon: '⚖️',
      color: 'rgba(245,158,11,0.1)',
      title: 'Compare Regulation',
      desc: 'Data is matched against OJK/BI standards and ESG compliance rules.'
    },
    {
      num: '04',
      icon: '📊',
      color: 'rgba(34,197,94,0.1)',
      title: 'Get Results',
      desc: 'Receive a full compliance report with ✅ ⚠️ ❌ status and recommendations.'
    },
  ]
  
  const HowItWorks = () => {
    return (
      <section id="how" className="max-w-6xl mx-auto px-12 py-24">
        
        {/* Header */}
        <p className="text-primary text-xs font-bold tracking-widest uppercase mb-4">Process</p>
        <h2 className="font-syne font-extrabold text-4xl tracking-tight max-w-xl">
          Four steps to full compliance clarity
        </h2>
        <p className="text-slate-400 mt-4 max-w-lg leading-relaxed">
          From raw reports to actionable insights — in minutes, not days.
        </p>
  
        {/* Steps Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 border border-white/7 rounded-2xl overflow-hidden">
          {steps.map((step, i) => (
            <div key={i}
              className="bg-white/[0.02] border-r border-white/7 last:border-r-0 p-9 hover:bg-white/[0.04] transition-colors">
              
              <div className="font-syne font-extrabold text-5xl text-white/5 leading-none mb-5">
                {step.num}
              </div>
              
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-5"
                style={{ background: step.color }}>
                {step.icon}
              </div>
              
              <h3 className="font-syne font-bold text-base mb-2">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
  
      </section>
    )
  }
  
  export default HowItWorks