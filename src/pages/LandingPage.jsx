import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'
import Features from '../components/Features'
import Compliance from '../components/Compliance'
import Footer from '../components/Footer'

const LandingPage = () => {
  return (
    <div className="bg-dark-300 min-h-screen">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <Compliance />
      <Footer />
    </div>
  )
}

export default LandingPage