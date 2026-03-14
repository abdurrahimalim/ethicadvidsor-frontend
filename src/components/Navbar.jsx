import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-12 py-5 border-b border-white/5"
      style={{ background: 'rgba(8,12,16,0.7)', backdropFilter: 'blur(20px)' }}>
      
      {/* Logo */}
      <div className="flex items-center gap-2 font-syne font-extrabold text-xl tracking-tight">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse"
          style={{ boxShadow: '0 0 12px #00d4aa' }} />
        EthicAdvidsor
      </div>

      {/* Nav Links */}
      <ul className="flex gap-8 list-none">
        <li><a href="#how" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">How it Works</a></li>
        <li><a href="#features" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Features</a></li>
        <li><a href="#compliance" className="text-slate-400 hover:text-white text-sm font-medium transition-colors">Compliance</a></li>
        <li>
          <Link to="/login"
            className="bg-primary text-black px-5 py-2 rounded-lg text-sm font-bold hover:opacity-80 transition-opacity">
            Get Started
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar