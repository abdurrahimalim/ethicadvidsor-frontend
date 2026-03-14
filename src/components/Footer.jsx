import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      {/* CTA Section */}
      <div className="mx-12 mb-24 relative overflow-hidden rounded-3xl text-center px-12 py-20 border border-primary/20"
        style={{ background: 'linear-gradient(135deg, rgba(0,212,170,0.08), rgba(14,165,233,0.06))' }}>
        
        {/* Glow */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.1), transparent 70%)' }} />

        <h2 className="relative z-10 font-syne font-extrabold text-4xl tracking-tight">
          Ready to audit smarter?
        </h2>
        <p className="relative z-10 text-slate-400 mt-4 text-lg">
          Join the future of transparent FinTech compliance reporting.
        </p>
        <Link to="/login"
          className="relative z-10 inline-flex items-center gap-2 mt-10 bg-primary text-black px-8 py-3.5 rounded-xl font-bold text-base hover:-translate-y-0.5 transition-all"
          style={{ boxShadow: '0 0 32px rgba(0,212,170,0.3)' }}>
          Start for Free
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-12 py-9 flex items-center justify-between text-slate-400 text-sm">
        <div className="flex items-center gap-2 font-syne font-extrabold text-white">
          <div className="w-2 h-2 rounded-full bg-primary"
            style={{ boxShadow: '0 0 8px #00d4aa' }} />
          EthicAdvidsor
        </div>
        <div>Kelompok 11 · Teknologi Informasi × Keuangan & Perbankan · UB 2025</div>
        <div>OJK · ESG · SDG 12 & 16</div>
      </footer>
    </>
  )
}

export default Footer