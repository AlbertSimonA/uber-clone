



import About from "../../Components/About"
// import FAQ from "../../Components/Faq"
import Options from "../Login/Options"
import Navbaaar from "../Navbaaar"

import Banner from "./Banner"
import Bannerform from "./Bannerform"
import Drivehompage from "./Drivehompage"

import Rentcar from "./Rentcar"
import Suggestions from "./Suggestions"
import Valanbusiness from "./Valanbusiness"


function Home() {
  return (
    <div>
      
        {/* <Navbar/> */}
   
    <Banner/>
    <Bannerform/>
     <Suggestions/>
     <Drivehompage/>
     <Valanbusiness/>
     <Rentcar/>
     {/* <Options/> */}
    
     {/* <Drive/> */}
     {/* <Footer/> */}
     
     
     
    </div>
  )
}

export default Home