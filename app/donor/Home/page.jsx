import Navbar from '../../component/navbar/page'
import HeroSection from "../../component/hero/page"
import Donation from '../../component/page'
import About from '../../component/about/page'
import Charity from '../../component/charityfund/page'
import Fund from '../../component/fund/page'
import Card from '../../component/card/page'
import Support from '../../component/support/page'
import Event from '../../component/ourevents/page'
import SayAbout from '../../component/sayaboutus/page'
import Blogs from '../../component/blogs/page'
import World from '../../component/topworld/page'
import Community from '../../component/compunity/page'
import Footer from '../../component/footer/page'

const Page = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Donation />
      <About />
      <Charity />
      <Fund />
      <Card />
      <Support />
      <Event />
      <SayAbout />
      <Blogs />
      <World />
      <Community />
      <Footer />
    </div>
  )
}

export default Page