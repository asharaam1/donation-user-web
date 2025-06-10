import React from 'react';

import Navbar from './component/navbar/page'
import HeroSection from "./component/hero/page";
import Donation from './component/page'
import About from './component/about/page'
import Cherity from './component/charityfund/page'
import Fund from './component/fund/page'
import Card from './component/card/page'
import Support from './component/support/page'
import Event from './component/ourevents/page'
import Sayabout from './component/sayaboutus/page'
import Blogs from './component/blogs/page'
import World from './component/topworld/page'
import Comunity from './component/compunity/page'
import Footer from './component/footer/page'

const page = () => {
  return (
    <div>
     <Navbar/>
     <HeroSection/>
     <Donation/>
     <About/>
     <Cherity/>
     <Fund/>
     <Card/>
     <Support/>
<Event/>
<Sayabout/>
<Blogs/>
<World/>
<Comunity/>
<Footer/>
    </div>
  )
}

export default page