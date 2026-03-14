import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-20 relative overflow-hidden">
      
      {/* Background mesh gradient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 30%, rgba(0,212,170,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(14,165,233,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 40% 40% at 50% 10%, rgba(245,158,11,0.05) 0%, transparent 50%)
          `
        }} />
      </div>

      {/* Badge */}
      <div className="relative z-10 inline-flex items-center gap-2 bg-primary/10 border border-primary/25 text-primary text-xs font-bold tracking-widest uppercase px-4 py-1.5 rounded-full mb-8">
        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        OJK · ESG · SDG Compliance Platform
      </div>

      {/* Heading */}
      <h1 className="relative z-10 font-syne font-extrabold text-5xl md:text-7xl leading-tight tracking-tight max-w-3xl">
        Audit FinTech Reports.{' '}
        <span style={{
          background: 'linear-gradient(135deg, #00d4aa, #0ea5e9)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          Smarter. Faster.
        </span>{' '}
        More Transparent.
      </h1>

      {/* Subtitle */}
      <p className="relative z-10 mt-6 text-slate-400 text-lg max-w-xl leading-relaxed">
        Upload your financial and sustainability reports. EthicAdvidsor 
        analyzes compliance with OJK regulations and ESG standards — automatically.
      </p>

      {/* CTA Buttons */}
      <div className="relative z-10 mt-11 flex gap-4 flex-wrap justify-center">
        <Link to="/login"
          className="flex items-center gap-2 bg-primary text-black px-8 py-3.5 rounded-xl font-bold text-base transition-all hover:-translate-y-0.5"
          style={{ boxShadow: '0 0 32px rgba(0,212,170,0.25)' }}>
          Start Audit
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
        <a href="#how"
          className="px-8 py-3.5 rounded-xl font-medium text-base border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all text-white">
          See How It Works
        </a>
      </div>

      {/* Stats */}
      <div className="relative z-10 mt-16 flex border border-white/7 rounded-2xl overflow-hidden bg-white/2">
        {[
          { num: '6', label: 'Core Features' },
          { num: 'OJK', label: 'Regulation Ready' },
          { num: 'ESG', label: 'Score Engine' },
          { num: 'SDG', label: '12 & 16 Reports' },
        ].map((stat, i) => (
          <div key={i} className="px-10 py-6 text-center border-r border-white/7 last:border-r-0">
            <div className="font-syne font-extrabold text-3xl text-primary tracking-tight">{stat.num}</div>
            <div className="text-xs text-slate-400 uppercase tracking-widest mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

    </section>
  )
}

export default Hero