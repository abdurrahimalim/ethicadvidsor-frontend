import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      style={{ background: '#080c10' }}>

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 30% 40%, rgba(0,212,170,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 70% 60%, rgba(14,165,233,0.06) 0%, transparent 60%)
          `
        }} />

      <div className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <Link to="/" className="flex items-center justify-center gap-2 mb-10 font-syne font-extrabold text-xl">
          <div className="w-2 h-2 rounded-full bg-primary"
            style={{ boxShadow: '0 0 12px #00d4aa' }} />
          EthicAdvidsor
        </Link>

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-10">
          <h1 className="font-syne font-extrabold text-2xl mb-1">Welcome back</h1>
          <p className="text-slate-400 text-sm mb-8">Sign in to your compliance dashboard</p>

          <div className="flex flex-col gap-4">

            {/* Email */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="company@fintech.co.id"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-primary/50 transition-colors"
              />
            </div>

            {/* Button */}
            <button
              onClick={handleLogin}
              className="w-full bg-primary text-black font-bold py-3.5 rounded-xl mt-2 hover:opacity-90 hover:-translate-y-0.5 transition-all"
              style={{ boxShadow: '0 0 24px rgba(0,212,170,0.2)' }}>
              Sign In to Dashboard
            </button>

          </div>

          {/* Demo hint */}
          <div className="mt-6 p-4 bg-primary/5 border border-primary/15 rounded-xl text-center">
            <p className="text-xs text-slate-400">
              Demo: ketik email & password apapun lalu klik Sign In
            </p>
          </div>
        </div>

        {/* Back link */}
        <p className="text-center mt-6 text-slate-500 text-sm">
          <Link to="/" className="text-primary hover:underline">← Back to Home</Link>
        </p>

      </div>
    </div>
  )
}

export default LoginPage